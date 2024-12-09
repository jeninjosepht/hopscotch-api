var mongoose = require('mongoose')
var purchaseSchema = mongoose.Schema({
    userId : String,
    Address : String,
    price : Number,
    petId : String
});


var purchase = mongoose.model('purchaseList' , purchaseSchema);
module.exports = purchase;