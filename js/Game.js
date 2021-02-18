import Board from './Board.js'

export default class Game {
  constructor() {
    this.players = [];
    /* this.createGame(); */
    /* this.setPlayers(); */
    this.togglePlayerCreation();
    this.setPlayerButton();
    this.playButton();
  }

  togglePlayerCreation() {
    $(document).on('click', '.close-player-selection-btn', function(){
      $('.player-creation-container').toggleClass('hide');
    });
  }

  playButton() {
    $(document).on('click', '.play', function(){
      console.log("Play");
    });
  }

  setPlayerButton() {
    $('.set-player-btn').on('click', function(){
      console.log("hej");
      $('.player-creation-container').toggleClass('hide');
    });
  }

  /* setPlayers() {
    $('.set-player-btn').on('click', function() {
      const playerCreationContainer = $('<div>').addClass('player-creation-container');
      const playerCreation = $('<div>').addClass('player-creation');
      playerCreation.append(`
        <div class="player-selection-top-container">
          <h2>Set players</h2>
          <button class="close-player-selection-btn"><span class="x">+</span></button>
        </div>  
        <h3>Player 1:</h3>
        <div class="checkbox-container">
          <label class="computer">Computer</label>
          <input type="checkbox">
        </div>
        <input class ="input-name" placeholder="Name...">
        <hr>
        <h3>Player 2:</h3>
        <div class="checkbox-container">
          <label class="computer">Computer</label>
          <input type="checkbox">
        </div>
        <input class ="input-name" placeholder="Name...">
        <hr>
        <div class="playbtn-container">
          <button class="play">Play</button>
        </div>  
      `);
      $(playerCreationContainer).append(playerCreation);
      $('#container').append(playerCreationContainer);
    });
  } */
}