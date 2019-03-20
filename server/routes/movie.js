const express = require("express");
const router = express.Router();
const Movie = require("../models/movies");
const mongoose = require("mongoose");

//show all movies
router.get("/", (req, res, next) => {
    // Get all movies from DB
    Movie.find()
    .exec()
    .then(docs => {
        console.log(docs);
        docs.forEach(function(doc){
            const currentId = doc.id;
            doc.id = String(currentId);
        });
        res.status(200).json(docs);
    })
    .catch(err => console.log(err));
});

//add new movie
router.post("/", (req, res, next) => {
    const movie = new Movie({
        _id: new mongoose.Types.ObjectId(),
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

//seach movie accroding to movie Id
router.get("/:id", (req, res, next) => {
    Movie.findById(req.params.id).exec().then(docs => {
        console.log(docs);
        docs.forEach(function(doc){
            const currentId = doc.id;
            doc.id = String(currentId);
        });
        res.status(200).json(docs);
    }).catch(err => console.log(err));
});

module.exports = router;