const mongoose = require("mongoose");

const { Schema } = mongoose;


// creating schema for user
const profileSchema = new Schema({
  user :{
    type: mongoose.Schema.Types.ObjectId,
    ref : 'user'
  },
  
  discription  : {
    type: String,
    required: true
  },
  title : {
    type: String,
    required: true
  },
  game : {
    type: String,
    required: true
  }
});

// creating model from userSchema
const Profiles = mongoose.model("profile", profileSchema);
module.exports = Profiles;
