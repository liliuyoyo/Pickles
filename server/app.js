var express = require('express');
var app = express();
var path = require('path');

var port = 4600;


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
    }
];

app.get("/", function(req, res){
    res.json(movie);
});

app.listen(port, function(){
    console.log("Server started...");
});