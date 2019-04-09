const express = require("express");
const router = express.Router();
const Comment = require("../models/comments");
const Movie = require("../models/movies");
const User = require("../models/users");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const middleware = require("../middleware");
/*************************************************************************************************
 * test status: yes
 * description: check if user loggin
 * note: need to check if loggin
 * input: {
 *  token:
 * }
 * output: String => true or false
 ***************************************************************************************************/
router.post("/status", (req, res, next) => {
    const token = req.body.token;

    if (token == null) {
        return res.status(200).json("false");
    }
    if (Object.keys(token).length == 0) {
        return res.status(200).json("false");
    }
    jwt.verify(token, "secret", function(err, legit) {
        if (err) {
            return res.status(200).json("false");
        }
        return res.status(200).json("true");
    });
});
/*************************************************************************************************
 * test status: yes
 * description: moive update
 * note: need to check if loggin
 * input: {
 *  id:(movie)
 *  token:
 *  type:
 *  value:
 * }
 * output: {
 *  status:
 *  message:
 * }
 ***************************************************************************************************/
router.post("/movie/update", middleware.isLoggedIn, (req, res, next) => {
    const id = req.body.id;
    const type = req.body.type;
    const value = req.body.value;
    var output;
    const legit = req.legit;

    // console.log(typeof legit.isUser);

    if (type == "movie" && legit.isUser) {
        return res.status(200).json({
            status: "false",
            message: "no permit"
        });
    } else if (type == "movie" && !legit.isUser) {
        const query = {
            title: req.body.value.title,
            description: req.body.value.description,
            year: req.body.value.year,
            director: req.body.value.director,
            actors: req.body.value.actors,
            geners: req.body.value.geners,
            area: req.body.value.area,
            length: req.body.value.length,
            smallImagePath: req.body.value.smallImagePath,
            imagePath: req.body.value.imagePath
        };

        Movie.findByIdAndUpdate({ _id: id }, { $set: query }, { multi: true, new: true }, function(err, movie) {
            if (err) {
                const output = {
                    status: "false",
                    message: "failure to find movie"
                };
                return res.status(200).json(output);
            }
            const output = {
                status: "true",
                message: movie
            };
            return res.json(output);
        });
    }

    Movie.findById(id).exec(function(err, movie) {
        if (err) {
            output = {
                status: "false",
                message: "update failure"
            };
            return res.status(200).json(output);
        }
        if (type == "likes") {
            movie.likes = value;
            movie.save();
            output = {
                status: "true",
                message: movie
            };
            return res.status(200).json(output);
        }
        if (type == "watched") {
            movie.watched = value;
            movie.save();
            output = {
                status: "true",
                message: movie
            };
            return res.status(200).json(output);
        }

        if (type == "comments") {
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
                    return res.status(200).json(output);
                } else {
                    comment.save();
                    movie.comments.push(comment);
                    movie.save();
                    output = {
                        status: "true",
                        message: comment
                    };
                    return res.status(200).json(output);
                }
            });
        }

        if (type == "wishlist") {
            User.findById(legit._id).exec(function(err, user) {
                if (err) {
                    output = {
                        status: "false",
                        message: "failure to add wish list"
                    };
                    return res.status(200).json(output);
                } else {
                    const userMovieList = user.userList.map(String);
                    if (!userMovieList.includes(id) && value == "true") {
                        user.userList.push(movie);
                        const userHistoryList = user.historyList.map(String);
                        if (!userHistoryList.includes(movie)) user.historyList.push(movie);
                        output = {
                            status: "true",
                            message: "success add to wish list"
                        };
                    } else if (userMovieList.includes(id) && value == "false") {
                        user.userList.splice(userMovieList.indexOf(id), 1);
                        output = {
                            status: "true",
                            message: "success remove from wish list"
                        };
                    } else if (userMovieList.includes(id) && value == "true") {
                        output = {
                            status: "false",
                            message: "already in the wishlist"
                        };
                        return res.status(200).json(output);
                    } else if (!userMovieList.includes(id) && value == "false") {
                        output = {
                            status: "false",
                            message: "movie is not in the list"
                        };
                        return res.status(200).json(output);
                    } else {
                        output = {
                            status: "false",
                            message: "failure to add wish list"
                        };
                        return res.status(200).json(output);
                    }
                    user.save();
                    return res.status(200).json(output);
                }
            });
        }
    });
});

module.exports = router;
