var app = require('http').createServer(handler)
, io = require('socket.io')(app)
, fs = require('fs')

var port = process.env.PORT || 1338;
app.listen(port);

function handler (req, res) {
  if(req.url.indexOf('.html') != -1){ //req.url has the pathname, check if it conatins '.html'
  fs.readFile(__dirname + '/index.html',
    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }
      res.writeHead(200);
      res.end(data);
      console.log("Wrote HTML");
    });


}

    else if(req.url.indexOf('.js') != -1){ //req.url has the pathname, check if it conatins '.js'

      fs.readFile(__dirname + '/app.js', function (err, data) {
        if (err) console.log(err);
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        res.write(data);
        res.end();
        console.log("Wrote JS");
      });

  }

    else if(req.url.indexOf('.css') != -1){ //req.url has the pathname, check if it conatins '.css'

      fs.readFile(__dirname + '/style.css', function (err, data) {
        if (err) console.log(err);
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.write(data);
        res.end();
        console.log("Wrote CSS");
      });
  }
  else{
    fs.readFile(__dirname + '/index.html',
      function (err, data) {
        if (err) {
          res.writeHead(500);
          return res.end('Error loading index.html');
        }
        res.writeHead(200);
        res.end(data);
        console.log("Wrote HTML");
      });
  }
}

io.on('connection', function (socket) {
  console.log("A player has connected");


socket.on('join',function(data){ //join game
  console.log("Player is attempting to join a game");
  var newPlayer = new Player(data.name);
  var rslt = findGame(data.room,newPlayer);
  socket.emit('joinAck',{game:rslt});
  socket.broadcast.emit('joinAck',{game:rslt});
  console.log(server);
});

socket.on('start', function(data) {  //start game
  console.log("Player is attempting to start a game");
  var rslt = startGame(new Player(data.name));
  socket.emit('joinAck',{game:rslt});
  console.log(server);
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
  this.running = false;
}

function Player(n){
  this.name = n;
  this.score = 0;
  this.ready = false;
  this.submission = null;
}

function findGame(id, player){
  for(var i = 0; i < server.games.length; i++){
    if(server.games[i].ID === id  && server.games[i].running === false){
      server.games[i].players.push(player);
      console.log("Number of players: " + server.games[i].players.length);
      return server.games[i];
    }
  } 
      return null;
}

function startGame(player){
  var newID = makeid();
  var gameExists = false;
  for(var i = 0; i < server.games.length; i++){
    if(newID === server.games[i].id)
      gameExists = true;
  }
  if(!gameExists){
    server.games.push(new Game(newID,player));
    console.log("Game " + server.games[server.games.length-1].ID + " started by " +  player.name);
    return server.games[server.games.length-1]
  }
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

var server = new GameServer();
console.log(server)
/*var a = new Player("a");
var b = new Player("b");
var c = new Player("c");
startGame(a);
findGame(server.games[0].ID,b);
console.log(server.games[0].players.length)
startGame(c);
console.log(server);
*/