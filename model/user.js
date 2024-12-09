var mongoose = require ('mongoose');
var userSchema = mongoose.Schema({
    name : String,
    Address : String
});

var user = mongoose.model('users' , userSchema);
module.exports = user;