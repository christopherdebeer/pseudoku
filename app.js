
/**
 * Module dependencies.
 */

var express = require('express');
var nowjs = require("now");
var app = module.exports = express.createServer();
var everyone = nowjs.initialize(app);

everyone.now.reserveSq = function (options) {
  everyone.now.blockSq(options);
}

everyone.now.makeMove = function (options) {
  everyone.now.recieveMove(options);
}





// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {});
});

app.listen(3000);
console.log("pseudoku server listening on port %d in %s mode", app.address().port, app.settings.env);
