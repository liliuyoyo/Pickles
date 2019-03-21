const express = require("express");
const router = express.Router();
const Movie = require("../models/comments");
const mongoose = require("mongoose");

/*************************************************************************************************
 * test status: no
 * description: create new comments
***************************************************************************************************/
router.post("/", (req, res, next) => {
    Movie.findById(req.params.id).exec().then(docs => {
        
    });
});