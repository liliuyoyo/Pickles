const express = require("express");
const router = express.Router();
const Comment = require("../models/comments");
const Movie = require("../models/movies");
const mongoose = require("mongoose");

/*************************************************************************************************
 * test status: no
 * description: create new comments
 * note: need to check if loggin
***************************************************************************************************/
router.get("/movie/comment", (req, res, next) => {
    console.log(req.body);
});
/*************************************************************************************************
 * test status: no
 * description: create new comments
 * note: need to check if loggin
***************************************************************************************************/
router.post("/comment", (req, res, next) => {
    Movie.findById(req.params.id).exec().then(docs => {
        Comment.create(req.body.comment, function(err, comment){
            if(err) {
                console.log(err);
            }else {
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                comment.save();
                Movie.comments.push(comment);
                Movie.save();
                console.log(comment);
                req.flash("success", "Create a comment");
            }
        })
    }).catch(err => {console.log(err)});
});


module.exports = router;
