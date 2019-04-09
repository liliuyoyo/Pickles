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
 * test status: no
 * description: send total movie numberin database
 * note: unused
 ***************************************************************************************************/
// router.get("/movies/count", (req, res, next) => {
//     Movie.find()
//     .exec()
//     .then(docs => {
//        // console.log(docs);
//         res.status(200).json(docs.length);
//     })
//     .catch(err => console.log(err));
//   });

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

/*************************************************************************************************
 * test status: no
 * description: only send id, smallImagePath, title, rating. Showing on the main page
 * note: unused
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
 * note: unused
 ***************************************************************************************************/
// router.get("/search", (req, res, next) => {
//     const year = req.query.year;
//     const geners = req.query.genres;
//     const area = req.query.area;
//     console.log(req.query);

//     if(year == '*'&& geners == '*' && area == '*'){
//         query = {};
//     }else if(year != '*'&& geners != '*' && area != '*'){
//         if(year == 'other' && area != 'Other'){
//             query = {$and: [{$nor: [{'year': 2019}, {'year': 2018}, {'year': 2017}, {'year': 2016}, {'year': 2015}]},
//                             {'geners': geners}, {'area': area}]}
//         }else if(year != 'other' && area == 'Other'){
//             query = {$and: [{'year': year}, {"geners": geners},
//                             {$nor: [{'area': USA}, {'area': China}, {'area': Europe}, {'area': India}, {'area': Korea}, {'area': Japan}]}]};
//         }else{
//             query = {'year': year,'geners': geners, 'area': area};
//         }
//     }else if(year == '*'&& geners != '*' && area != '*'){
//         if(area == 'Other') {
//             query = {$and: [{"geners": geners},
//                            {$nor: [{'area': USA}, {'area': China}, {'area': Europe}, {'area': India}, {'area': Korea}, {'area': Japan}]}]};
//         }else{
//             query = {'geners': geners, 'area': area};
//         }
//     }else if(year != '*'&& geners == '*' && area != '*'){
//         if(year == 'other' && area != 'Other'){
//             query = {$and: [{$nor: [{'year': 2019}, {'year': 2018}, {'year': 2017}, {'year': 2016}, {'year': 2015}]},
//                             {'area': area}]}
//         }else if(year != 'other' && area == 'Other'){
//             query = {$and: [{'year': year},,
//                             {$nor: [{'area': USA}, {'area': China}, {'area': Europe}, {'area': India}, {'area': Korea}, {'area': Japan}]}]};
//         }else{
//             query = {'year': year, 'area': area};
//         }
//     }else if(year != '*'&& geners != '*' && area == '*'){
//         if(year == 'other'){
//             query = {$and: [{$nor: [{'year': 2019}, {'year': 2018}, {'year': 2017}, {'year': 2016}, {'year': 2015}]},
//                             {'geners': geners}]}
//         }else{
//             query = {'year': year, 'geners': geners};
//         }
//     }else if(year == '*'&& geners == '*' && area != '*'){
//         if(area == 'Other'){
//             query = {$nor: [{'area': 'USA'}, {'area': 'China'}, {'area': 'Europe'}, {'area': 'India'}, {'area': 'Korea'}, {'area': 'Japan'}]};
//         }else{
//             query = {'area': area};
//         }
//     }else if(year == '*'&& geners != '*' && area == '*'){
//         query = {'geners': geners};
//     }else if(year != '*'&& geners == '*' && area == '*'){
//         if(year == 'other'){
//             query = {$nor: [{'year': 2019}, {'year': 2018}, {'year': 2017}, {'year': 2016}, {'year': 2015}]};
//         }else
//             query = {'year': year};
//     }

//     console.log(query);

