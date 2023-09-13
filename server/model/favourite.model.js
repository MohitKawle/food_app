const mongoose = require('mongoose');
const FavouriteSchema = new mongoose.Schema({
    email:{type:String,require:true},
    dishes:[] 
  });
  
  const favouriteModel = mongoose.model('favourite', FavouriteSchema);
module.exports = favouriteModel