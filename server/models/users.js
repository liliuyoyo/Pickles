const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userName: String,
    userEmail: String, 
    userPassword: Array,
    userImage: String
});

module.exports = mongoose.model("User", userSchema);