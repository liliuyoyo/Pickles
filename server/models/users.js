const mongoose = require(mongoose);

const userSchema = mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    username: String,
    userEmail: String, 
    userPassword: String,
});

module.exports = mongoose.model("User", movieSchema);