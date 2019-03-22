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
 * test status: yes
 * description: Using specify condition to seach 
 * note: need to optimize
***************************************************************************************************/
router.get("/search", (req, res, next) => {
    const year = req.query.year;
    const geners = req.query.genres;
    const area = req.query.area;
    console.log(req.query);

    if(year == '*'&& geners == '*' && area == '*'){
        query = {};
    }else if(year != '*'&& geners != '*' && area != '*'){
        if(year == 'other' && area != 'Other'){
            query = {$and: [{$nor: [{'year': 2019}, {'year': 2018}, {'year': 2017}, {'year': 2016}, {'year': 2015}]}, 
                            {'geners': geners}, {'area': area}]}
        }else if(year != 'other' && area == 'Other'){
            query = {$and: [{'year': year}, {"geners": geners},
                            {$nor: [{'area': USA}, {'area': China}, {'area': Europe}, {'area': India}, {'area': Korea}, {'area': Japan}]}]};
        }else{
            query = {'year': year,'geners': geners, 'area': area};
        }
    }else if(year == '*'&& geners != '*' && area != '*'){
        if(area == 'Other') {
            query = {$and: [{"geners": geners},
                           {$nor: [{'area': USA}, {'area': China}, {'area': Europe}, {'area': India}, {'area': Korea}, {'area': Japan}]}]};   
        }else{
            query = {'geners': geners, 'area': area};
        }
    }else if(year != '*'&& geners == '*' && area != '*'){
        if(year == 'other' && area != 'Other'){
            query = {$and: [{$nor: [{'year': 2019}, {'year': 2018}, {'year': 2017}, {'year': 2016}, {'year': 2015}]}, 
                            {'area': area}]}
        }else if(year != 'other' && area == 'Other'){
            query = {$and: [{'year': year},,
                            {$nor: [{'area': USA}, {'area': China}, {'area': Europe}, {'area': India}, {'area': Korea}, {'area': Japan}]}]};
        }else{
            query = {'year': year, 'area': area};
        }
    }else if(year != '*'&& geners != '*' && area == '*'){
        if(year == 'other'){
            query = {$and: [{$nor: [{'year': 2019}, {'year': 2018}, {'year': 2017}, {'year': 2016}, {'year': 2015}]}, 
                            {'geners': geners}]}
        }else{
            query = {'year': year, 'geners': geners};
        }       
    }else if(year == '*'&& geners == '*' && area != '*'){
        if(area == 'Other'){
            query = {$nor: [{'area': 'USA'}, {'area': 'China'}, {'area': 'Europe'}, {'area': 'India'}, {'area': 'Korea'}, {'area': 'Japan'}]};
        }else{
            query = {'area': area};
        }              
    }else if(year == '*'&& geners != '*' && area == '*'){
        query = {'geners': geners};
    }else if(year != '*'&& geners == '*' && area == '*'){
        if(year == 'other'){
            query = {$nor: [{'year': 2019}, {'year': 2018}, {'year': 2017}, {'year': 2016}, {'year': 2015}]};
        }else
            query = {'year': year};
    }

    console.log(query);
    
    Movie.find(query).exec().then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        }).catch(err => console.log(err));
});

/*************************************************************************************************
 * test status: no
 * description: Global search
***************************************************************************************************/
router.get("/search/global", (req, res, next) => {
    const queryVar = req.query.search.split(" ");
    const regexNumberQuery = new Array();
    queryVar.forEach(element => {
        if(!isNaN(parseInt(element))){
            regexNumberQuery.push(element);
        }
    });
    const regexQuery = queryVar.join("|");
    console.log(regexQuery);

    query = {$or: [{'geners': {$regex:regexQuery,$options:"$i"}}, {'title': {$regex:regexQuery,$options:"$i"}}, 
                       {'actors': {$regex:regexQuery,$options:"$i"}},{'description': {$regex:regexQuery,$options:"$i"}},
                       {'year': {$in: regexNumberQuery}}]};

    Movie.find(query).exec().then(docs => {
        console.log(docs);
        //res.status(200).json(docs);
    }).catch(err => console.log(err));
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