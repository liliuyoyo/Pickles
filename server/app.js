//<<<<<<< HEAD
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//requiring routes
const moviesRoute = require("./routes/movie");

//connect to mongoDB
const database_url = "mongodb+srv://pickle:pickle@cluster0-bieuw.mongodb.net/test?retryWrites=true";
mongoose.connect(database_url, {useNewUrlParser: true}).then(
    () => {
        console.log("Database connection established!");
      },
    err => {
        console.log("Error connecting Database instance due to: ", err);
      }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// ===== Do not delete this part =====
// This allow CORS domain request
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use("/", moviesRoute);

const port = process.env.PORT || 4600;
app.listen(port, process.env.IP, function(){
    console.log("Server started... at " + port);
});


// ===================================
// =======
// var express = require('express');
// var app = express();
// var path = require('path');

// var port = 4600;



// var movie = [
//     {   
//         id: 1,
//         title: "Harry Potter", 
//         description: "Love this movie...", 
//         imagePath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQSDXEJwBLV-yzjNOFHMoJ-OqSyFtjjqweTkvby3rePZYOzudM", 
//         year: "2008", 
//         director: "aaa", 
//         actors: "bbb", 
//         gener: "fantsy", 
//         area: "UK", 
//         length: 120, 
//         rating: 10
//     },
//     {
//         id: 2,
//         title: "Harry Potter111", 
//         description: "Love this movie...", 
//         imagePath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQSDXEJwBLV-yzjNOFHMoJ-OqSyFtjjqweTkvby3rePZYOzudM", 
//         year: "2008", 
//         director: "aaa", 
//         actors: "bbb", 
//         gener: "fantsy", 
//         area: "UK", 
//         length: 120, 
//         rating: 10
//     }
// ];

// app.get("/", function(req, res){
//     res.json(movie);
// >>>>>>> 3168b06f12eed061627c4270f833c14cc9a351ce
// });











