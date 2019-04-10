/*************************************************************************************************
 * description: define movie schema
 ***************************************************************************************************/
const mongoose = require("mongoose");
const softdelete = require("mongoose-softdelete");
var deepPopulate = require("mongoose-deep-populate")(mongoose);

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
    likes: Number,
    watched: Number,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

movieSchema.plugin(softdelete);
movieSchema.plugin(deepPopulate, {
    populate: {
        "comments.author.id": {
            select: "userImage"
        }
    }
});
module.exports = mongoose.model("Movie", movieSchema);
