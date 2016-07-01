var app = require('http').createServer(handler)
, io = require('socket.io')(app)
, fs = require('fs')

var port = process.env.PORT || 1338;
app.listen(port);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
      function (err, data) {
        if (err) {
          res.writeHead(500);
          return res.end('Error loading index.html');
      }
      res.writeHead(200);
      res.end(data);
  });
}

io.on('connection', function (socket) {
  console.log("A player has logged in.");


socket.on('join',function(data){ //join game
  var newPlayer = new Player(data.name);
  findGame(data.gameID,newPlayer);
});

socket.on('start', function(data) {  //start game
  console.log("Start");
});

socket.on('choose',function(data){ //choose gametype
  
});
socket.on('vote',function(data){   //vote on game choices
  
});
socket.on('submit',function(data){ //submit answer
  
});
});

console.log('Listening on port ' + port );

function GameServer(){
  this.games = [];
  this.running = true;
}

function Game(i,p){
  this.ready = false;
  this.ID = i;
  this.players = [];
  this.players.push(p);
}

function Player(n){
  this.name = n;
  this.score = 0;
  this.ready = false;
  this.submission = null;
}

function findGame(id, player){
  for(var i = 0; i < server.games.length; i++){
    if(server.games[i].ID === id){
      server.games[i].players.push(player);
      return true;
    }
  } 
      return false;
}

function startGame(player){
  var newID = makeid();
  var gameExists = false;
  for(var i = 0; i < server.games.length; i++){
    if(newID === server.games[i].id)
      gameExists = true;
  }
  if(!gameExists)
    server.games.push(new Game(newID,player));
}

function makeid(){
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 4; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function receiveSubmissions(){
//create timer for 30 sec\
//at the end emit display
}

function displaySubmissions(){
// for each submissiokn 
//display for 5 seconds
//winner gets 10 secs
}
/*
var server = new GameServer();
console.log(server)
var a = new Player("a");
var b = new Player("b");
var c = new Player("c");
startGame(a);
findGame(server.games[0].ID,b);
console.log(server.games[0].players.length)
startGame(c);
console.log(server);
*/