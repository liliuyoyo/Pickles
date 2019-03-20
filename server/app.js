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

app.use("/", moviesRoute);

const port = process.env.PORT || 4600;
app.listen(port, process.env.IP, function(){
    console.log("Server started... at " + port);
});











