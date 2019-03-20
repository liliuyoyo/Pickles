const mongoose = require("mongoose");
const mongodb = require("mongodb");

const movieSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
	title: String,
	description: String,
	imagePath: String,
	year: Number,
	director: Array,
	actors: Array,
	geners: Array,
	area: String,
	length: Number,
	rating: Number
});

module.exports = mongoose.model("Movie", movieSchema);