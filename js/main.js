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
  const gameplay = $('#container');

  setPlayerButton();
  closePlayerSetting();
  play();
  help();

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
    game = null;
    board = null;
    $('.frontpage').toggle();
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

  gameplay.on('click', '.draw-restart-btn', function() {
    restarting();
    game.reset();
    
    game = new Game(players);
    board = new Board(players);
    game.gamePlay();
    game.highscoreList();
  });

  gameplay.on('click', '.draw-home-btn', function() {
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
  let index = 0;
  $(document).on('click', '.play', function(){

    $('input[name="player-input"]').each(function() {
      playertemp.push($(this).val());
    });

    createPlayers(playertemp);

    for(let player of players) {
      if(player.name == "") {
        player.name = colors[index];
        index++;
      }
    }

    $('.player-creation-container').toggleClass('hide');
    $('.frontpage').toggle();
    
    board = new Board(players);
    game = new Game(players);
    while(playertemp.length > 0) {
      playertemp.pop();
    }
    game.highscoreList();
    index = 0;
  });
}

function setPlayerButton() {
  $('.set-player-btn').on('click', function(){
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
