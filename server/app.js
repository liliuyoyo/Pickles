var express = require('express');
var app = express();
var path = require('path');

var port = 4600;

// ===== Do not delete this part =====
// This allow CORS domain request
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
// ===================================

var movie = [
    { 
        title: "Harry Potter", 
        description: "Love this movie...", 
        imagePath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQSDXEJwBLV-yzjNOFHMoJ-OqSyFtjjqweTkvby3rePZYOzudM", 
        year: "2008", 
        director: "aaa", 
        actors: "bbb", 
        gener: "fantsy", 
        area: "UK", 
        length: 120, 
        rating: 10
    },
    {
        title: "Harry Potter111", 
        description: "Love this movie...", 
        imagePath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQSDXEJwBLV-yzjNOFHMoJ-OqSyFtjjqweTkvby3rePZYOzudM", 
        year: "2008", 
        director: "aaa", 
        actors: "bbb", 
        gener: "fantsy", 
        area: "UK", 
        length: 120, 
        rating: 10
    }
];

app.get("/", function(req, res){
    res.json(movie);
});

app.listen(port, function(){
    console.log("Server started...");
});