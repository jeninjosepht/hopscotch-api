var mongoose = require ('mongoose');
var petSchema = mongoose.Schema({
    name : String,
    colour : String,
    price : Number,
    age : Number,
    desc : String
});

var pet = mongoose.model('petCatalouge' , petSchema);
module.exports = pet;