var mongoose = require('mongoose');

mongoose.connect('mongodb://tbcom:traci1@ds029317.mongolab.com:29317/tbcom');

var Schema = mongoose.Schema, ObjectID = Schema.ObjectId;

var Site = new Schema({
    WhatsNew: String,
    Galleries: [String]
});

//mongoose.model('site', Site);
var Site = mongoose.model('site', Site);

SiteProvider = function() {};

// put the prototype functions here..


SiteProvider.prototype.getSiteContent = function(callback) {
    Site.findOne({}, function(err, s) {
        callback(null, s)
    });
};




//

exports.SiteProvider = SiteProvider;
