var mongoose = require('mongoose');

mongoose.connect('mongodb://tbcom:traci1@ds029317.mongolab.com:29317/tbcom');

var Schema = mongoose.Schema, ObjectID = Schema.ObjectId;

var Photo = new Schema({
    Name: String,
    Description: String,
    Gallery: String,
    Photo: String,
    PriceTier: String
});

mongoose.model('Photo', Photo);
var Photo = mongoose.model('Photo');

PhotoProvider = function() {};

PhotoProvider.prototype.findAll = function(callback) {
    console.log('in findall');
    Photo.find({}, function(err, photos) {
        console.log('find query');
        callback(null, photos)
    });
};


exports.PhotoProvider = PhotoProvider;
