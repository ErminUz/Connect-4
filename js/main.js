import Game from './Game.js'
import SetPlayerComponent from './SetPlayerComponent.js'
import Board from './Board.js'
import Player from './Player.js'


let players = [];
const colors = ['red', 'green'];
let game;
let board;
let setPlayersUI = new SetPlayerComponent();


$(document).ready(function() {
  /* let playertemp = []; */
  const gameplay = $('#container');
  
  /* $('.set-player-btn').on('click', function(){
    console.log("hello");
    $('.player-creation-container').toggleClass('hide');
  }); */

  setPlayerButton();
  closePlayerSetting();
  play();

  /* $(document).on('click', '.close-player-selection-btn', function(){
    $('.player-creation-container').toggleClass('hide');
  }); */

  /* $(document).on('click', '.play', function(){
    console.log('yoyo');

    $('input[name="player-input"]').each(function() {
      console.log($(this).val());
      playertemp.push($(this).val());
    });

    console.log("playertemp: " + playertemp);

    createPlayers(playertemp);

    console.log("players: " + players);

    $('.player-creation-container').toggleClass('hide');
    $('.frontpage').toggle();
    
    board = new Board(players);
    game = new Game(players);
    while(playertemp.length > 0) {
      playertemp.pop();
    }
    //game.gamePlay();
    game.highscoreList();
    
  }); */

  /* let game = new Game(); */
  /* let setPlayersUI = new SetPlayerComponent(); */


  gameplay.on('click', '.reset-btn', function() {
    restarting();
    game.reset();
    
    game = new Game(players);
    board = new Board(players);
    game.gamePlay();
    game.highscoreList();
  });

  gameplay.on('click', '.exit-btn', function() {
    $(".wrapper-board, .game-options-container, .highscore-container").remove();

    $('input[name="player-input"]').each(function() {
      $(this).val('');
    });
    
    while(players.length > 0) {
      players.pop();
      game.players.pop();
      board.players.pop();
    }
    console.log("players from exit-btn: " + players);
    game = null;
    board = null;
    $('.frontpage').toggle();
    /* $('.player-creation-container').toggleClass('hide'); */
    $('.player-creation').toggle();
    /* setPlayersUI = new SetPlayerComponent(); */
    /* setPlayerButton();
    closePlayerSetting(); */
    /* play(); */
  });

});

function createPlayers(list) {
  players = [];
  for(let i = 0; i < list.length; i++) {
    let player = new Player(`${list[i]}`, `${colors[i]}`);
    players.push(player);
  }

  console.log(players);
}

function restarting() {
  $(".wrapper-board, .game-options-container, .highscore-container").remove();
}

function play() {
  let playertemp = [];
  $(document).on('click', '.play', function(){
    console.log('yoyo');

    $('input[name="player-input"]').each(function() {
      console.log($(this).val());
      playertemp.push($(this).val());
    });

    console.log("playertemp: " + playertemp);

    createPlayers(playertemp);

    console.log("players: " + players);

    $('.player-creation-container').toggleClass('hide');
    $('.frontpage').toggle();
    
    board = new Board(players);
    game = new Game(players);
    while(playertemp.length > 0) {
      playertemp.pop();
    }
    /* game.gamePlay(); */
    game.highscoreList();
    
  });
}

function setPlayerButton() {
  $('.set-player-btn').on('click', function(){
    console.log("again");
    $('.player-creation-container').toggleClass('hide');
  });
}

function closePlayerSetting() {
  $(document).on('click', '.close-player-selection-btn', function(){
    $('.player-creation-container').toggleClass('hide');
  });
}
