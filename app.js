// comment
var express = require('express');
var mongodb = require('mongodb');
var PhotoProvider = require('./PhotoProvider').PhotoProvider;
var SiteProvider = require('./SiteDataProvider').SiteProvider;


var app = module.exports = express.createServer();

// config shit
var pub = __dirname + '/public';

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.compiler({src: pub, enable: ['sass'] }));
    app.use(express.static(pub));
    app.use(app.router);
});

// env config
app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true}));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

var PhotoProvider = new PhotoProvider();
var SiteProvider = new SiteProvider();

//
//-------Routes go here ----
app.get('/', function(req, res) {
   
   var photos = 'test';
   var content;

    PhotoProvider.findHomeImage(function (error, photo){
        console.log('THE PHOTOS ARE ' + photos);
        photos = photo;
    });

    SiteProvider.getWhatsNew(function (error, c) {
        content = c;
    });

    console.log('photos var - ' + photos);
    console.log('content var - ');


   res.render('index.jade', {layout: true,
        locals: {
            title: 'Traci Browning Photography',
            homePhoto: photos,
            siteContent: content
        }}
    );
});




// ------end routes------

var port = process.env.PORT || 3000;
if(!module.parent){
    app.listen(port);
    console.log("Express server listenting on port %d",app.address().port);
};