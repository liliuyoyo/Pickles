const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const pagination = require("express-paginate");

//requiring routes
const moviesRoute = require("./routes/movie");
const usersRoute = require("./routes/user");
const commentsRoute = require("./routes/comment");

//connect to mongoDB
const database_url = "mongodb+srv://pickle:pickle@cluster0-bieuw.mongodb.net/test?retryWrites=true";
mongoose.connect(database_url, { useNewUrlParser: true }).then(
    () => {
        console.log("Database connection established!");
    },
    err => {
        console.log("Error connecting Database instance due to: ", err);
    }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ===== Do not delete this part =====
// This allow CORS domain request
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    next();
});

// keep this before all routes that will use pagination
app.use(pagination.middleware(10, 50));

//connect to routes
app.use("/", moviesRoute);
app.use("/", usersRoute);
app.use("/", commentsRoute);

const port = process.env.PORT || 4600;
app.listen(port, process.env.IP, function() {
    console.log("Server started... at " + port);
});
