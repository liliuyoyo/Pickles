const express = require("express");
const router = express.Router();
const Comment = require("../models/comments");
const Movie = require("../models/movies");
const User = require("../models/users");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

/*************************************************************************************************
 * test status: yes
 * description: check if user loggin
 * note: need to check if loggin
 ***************************************************************************************************/
router.post("/status", (req, res, next) => {
  const token = req.body.token;
  var output;

  if (token == null) {
    res.status(200).json("false");
  } else {
    if (Object.keys(token).length == 0) {
      res.status(200).json("false");
    } else {
      jwt.verify(token, "secret", function(err, legit) {
        if (err) {
          res.status(200).json("false");
        } else {
          res.status(200).json("true");
        }
      });
    }
  }
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
    res.status(200).json(output);
  } else {
    jwt.verify(token, "secret", function(err, legit) {
      if (err) {
        output = {
          status: "false",
          message: "login timeout"
        };
        res.status(200).json(output);
      } else {
        Movie.findById(id).exec(function(err, movie) {
          if (err) {
            output = {
              status: "false",
              message: "update failure"
            };
            res.status(200).json(output);
          } else {
            if (type == "likes") {
              //console.log("likes");
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
              //console.log("comments");
              const comments = new Comment();
              comments.author.id = legit._id;
              comments.author.username = legit.userName;
              comments.text = value;
              const currentDate = new Date();
              const date = currentDate.getDate();
              const month = currentDate.getMonth(); //Be careful! January is 0 not 1
              const year = currentDate.getFullYear();
              const dateString = month + 1 + "-" + date + "-" + year;
              comments.date = dateString;
              Comment.create(comments, function(err, comment) {
                if (err) {
                  output = {
                    status: "false",
                    message: "add comments failure"
                  };
                  res.status(200).json(output);
                } else {
                  comment.save();
                  movie.comments.push(comment);
                  movie.save();
                  // const returncomment = new Object();
                  // returncomment.userid = comments.author.id;
                  // returncomment.username = comments.author.username;
                  // returncomment.text = comments.text;
                  // returncomment.date = comments.date;
                  //  console.log(returncomment);
                  output = {
                    status: "true",
                    message: comment
                  };
                  // console.log(output);
                  res.status(200).json(output);
                }
              });
            } else if (type == "wishlist") {
              // console.log(legit._id);
              User.findById(legit._id).exec(function(err, user) {
                if (err) {
                  output = {
                    status: "false",
                    message: "failure to add wish list"
                  };
                  res.status(200).json(output);
                } else {
                  user.userList.push(movie);
                  user.save();
                  output = {
                    status: "true",
                    message: "success add to wish list"
                  };
                  res.status(200).json(output);
                }
              });
            }
          }
        });
      }
    });
  }
});

module.exports = router;
