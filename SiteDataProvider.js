var mongoose = require('mongoose');

mongoose.connect('mongodb://tbcom:traci1@ds029317.mongolab.com:29317/tbcom');

var Schema = mongoose.Schema, ObjectID = Schema.ObjectId;

var Site = new Schema({
    WhatsNew: String
});

//mongoose.model('site', Site);
var Site = mongoose.model('site', Site);

SiteProvider = function() {};

// put the prototype functions here..


SiteProvider.prototype.getWhatsNew = function(callback) {
    console.log('in findall');

    Site.find({}, function(err, s) {
        console.log(Site);
        console.log('find query:' + s.WhatsNew);
        callback(null, s)
    });
};




//

exports.SiteProvider = SiteProvider;
