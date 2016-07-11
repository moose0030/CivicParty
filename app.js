
    //var login = document.getElementById("login");
    var page = document.getElementById("page");
    var room = document.getElementById("rm");
    var name = document.getElementById("nm");
    var gameLobby = document.getElementById("gameLobby");
    var chooseG = document.getElementById("chooseG");
    var gameRules = document.getElementById("gameRules");
    var results = document.getElementById("results");
    var header = document.getElementById("header");
    var playerLobbyList = document.getElementById("playerLobbyList")
    var socket = io();
    var player = {};
    var game = {};
    var gametypes = [
    {
      name : "Pick-tionary",
      desc : "Players come up with a definition of the prompt and vote on their favourite definition.",
      type : "Word, Solo"
    },
    {
      name : "Catchy-phrase Goes Here",
      desc : "Players create a catchy phrase related to the prompt. Players vote on their favourite.",
      type : "Word, Solo"
    },
    {
      name : "Storybored",
      desc : "Players must quickly write a short story with the prompts and vote on their favourite definition.",
      type : "Word, Solo"
    },
    {
      name : "Memory Is The Key",
      desc : "One player draws via the prompt and another has the ability to erase for 3 seconds after they have finished. Points are based on how many correct guesses.",
      type : "Draw, Competitive"
    },
    {
      name : "Picture Story",
      desc : "Each player draws one sketch that encompasses three prompts. The artist selects the guess that best describes the drawing or is just funny.",
      type : "Drawing, Solo"
    },
    {
      name : "Drawversus",
      desc : "Groups of two must draw similar prompts. The audience must guess which is which. For each correct guess the artist and guesser receive points.",
      type : "Drawing, Head to Head"
    },
    {
      name : "Draw-op",
      desc : "Groups of two must cooperatively complete a drawing. Only one player can draw at one time.",
      type : "Drawing, Cooperative"
    },
    {
      name : "Reverse Pick-tionary",
      desc : "Players come up with a the word that is described from its definition and vote on their favourite definition.",
      type : "Word, Solo"
    },
    {
      name : "We Can Finish Each Others...",
      desc : "Groups of two must submit a word one letter at a time alternating between players to answer a question.",
      type : "Word, Co-op"
    },
    {
      name : "Children's Story, Horrible Crime, or Dessert?",
      desc : "One player draws via the prompt. Other players must guess which category it fits under.",
      type : "Guess, Solo"
    }
    ];
    console.log(gametypes)

    
    socket.on('joinAck',function(data){
      console.log(data);
      game = data.game.ID;
      UI_GameLobby(data.game);
    });

    socket.on('startVote', function(data){
      UI_GameVote();
    });


    console.log(socket);

    HideAll();
    UI_Start();
    
    window.onload = function () {
  //document.getElementById("chooseStart").addEventListener("click", UI_ChooseGame, false);
  //document.getElementById("chooseJoin").addEventListener("click", anchorClick, false);
  /*document.getElementById("RPI-WIFI").addEventListener("click", anchorClick, false);
  document.getElementById("RPI-BT").addEventListener("click", anchorClick, false);
  document.getElementById("WEMO-MOTION").addEventListener("click", anchorClick, false);
  document.getElementById("WEMO-SWITCH").addEventListener("click", anchorClick, false);*/
  }

    function HideAll(){
      //login.style.visibility = "hidden";
      //chooseG.style.visibility = "hidden";
      gameRules.style.visibility = "hidden";
      gameLobby.style.visibility = "hidden";
      results.style.visibility = "hidden";
    }
    function UI_Start(){
      header.innerHTML="Login";
      page.innerHTML = "<p><span class='label label-info'>Room Code</span><input type='text' class= 'form-control' id='rm'><span class='label label-info'>Name</span><input type='text' class='form-control' id='nm'><button id='loginStart' type='button' class= 'btn btn-lg btn-primary ' >Start Game</button></p><button id='loginJoin' type='button' class= 'btn btn-lg btn-success'>Join Game</button>"
      document.getElementById("loginJoin").addEventListener("click", joinGame, false);
      document.getElementById("loginStart").addEventListener("click", startGame, false);
      //login.style.visibility = "visible";
    }

    
    function UI_GameLobby(data){
      HideAll();
      header.innerHTML= "Room:" + data.ID;
      //login.style.visibility = "hidden";
      //gameLobby.style.visibility = "visible";
      page.innerHTML = page.innerHTML = "";
      for(var i = 0; i < data.players.length; i++){
        page.innerHTML = page.innerHTML +("<a href=&quot;#&quot; class=&quot;list-group-item active&quot;><h4 class=&quot;list-group-item-heading&quot;>"+ data.players[i].name +"</h4><p class=&quot;list-group-item-text&quot;>Score:"+data.players[i].score + "</p>");
      }
      page.innerHTML += "<button id='gameStart' type='button' class= 'btn btn-lg btn-primary' >Start</button></p><button id='gameReady' type='button' class= 'btn btn-lg btn-success'>Ready</button>";
      document.getElementById("gameStart").addEventListener("click", startChoose, false);
      document.getElementById("gameReady").addEventListener("click", readyChoose, false);
    }
    
    
    function UI_GameVote(){
      page.innerHTML = "";
      for(var i = 0; i < gametypes.length; i++){
        if(i==0)
          page.innerHTML += "<div class='col-sm-4'>";
        if(i== 4 || i ==8)
          page.innerHTML += "</div><div class='col-sm-4'>";
        page.innerHTML += "<div class='panel panel-primary'><div class='panel-heading'><h3 class='panel-title'>" + gametypes[i].name + "</h3></div><div class='panel-body'><p>"+ gametypes[i].type+ "<p>" + gametypes[i].desc + 
        "<p><button type='button' class='btn btn-lg btn-success votebutton'>Choose</button></div></div>"
      }
      page.innerHTML += "</div>";
      console.log($(".votebutton"));
      $(".votebutton").on("click",voteGame);
    }

    function voteGame(){
      console.log("Click"); 
      console.log($(event.target).parent().parent().parent().find("h3").text());   
    }

    function UI_GameStart(){

    }
    function UI_GameEnd(){

    }
    function joinGame(){
      console.log(rm.value, nm.value);
      if(!rm.value || !nm.value){
        alert("Please fill in both the name and room field.");
        return;
      }
      console.log(nm.value + " " + rm.value);
      player.name = nm.value;
      socket.emit('join',{name: nm.value, room:rm.value});

    }
        
    function startGame(){
      //header.innerHTML = "Game Lobby: " + id;
      if(!nm.value){
        alert("Please fill in the name field.");
        return;
      }
      player.name = nm.value;
      socket.emit('start',{name: player.name});
    }

    function startChoose(){
      HideAll();
      var data = {
        player:player,
        room:game
      };
      socket.emit('startChoose',data);
      
    }

    function readyChoose(){
      var data = {
        player:player,
        room:game
      };

      socket.emit('readyChoose', data);
    }