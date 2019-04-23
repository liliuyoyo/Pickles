/*************************************************************************************************
 * description: movie routes
 ***************************************************************************************************/
const express = require("express");
const router = express.Router();
const Movie = require("../models/movies");
const Comment = require("../models/comments");
const mongoose = require("mongoose");
const sw = require("stopword");
const pagination = require("express-paginate");
const middleware = require("../middleware");
/*************************************************************************************************
 * test status: yes
 * description: send all the schema to client. Showing on the main page
 * note: unused
 ***************************************************************************************************/
// router.get("/", (req, res, next) => {
//     // Get all movies from DB
//     Movie.find()
//     .exec()
//     .then(docs => {
//        // console.log(docs);
//         res.status(200).json(docs);
//     })
//     .catch(err => console.log(err));
// });

/*************************************************************************************************
 * test status: yes
 * description: send all the schema to client. Showing on the main page. add pagination
 * note: unused
 ***************************************************************************************************/
// router.get("/movies", (req, res, next) => {
//     const pageNumber = parseInt(req.query.pagenumber);
//     const pageLimit = parseInt(req.query.pagelimit);
//     const query = {};
//     if(pageNumber <= 0) {
//         const response = {
//             "error": true,
//             "message": "Invalid page number. Page number should start at 1."
//         }
//         res.status(204).json(response);
//     }
//     query.skip = pageLimit * (pageNumber - 1);
//     query.limit = pageLimit;
//     Movie.find({}, {}, query, function(err, data) {
//         if(err) {
//             console.log(err);
//         }else {
//             res.status(200).json(data);
//         }
//     })
//   });

function moviesearch(year, geners, area) {
    if (year == "*" && geners == "*" && area == "*") {
        query = {};
    } else if (year != "*" && geners != "*" && area != "*") {
        if (year == "other" && area != "Other") {
            query = {
                $and: [
                    {
                        $nor: [{ year: 2019 }, { year: 2018 }, { year: 2017 }, { year: 2016 }, { year: 2015 }]
                    },
                    { geners: { $regex: geners, $options: "$i" } },
                    { area: aea }
                ]
            };
        } else if (year != "other" && area == "Other") {
            query = {
                $and: [
                    { year: year },
                    { geners: { $regex: geners, $options: "$i" } },
                    {
                        $nor: [{ area: "USA" }, { area: "China" }, { area: "Europe" }, { area: "India" }, { area: "Korea" }, { area: "Japan" }]
                    }
                ]
            };
        } else if (year == "other" && area == "Other") {
            query = {
                $and: [
                    { $nor: [{ year: 2019 }, { year: 2018 }, { year: 2017 }, { year: 2016 }, { year: 2015 }] },
                    { geners: { $regex: geners, $options: "$i" } },
                    {
                        $nor: [{ area: "USA" }, { area: "China" }, { area: "Europe" }, { area: "India" }, { area: "Korea" }, { area: "Japan" }]
                    }
                ]
            };
        } else {
            query = {
                $and: [{ year: year }, { geners: { $regex: geners, $options: "$i" } }, { area: area }]
            };
        }
    } else if (year == "*" && geners != "*" && area != "*") {
        if (area == "Other") {
            query = {
                $and: [
                    { geners: { $regex: geners, $options: "$i" } },
                    {
                        $nor: [{ area: "USA" }, { area: "China" }, { area: "Europe" }, { area: "India" }, { area: "Korea" }, { area: "Japan" }]
                    }
                ]
            };
        } else {
            query = {
                $and: [{ geners: { $regex: geners, $options: "$i" } }, { area: area }]
            };
        }
    } else if (year != "*" && geners == "*" && area != "*") {
        if (year == "other" && area != "Other") {
            query = {
                $and: [
                    {
                        $nor: [{ year: 2019 }, { year: 2018 }, { year: 2017 }, { year: 2016 }, { year: 2015 }]
                    },
                    { area: area }
                ]
            };
        } else if (year != "other" && area == "Other") {
            query = {
                $and: [
                    { year: year },
                    {
                        $nor: [{ area: "USA" }, { area: "China" }, { area: "Europe" }, { area: "India" }, { area: "Korea" }, { area: "Japan" }]
                    }
                ]
            };
        } else if (year == "other" && area == "Other") {
            query = {
                $and: [
                    {
                        $nor: [{ year: 2019 }, { year: 2018 }, { year: 2017 }, { year: 2016 }, { year: 2015 }]
                    },
                    {
                        $nor: [{ area: "USA" }, { area: "China" }, { area: "Europe" }, { area: "India" }, { area: "Korea" }, { area: "Japan" }]
                    }
                ]
            };
        } else {
            query = {
                $and: [{ year: year }, { area: area }]
            };
        }
    } else if (year != "*" && geners != "*" && area == "*") {
        if (year == "other") {
            query = {
                $and: [
                    {
                        $nor: [{ year: 2019 }, { year: 2018 }, { year: 2017 }, { year: 2016 }, { year: 2015 }]
                    },
                    { geners: { $regex: geners, $options: "$i" } }
                ]
            };
        } else {
            query = {
                $and: [{ year: year }, { geners: { $regex: geners, $options: "$i" } }]
            };
        }
    } else if (year == "*" && geners == "*" && area != "*") {
        if (area == "Other") {
            query = {
                $nor: [{ area: "USA" }, { area: "China" }, { area: "Europe" }, { area: "India" }, { area: "Korea" }, { area: "Japan" }]
            };
        } else {
            query = { area: area };
        }
    } else if (year == "*" && geners != "*" && area == "*") {
        query = { geners: { $regex: geners, $options: "$i" } };
    } else if (year != "*" && geners == "*" && area == "*") {
        if (year == "other") {
            query = {
                $nor: [{ year: 2019 }, { year: 2018 }, { year: 2017 }, { year: 2016 }, { year: 2015 }]
            };
        } else query = { year: year };
    }
    return query;
}
/*************************************************************************************************
 * test status: yes
 * description: filter + global search
 * note: need to optimize
 * input schema{
 *  year:
 *  geners:
 *  area:
 *  gloablstring:
 * }
 * output: a list of movie
 ***************************************************************************************************/
