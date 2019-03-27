/*************************************************************************************************
 * description: movie routes
***************************************************************************************************/
const express = require("express");
const router = express.Router();
const Movie = require("../models/movies");
const mongoose = require("mongoose");
const sw = require("stopword");
const pagination = require("express-paginate");
/*************************************************************************************************
 * test status: yes
 * description: 
***************************************************************************************************/
//global search function
const globalSearch = function(query) {
    console.log("globalsearch")
    const queryVar = sw.removeStopwords(query.split(" "));
    console.log(queryVar);
    const regexNumberQuery = new Array();
    queryVar.forEach(element => {
        if(!isNaN(parseInt(element))){
            regexNumberQuery.push(element);
        }
    });
    const regexQuery = queryVar.join("|");
    console.log(regexQuery);

    query = {$or: [{'title': {$regex:regexQuery,$options:"$i"}}, {'geners': {$regex:regexQuery,$options:"$i"}}, 
                {'area': {$regex:regexQuery,$options:"$i"}}, {'actors': {$regex:regexQuery,$options:"$i"}},
                {'year': {$in: regexNumberQuery}}]};

    Movie.find(query).exec().then(docs => {
        return docs;
    }).catch(err => console.log(err));
}
//filter search function
const filterSearch = function(query) {
    console.log("filterSearch")

    const year = query.year;
    const geners = query.genres;
    const area = query.area;
   
    if(year == '*' && geners == '*' && area == '*'){
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
        const data = new Array();
        Object.entries(docs).forEach(doc => {
            data.push(doc[1]);
        });
        return data;
    }).catch(err => console.log(err)); 
}

// /*************************************************************************************************
//  * test status: yes
//  * description: send all the schema to client. Showing on the main page
// ***************************************************************************************************/
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
 * description: send total movie numberin database
 * note: unused
***************************************************************************************************/
router.get("/movies/count", (req, res, next) => {
    Movie.find()
    .exec()
    .then(docs => {
       // console.log(docs);
        res.status(200).json(docs.length);
    })
    .catch(err => console.log(err));
  });

/*************************************************************************************************
 * test status: yes
 * description: send all the schema to client. Showing on the main page. add pagination
 * note: unused
***************************************************************************************************/
router.get("/movies", (req, res, next) => {
    const pageNumber = parseInt(req.query.pagenumber);
    const pageLimit = parseInt(req.query.pagelimit);
    const query = {};
    if(pageNumber <= 0) {
        const response = {
            "error": true,
            "message": "Invalid page number. Page number should start at 1."
        }
        res.status(204).json(response);
    }
    query.skip = pageLimit * (pageNumber - 1);
    query.limit = pageLimit;
    Movie.find({}, {}, query, function(err, data) {
        if(err) {
            console.log(err);
        }else {
            res.status(200).json(data);
        }
    })
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
 * test status: no
 * description: filter + global search
 * note: need to optimize
***************************************************************************************************/
router.get("/search", function(req, res){
    const year = req.query.year;
    const geners = req.query.genres;
    const area = req.query.area;
    const gloablstring = String(req.query.str);
    
    console.log(req.query);

    if(gloablstring.length != 0) {
        console.log("gloablstring");
        const queryVar = sw.removeStopwords(gloablstring.split(" "));
        console.log(queryVar);
        const regexNumberQuery = new Array();
        queryVar.forEach(element => {
            if(!isNaN(parseInt(element))){
                regexNumberQuery.push(element);
            }
        });
        const regexQuery = queryVar.join("|");
        console.log(regexQuery);
    
        query = {$or: [{'title': {$regex:regexQuery,$options:"$i"}}, {'geners': {$regex:regexQuery,$options:"$i"}}, 
                    {'area': {$regex:regexQuery,$options:"$i"}}, {'actors': {$regex:regexQuery,$options:"$i"}},
                    {'year': {$in: regexNumberQuery}}]};
    
        Movie.find(query).exec().then(docs => {
            res.status(200).json(docs);
        }).catch(err => console.log(err));      
    }else{
        console.log("filterSearch")
       
        if(year == '*' && geners == '*' && area == '*'){
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
            res.status(200).json(docs);
        }).catch(err => console.log(err)); 
    }
});

/*************************************************************************************************
 * test status: yes
 * description: Global search
***************************************************************************************************/
router.get("/search/global", (req, res, next) => {
    const queryVar = sw.removeStopwords(req.query.search.split(" "));
    console.log(queryVar);
    const regexNumberQuery = new Array();
    queryVar.forEach(element => {
        if(!isNaN(parseInt(element))){
            regexNumberQuery.push(element);
        }
    });
    const regexQuery = queryVar.join("|");
    console.log(regexQuery);

    query = {$or: [{'title': {$regex:regexQuery,$options:"$i"}}, {'geners': {$regex:regexQuery,$options:"$i"}}, 
                   {'area': {$regex:regexQuery,$options:"$i"}}, {'actors': {$regex:regexQuery,$options:"$i"}},
                   {'year': {$in: regexNumberQuery}}]};

    Movie.find(query).exec().then(docs => {
        console.log(docs);
        res.status(200).json(docs);
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

// /*************************************************************************************************
//  * test status: no
//  * description: Show comments
// ***************************************************************************************************/
// router.get("/movies/:id", (req, res, next) => {
//     Movie.findById(req.params.id).populate("comments").exec(function(err, image) {
//         if(err) {
//             console.log(err);
//         }else {
//             res.status(200).json(image);
//         }
//     });
// });

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