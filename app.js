
/**
 * Module dependencies.
 */

var express = require('express');
var nowjs = require("now");
var app = module.exports = express.createServer();
var everyone = nowjs.initialize(app);

everyone.now.board = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

everyone.now.users = {};

everyone.now.reserveSq = function (userId, options) {
  everyone.now.clearUserSq(userId)
  everyone.now.blockSq(userId,options);
  console.log(userId, "reserved sq: ", options);
}

everyone.now.makeMove = function (userId, options) {
  everyone.now.clearUserSq(userId)
  everyone.now.recieveMove(options);
  console.log(userId, "made a move: ", options);
  var sq = (parseInt(options.x) * 9) + parseInt(options.y);
  everyone.now.board[sq] = options.value;
  console.log("board[" + sq.toString() + "] = " + options.value.toString());
}

everyone.now.resetBoard = function (userId) {
  everyone.now.board = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  everyone.now.populateBoard(everyone.now.board);
  console.log("Board Reset by: ", everyone.now.users[userId]);
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

app.get('/users', function(req, res){
  res.end("users logged");
  console.log(everyone.now.users);
});


app.listen(3000);
console.log("pseudoku server listening on port %d in %s mode", app.address().port, app.settings.env);