router.get("/search", function(req, res) {
    // console.log(req.query);
    const year = req.query.year;
    const geners = req.query.genres;
    const area = req.query.area;
    const gloablstring = String(req.query.str);

    if (gloablstring.length == 0) {
        searchQuery = {};
    } else if (gloablstring.length != 0) {
        const queryVar = sw.removeStopwords(gloablstring.split(" "));
        const regexNumberQuery = new Array();
        queryVar.forEach(element => {
            if (!isNaN(parseInt(element))) {
                regexNumberQuery.push(element);
            }
        });
        const regexQuery = queryVar.join("|");
        searchQuery = {
            $or: [
                { title: { $regex: regexQuery, $options: "$i" } },
                { geners: { $regex: regexQuery, $options: "$i" } },
                { area: { $regex: regexQuery, $options: "$i" } },
                { actors: { $regex: regexQuery, $options: "$i" } },
                { year: { $in: regexNumberQuery } }
            ]
        };
    }
    filterQuery = moviesearch(year, geners, area);
    deleteQuery = { $or: [{ deleted: false }, { deleted: { $exists: false } }] };

    //console.log(filterQuery);

    Movie.find({ $and: [searchQuery, filterQuery] })
        .where(deleteQuery)
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => console.log(err));
});

/*************************************************************************************************
 * test status: yes
 * description: Using image id seach specify image
 * input schema{
 *  id:
 * }
 * output: movie object
 ***************************************************************************************************/
router.get("/:id", (req, res, next) => {
    Movie.findById(req.params.id)
        .where({ $or: [{ deleted: false }, { deleted: { $exists: false } }] })
        .populate({
            path: "comments",
            options: { sort: { _id: -1 } }
        })
        .deepPopulate("comments.author.id")
        .exec(function(err, movie) {
            if (err) {
                console.log(err);
            } else {
                res.status(200).json(movie);
            }
        });
});

