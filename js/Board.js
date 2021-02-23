import Game from './Game.js'


export default class Board {
  constructor(players) {
    this.ROWS = 6;
    this.COLS = 7;
    this.players = players;
    
    this.board();
  }

  board() {
    console.log("printing players from inside Board class: ", this.players);

    let player1 = $('.input1').val() ? $('.input1').val() : 'empty';
    let player2 = $('.input2').val() ? $('.input2').val() : 'empty';

    const container = $('#container');
    const wrapper = $('<div>').addClass('wrapper-board');
    wrapper.append(`
      <div class="top-wrapper">
        <h3>Players:</h3>
        <div class="flex">
          <div class="player-container player-container-red">
            <h2>${player1}</h2>
            <h4 class="coins-left-red">Coins: ${this.players[0].coins}</h4>
          </div>
          <div class="player-container player-container-green">
            <h2>${player2}</h2>
            <h4 class="coins-left-green">Coins: ${this.players[1].coins}</h4>
          </div>
        </div> 
        <div class="top-wrapper-btn-container">
          <div class="container-btns home">
            <h5 class="hs-title-btn">Home</h5>
            <i class="fas fa-home"></i>
          </div>
          <div class="container-btns help">
            <h5 class="hs-title-btn">Help</h5>
            <i class="far fa-question-circle"></i>
          </div>
          <div class="container-btns hs">
            <h5 class="hs-title-btn">Highscores</h5>
            <i class="fas fa-medal"></i>
          </div>
        </div> 
      </div>
      <hr class="top-wrapper-hr"> 
    `);
    container.append(wrapper);
    const board = $('<div>').addClass('board');
    wrapper.append(board);
    for(let row = 0; row < this.ROWS; row++) {
      const $row = $('<div>').addClass('row');
      for(let col = 0; col < this.COLS; col++) {
        const $col = $('<div>')
          .addClass('col empty')
          .attr('data-col', col)
          .attr('data-row', row);
        $row.append($col);
      }
      
      board.append($row);
    }

    const options = $('<div>').addClass('game-options-container');
    options.append(`
      <div class="game-options-buttons">
        <button class="game-options-btn reset-btn">Reset</button>
        <button class="game-options-btn exit-btn">Exit</button> 
      </div>
    `);

    container.append(options);

    const highscoreSection = $('<div>').addClass('highscore-container');
    highscoreSection.append(`
      <div class="highscore-table">
        <div class="highscore-top">
          <a href="#highscore">
          <h1 class="highscore-title" id="highscore">Highscore list</h1>
          </a>
          
          <hr class="highscore-title-hr">
          <h5 class="highscore-description">Highscore based on coins used on win</h5>
        </div>
        <div class="highscore-sub-titles">
          <h3 class="player-hs">Player</h3>
          <h3 class="coinsUsed-hs">Coins used</h3>
        </div>
        <hr class="highscore-hr">
        <div class="highscores">
          
        </div>
      </div>
    `);

    container.append(highscoreSection);
  }
}