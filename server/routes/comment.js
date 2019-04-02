const express = require("express");
const router = express.Router();
const Comment = require("../models/comments");
const Movie = require("../models/movies");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
/*************************************************************************************************
 * test status: no
 * description: create new comments
 * note: need to check if loggin
 ***************************************************************************************************/
router.get("/movie/comment", (req, res, next) => {
  console.log(req.body);
});
/*************************************************************************************************
 * test status: yes
 * description: check if user loggin
 * note: need to check if loggin
 ***************************************************************************************************/
router.post("/status", (req, res, next) => {
  const token = req.body.token;
  var output;

  if (token == null) {
    output = "false";
    // res.json("false");
  } else {
    if (Object.keys(token).length == 0) {
      output = "false";
      //   res.status(200).json("false");
    } else {
      try {
        const legit = jwt.verify(token, "secret");
        console.log(legit);
        if (Date.now() / 1000 > legit.exp) {
          output = "false";
          //   res.status(200).json("false");
        } else {
          output = "true";
          //   res.status(200).json("true");
        }
      } catch {
        output = "false";
        // res.status(200).json("false");
      }
    }
  }
  res.status(200).json(output);
});
/*************************************************************************************************
 * test status: no
 * description: create new comments
 * note: need to check if loggin
 ***************************************************************************************************/
router.post("/comment", (req, res, next) => {
  const token = String(req.body.token);
  var output;
  // console.log(req.body);
  if (token.length == 0) {
    output = "false";
    // res.status(200).json("false");
  } else {
    const legit = jwt.verify(token, "secret");
    // console.log(legit);
    if (Date.now() / 1000 > legit.exp) {
      output = "false";
      //res.status(200).json("false");
    } else {
      Movie.findById(req.body.id)
        .exec()
        .then(movie => {
          const comments = new Comment();
          comments.author.id = legit._id;
          comments.author.username = legit.userName;
          comments.text = req.body.comment;
          Comment.create(comments, function(err, comment) {
            if (err) {
              console.log(err);
            } else {
              comment.save();
              movie.comments.push(comment);
              movie.save();
              console.log(comment);
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
    res.status(200).json(output);
  }
});

module.exports = router;
