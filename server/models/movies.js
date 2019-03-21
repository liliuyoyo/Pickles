/*************************************************************************************************
 * description: define movie schema
***************************************************************************************************/
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
	title: String,
	description: String,
	smallImagePath: String,
	imagePath: String,
	year: Number,
	director: Array,
	actors: Array,
	geners: Array,
	area: String,
	length: Number,
	rating: Number,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

module.exports = mongoose.model("Movie", movieSchema);