//     Movie.find(query).exec().then(docs => {
//             console.log(docs);
//             res.status(200).json(docs);
//         }).catch(err => console.log(err));
// });

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
    const year = req.query.year;
    const geners = req.query.genres;
    const area = req.query.area;
    const gloablstring = String(req.query.str);

    if (gloablstring.length != 0) {
        //   console.log("gloablstring");
        const queryVar = sw.removeStopwords(gloablstring.split(" "));
        //   console.log(queryVar);
        const regexNumberQuery = new Array();
        queryVar.forEach(element => {
            if (!isNaN(parseInt(element))) {
                regexNumberQuery.push(element);
            }
        });
        const regexQuery = queryVar.join("|");
        //   console.log(regexQuery);

        query = {
            $or: [
                { title: { $regex: regexQuery, $options: "$i" } },
                { geners: { $regex: regexQuery, $options: "$i" } },
                { area: { $regex: regexQuery, $options: "$i" } },
                { actors: { $regex: regexQuery, $options: "$i" } },
                { year: { $in: regexNumberQuery } }
            ]
        };

        Movie.find(query)
            .exec()
            .then(docs => {
                res.status(200).json(docs);
            })
            .catch(err => console.log(err));
    } else {
        // console.log("filterSearch")
        if (year == "*" && geners == "*" && area == "*") {
            query = {};
        } else if (year != "*" && geners != "*" && area != "*") {
            if (year == "other" && area != "Other") {
                query = {
                    $and: [
                        {
                            $nor: [{ year: 2019 }, { year: 2018 }, { year: 2017 }, { year: 2016 }, { year: 2015 }]
                        },
                        { geners: geners },
                        { area: area }
                    ]
                };
            } else if (year != "other" && area == "Other") {
                query = {
                    $and: [
                        { year: year },
                        { geners: geners },
                        {
                            $nor: [{ area: USA }, { area: China }, { area: Europe }, { area: India }, { area: Korea }, { area: Japan }]
                        }
                    ]
                };
            } else {
                query = { year: year, geners: geners, area: area };
            }
        } else if (year == "*" && geners != "*" && area != "*") {
            if (area == "Other") {
                query = {
                    $and: [
                        { geners: geners },
                        {
                            $nor: [{ area: USA }, { area: China }, { area: Europe }, { area: India }, { area: Korea }, { area: Japan }]
                        }
                    ]
                };
            } else {
                query = { geners: geners, area: area };
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
                        ,
                        {
                            $nor: [{ area: USA }, { area: China }, { area: Europe }, { area: India }, { area: Korea }, { area: Japan }]
                        }
                    ]
                };
            } else {
                query = { year: year, area: area };
            }
        } else if (year != "*" && geners != "*" && area == "*") {
            if (year == "other") {
                query = {
                    $and: [
                        {
                            $nor: [{ year: 2019 }, { year: 2018 }, { year: 2017 }, { year: 2016 }, { year: 2015 }]
                        },
                        { geners: geners }
                    ]
                };
            } else {
                query = { year: year, geners: geners };
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
            query = { geners: geners };
        } else if (year != "*" && geners == "*" && area == "*") {
            if (year == "other") {
                query = {
                    $nor: [{ year: 2019 }, { year: 2018 }, { year: 2017 }, { year: 2016 }, { year: 2015 }]
                };
            } else query = { year: year };
        }

        Movie.find(query)
            .where({ $or: [{ deleted: false }, { deleted: { $exists: false } }] })
            .exec()
            .then(docs => {
                res.status(200).json(docs);
            })
            .catch(err => console.log(err));
    }
});

/*************************************************************************************************
 * test status: yes
 * description: Global search
 * note: unused
 ***************************************************************************************************/
// router.get("/search/global", (req, res, next) => {
//     const queryVar = sw.removeStopwords(req.query.search.split(" "));
//     console.log(queryVar);
//     const regexNumberQuery = new Array();
//     queryVar.forEach(element => {
//         if(!isNaN(parseInt(element))){
//             regexNumberQuery.push(element);
//         }
//     });
//     const regexQuery = queryVar.join("|");
//     console.log(regexQuery);

//     query = {$or: [{'title': {$regex:regexQuery,$options:"$i"}}, {'geners': {$regex:regexQuery,$options:"$i"}},
//                    {'area': {$regex:regexQuery,$options:"$i"}}, {'actors': {$regex:regexQuery,$options:"$i"}},
//                    {'year': {$in: regexNumberQuery}}]};

//     Movie.find(query).exec().then(docs => {
//         console.log(docs);
//         res.status(200).json(docs);
//     }).catch(err => console.log(err));
// });

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
        .populate("comments")
        .exec(function(err, movie) {
            if (err) {
                console.log(err);
            } else {
                // console.log(movie);
                res.status(200).json(movie);
            }
        });
});

/*************************************************************************************************
 * test status: no
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

    Movie.findByIdAndUpdate(req.body._id, query, { new: true }, function(err, movie) {
        if (err) {
            const output = {
                status: "false",
                message: "failure to find movie"
            };
            return res.status(200).json(output);
        }
        return res.json(movie);
    });
});

/*************************************************************************************************
 * test status: no
 * description: add a new image info into database
 * note: only admin could add movie
 * input: {
 *  token:
 *  movieinfo:
 * }
 * output: {
 *   status:
 *   message:
 * }
 ***************************************************************************************************/
router.post("/movie/add", middleware.isLoggedIn, (req, res, next) => {
    const legit = req.legit;
    if (legit.isUser == "true") {
        return res.status(200).json({
            status: "false",
            message: "no permit"
        });
    }

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
        likes: 0,
        watched: 0,
        rating: req.body.rating,
        comments: []
    });

    movie
        .save()
        .then(result => {
            //console.log(result);
            return result.status(200).json("true");
        })
        .catch(err => {
            return result.status(200).json("false");
        });
});

module.exports = router;
