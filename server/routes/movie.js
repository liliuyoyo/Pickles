const express = require("express");
const router = express.Router();
const Movie = require("../models/movies");
const mongoose = require("mongoose");

var doc = [
    { 
        _id: "001",
        title: "Harry Potter", 
        description: "Love this movie...", 
        imagePath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQSDXEJwBLV-yzjNOFHMoJ-OqSyFtjjqweTkvby3rePZYOzudM", 
        year: "2008", 
        director: "aaa", 
        actors: "bbb", 
        gener: "fantsy", 
        area: "UK", 
        length: 120, 
        rating: 10
    },
    {
        _id: "002",
        title: "Harry Potter", 
        description: "Love this movie...", 
        imagePath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQSDXEJwBLV-yzjNOFHMoJ-OqSyFtjjqweTkvby3rePZYOzudM", 
        year: "2008", 
        director: "aaa", 
        actors: "bbb", 
        gener: "fantsy", 
        area: "UK", 
        length: 120, 
        rating: 10
    }
];

//INDEX - show all movies
router.get("/", (req, res, next) => {
    
   // res.json(doc);
    // Get all movies from DB
    Movie.find()
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => console.log(err));
});

router.post("/", (req, res, next) => {
    const movie = new Movie({
       // _id: new mongoose.Types.ObjectId(),

        _id: new mongoose.Types.ObjectId(req.body._id),
        title: req.body.title,
        description: req.body.description,
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

router.get("/:id", (req, res, next) => {
    Movie.findById(req.params.id).exec().then(docs => {
        console.log(docs);
        res.status(200).json();
    }).catch(err => console.log(err));

});

module.exports = router;