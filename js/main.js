import Game from './Game.js'
import SetPlayerComponent from './SetPlayerComponent.js'
import Board from './Board.js'
import Player from './Player.js'


let players = [];
const colors = ['red', 'green'];
let game;
let board;
let setPlayersUI = new SetPlayerComponent();


let players = [{}];

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
  help();

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
    /* $('.player-creation').toggle(); */
    /* setPlayersUI = new SetPlayerComponent(); */
    /* setPlayerButton();
    closePlayerSetting(); */
    /* play(); */
  });

  gameplay.on('click', '.home', function() {
    $(".wrapper-board, .game-options-container, .highscore-container").remove();

    $('input[name="player-input"]').each(function() {
      $(this).val('');
    });
    
    while(players.length > 0) {
      players.pop();
      game.players.pop();
      board.players.pop();
    }
    
    game = null;
    board = null;
    $('.frontpage').toggle();
  });

  gameplay.on('click', '.help', function(){
    $('.help-box').toggleClass('hide');
  });

  gameplay.on('click', '.hs', function() {
    window.location.href = '#highscore';
  });

  gameplay.on('click', '.new-game-btn', function() {
    restarting();
    game.reset();
    
    game = new Game(players);
    board = new Board(players);
    game.gamePlay();
    game.highscoreList();
  });

  gameplay.on('click', '.home-btn', function() {
    $(".wrapper-board, .game-options-container, .highscore-container").remove();
    $('.frontpage').toggle();
    
    while(players.length > 0) {
      players.pop();
      game.players.pop();
      board.players.pop();
    }
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

function help() {
  const dom = $('<div class="help-box">').addClass('hide');
  const content = $(`
    <div class="top-help-title">
      <i class="fas fa-question"></i>
    </div>
    <div class="middle-help-title">
      <h2>Rules & Gameplay</h2>
      <h4 class="rules-title">Rules<h4>
      <h5 class="rules-desc fade">One coin per playerturn. Each player has 21 coins per game.</h5>
      <h4>Gameplay</h4>
      <h5 class="gameplay-desc fade">Player red starts each game by placing a coin on the board,
          coin position is displayed when hovering over each slot,
          indicating where it will be placed.
          <br>
          The goal is for each player to have a line with 4 coins, placed either diagonally, vertically or horizontally, so that they equal 4 in row.
      </h5>
    </div>
    <div class="bottom-help-title">
      <h2 class="buttons-title">Buttons</h2>
      <h4>Reset</h4>
      <h5 class="fade">Restart game: cleans out board and starts over again with same players</h5>
      <h4>Exit</h4>
      <h5 class="fade">Exits out of current game and loads home page</h5>
      <h4 class="fade2">Home, Help and Highscore</h4>
      <h5 class="fade">Home loads home page</h5> 
      <h5 class="fade">Help loads help popup</h5>
      <h5 class="fade">Highscore redirects you to the highscore table</h5>
    </div>
  `);
  dom.append(content);
  $('#container').append(dom);
}
