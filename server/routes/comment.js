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
 * description: moive update
 * note: need to check if loggin
 ***************************************************************************************************/
router.post("/movie/update", (req, res, next) => {
  const id = req.body.id;
  const token = String(req.body.token);
  const type = req.body.type;
  const value = req.body.value;
  var output;

  if (token.length == 0) {
    output = {
      status: "false",
      message: "not login"
    };
  } else {
    jwt.verify(token, "secret", function(err, legit) {
      if (err) {
        output = {
          status: "false",
          message: "login timeout"
        };
      } else {
        Movie.findById(id)
          .exec()
          .then(movie => {
            if (type == "likes") {
              console.log("likes");
              movie.likes = value;
              movie.save();
              output = {
                status: "true",
                message: movie
              };
              res.status(200).json(output);
            } else if (type == "watched") {
              movie.watched = value;
              movie.save();
              output = {
                status: "true",
                message: movie
              };
              res.status(200).json(output);
            } else if (type == "comments") {
              const comments = new Comment();
              comments.author.id = legit._id;
              comments.author.username = legit.userName;
              comments.text = req.body.comment;
              Comment.create(comments, function(err, comment) {
                if (err) {
                  output = {
                    status: "false",
                    message: "update failure"
                  };
                } else {
                  comment.save();
                  movie.comments.push(comment);
                  movie.save();
                  console.log(comment);
                  output = {
                    status: "true",
                    message: message
                  };
                }
              });
              res.status(200).json(output);
            } else if ((type = "wishlist")) {
              User.findById(legit._id)
                .exec()
                .then(user => {
                  user.userList.push(movie);
                  user.save();
                  output = {
                    status: "true",
                    message: "add to user wishlist"
                  };
                })
                .catch(err => {
                  output = {
                    status: "false",
                    message: "failure to add user wishlist"
                  };
                });
              res.status(200).json(output);
            }
          })
          .catch(err => {
            output = {
              status: "false",
              message: "update failure"
            };
            res.status(200).json(output);
          });
      }
    });
  }
  // console.log(output);
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
