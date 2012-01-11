var mongoose = require('mongoose');

mongoose.connect('mongodb://tbcom:traci1@ds029317.mongolab.com:29317/tbcom');

var Schema = mongoose.Schema, ObjectID = Schema.ObjectId;

var Photo = new Schema({
    Name: String,
    Description: String,
    Gallery: String,
    Photo: String,
    PriceTier: String,
    HomeImage: Boolean
});

//mongoose.model('Photo', Photo);
var Photo = mongoose.model('Photo', Photo);


console.log(Photo);

Photo.find({}, function(err, photos) {
    console.log('result object: ' + photos);
    console.log('find query' + photos[0].Name);
});