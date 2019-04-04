const mongoose = require("mongoose");
const softdelete = require("mongoose-softdelete");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userName: String,
  userEmail: String,
  userPassword: Array,
  isUser: Boolean,
  userImage: String,
  userList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie"
    }
  ]
});

userSchema.plugin(softdelete);

module.exports = mongoose.model("User", userSchema);
