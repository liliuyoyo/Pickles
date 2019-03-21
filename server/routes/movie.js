/*************************************************************************************************
 * description: movie routes
***************************************************************************************************/
const express = require("express");
const router = express.Router();
const Movie = require("../models/movies");
const mongoose = require("mongoose");
/*************************************************************************************************
 * test status: yes
 * description: send all the schema to client. Showing on the main page
***************************************************************************************************/
router.get("/", (req, res, next) => {
    // Get all movies from DB
    Movie.find()
    .exec()
    .then(docs => {
       // console.log(docs);
       //convert each doc Id type from ObjectId to String
        // Object.entries(docs).forEach(function(doc){
        //     // const currentId = doc.id;
        //     // doc.id = String(currentId);
        //     //console.log(doc[1]);
        //     doc[1]._id = String(doc[1]._id);
        // });
        res.status(200).json(docs);
    })
    .catch(err => console.log(err));
});

/*************************************************************************************************
 * test status: no 
 * description: only send id, smallImagePath, title, rating. Showing on the main page
***************************************************************************************************/
// router.get("/", (req, res, next) => {
//     // Get all movies from DB
//     Movie.find()
//     .exec()
//     .then(docs => {
//        // console.log(docs);
//        const output = new Array();
//         Object.entries(docs).forEach(doc => {
//             const currentDoc = new Object();
//             currentDoc._id = String(doc[1].id);  
//             currentDoc.title = doc[1].title;
//             currentDoc.rating = doc[1].rating;     
//             currentDoc.smallImagePath = doc[1].smallImagePath;
            
//             output.push(currentDoc);
//         });
//         res.status(200).json(output);
//     })
//     .catch(err => console.log(err));
// });

/*************************************************************************************************
 * test status: no
 * description: Using specify condition to seach 
***************************************************************************************************/
router.get("/search", (req, res, next) => {
    const year = req.query.year;
    const geners = req.query.geners;
    const area = req.query.area;
    Movie.find({year: year, geners: geners, area: area}).exec().then(docs => {
        // Object.entries(docs).forEach(function(doc){
        //     const currentId = doc.id;
        //     doc.id = String(currentId);
        // });
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => console.log(err));
});

/*************************************************************************************************
 * test status: yes
 * description: Using image id seach specify image
***************************************************************************************************/
router.get("/:id", (req, res, next) => {
    Movie.findById(req.params.id).exec().then(docs => {
        docs.id = String(docs.id);
        res.status(200).json(docs);
    }).catch(err => console.log(err));
});

/*************************************************************************************************
 * test status: yes
 * description: add a new image info into database
***************************************************************************************************/
router.post("/", (req, res, next) => {
    const movie = new Movie({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        smallImagePath: req.body.smallImagePath,
        imagePath: req.body.imagePath,
        year: req.body.year,
        director: req.body.director,
        actors: req.body.actors,
        geners: req.body.geners,
        area: req.body.area,
        length: req.body.length,
        rating: req.body.rating
    });
    movie.save().then(
        result => {
            console.log(result);
        }
    ).catch(err => console.log(err));
});

module.exports = router;