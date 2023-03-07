const mongoose = require('mongoose');

const mongoURI =   "mongodb://localhost:27017/proKhelo?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const connectToMongo = () =>{
  mongoose.connect(mongoURI,() =>{
    console.log("Mongo db is connected successfully ");
  })
}

module.exports = connectToMongo;