/*************************************************************************************************
 * test status: yes
 * description: delete a movie
 * note: soft delete
 * note: only admin could delete movie
 * input: {
 *  movieid:
 *  token:
 * }
 * output: {
 *   status:
 *   message:
 * }
 ***************************************************************************************************/
router.post("/movie/delete", middleware.isLoggedIn, (req, res, next) => {
    const legit = req.legit;
    if (legit.isUser == "true") {
        return res.status(200).json({
            status: "false",
            message: "no permit"
        });
    }

    Movie.findById(req.body.id, function(err, movie) {
        if (err) {
            const output = {
                status: "false",
                message: "failure to find movie"
            };
            return res.status(200).json(output);
        }
        //  console.log(movie);

        movie.softdelete(function(err) {
            if (err) {
                const output = {
                    status: "false",
                    message: "failure to delete"
                };
                return res.status(200).json(output);
            }
            const output = {
                status: "true",
                message: ""
            };
            return res.status(200).json(output);
        });
    });
});
/*************************************************************************************************
 * test status: yes
 * description: restore a movie
 ***************************************************************************************************/
router.get("/movie/restore/:id", (req, res, next) => {
    Movie.findById(req.params.id, function(err, movie) {
        if (err) {
            return res.status(200).json(err);
        } else {
            movie.restore(function(err) {
                if (err) {
                    return res.status(200).json(err);
                }
                // movie.save();
                return res.status(200).json(movie);
            });
        }
    });
});

/*************************************************************************************************
 * test status: no
 * description: update a movie
 * note: only admin could delete movie
 * input: {
 *  token:
 *  movieinfo:
 * }
 * output: {
 *   status:
 *   message:
 * }
 * note: unused
 ***************************************************************************************************/
router.post("/admin/movie/update", middleware.isLoggedIn, (req, res, next) => {
    const legit = req.legit;
    if (legit.isUser == "true") {
        return res.status(200).json({
            status: "false",
            message: "no permit"
        });
    }

    const query = {
        title: req.body.movie.title,
        description: req.body.movie.description,
        smallImagePath: req.body.movie.smallImagePath,
        imagePath: req.body.movie.imagePath,
        year: req.body.movie.year,
        director: req.body.movie.director,
        actors: req.body.movie.actors,
        geners: req.body.movie.geners,
        area: req.body.movie.area,
        length: req.body.movie.length,
        rating: req.body.movie.rating
    };
    console.log(query);

    Movie.findByIdAndUpdate(req.body._id, query, { new: true })
        .populate("comments")
        .exec(function(err, movie) {
            if (err) {
                const output = {
                    status: "false",
                    message: "failure to find movie"
                };
                return res.status(200).json(output);
            }
            console.log(movie);
            return res.json(movie);
        });
});

/*************************************************************************************************
 * test status: no
 * description: add a new image info into database
 * note: only admin could add movie
 * input: {
 *  token:
 *  movie:
 * }
 * output: {
 *   status:
 *   message:
 * }
 ***************************************************************************************************/
router.post("/movie/add", middleware.isLoggedIn, (req, res, next) => {
    console.log(req.body);
    const legit = req.legit;
    if (legit.isUser == "true") {
        return res.status(200).json({
            status: "false",
            message: "no permit"
        });
    }

    const movie = new Movie({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.movie.title,
        description: req.body.movie.description,
        smallImagePath: req.body.movie.smallImagePath,
        imagePath: req.body.movie.imagePath,
        year: req.body.movie.year,
        director: req.body.movie.director,
        actors: req.body.movie.actors,
        geners: req.body.movie.geners,
        area: req.body.movie.area,
        length: req.body.movie.length,
        likes: 0,
        watched: 0,
        counter: 100,
        rating: req.body.movie.rating,
        comments: []
    });

    console.log(movie);

    movie
        .save()
        .then(result => {
            //console.log(result);
            return res.status(200).json({
                status: "true",
                message: ""
            });
        })
        .catch(err => {
            return res.status(200).json({
                status: "false",
                message: "failure to save"
            });
        });
});

module.exports = router;
