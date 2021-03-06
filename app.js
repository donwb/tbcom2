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
   
   PhotoProvider.findHomeImage(function (error, photo){
        SiteProvider.getSiteContent(function (error, content) {
            console.log(photo);
            console.log('whats new ' + content);
            console.log('galleries' + content.Galleries);

           res.render('index.jade', {layout: true,
                locals: {
                    title: 'Traci Browning Photography',
                    homePhoto: photo,
                    siteContent: content
                }}
            );
        });
       
    });

});

app.get('/galleries', function(req, res) {
    
    SiteProvider.getSiteContent(function (error, content) {
        res.render('galleries.jade', {layout: true,
            locals: {
                title: 'Galleries',
                siteContent: content
            }}
        );
    });  
});

app.get('/galleries/:gallery', function(req, res) {
    var gallery = req.param('gallery');

    PhotoProvider.getGalleryImages(gallery, function(error, galleryPhotos) {

        res.render('gallery.jade', {layout: true,
            locals: {
                title: gallery + ' Gallery',
                photos: galleryPhotos
            }}
        );    
    });
});


// ------end routes------

var port = 3000;
if(!module.parent){
    app.listen(port);
    console.log("Express server listenting on port " + port);
};