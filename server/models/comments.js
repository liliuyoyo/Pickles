const mongoose = require("mongoose");

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

module.exports = mongoose.model("Comment", commentSchema);
