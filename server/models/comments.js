const mongoose = require("mongoose");
const softdelete = require("mongoose-softdelete");

const commentSchema = mongoose.Schema({
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    text: String,
    date: String
});

commentSchema.plugin(softdelete);
module.exports = mongoose.model("Comment", commentSchema);
