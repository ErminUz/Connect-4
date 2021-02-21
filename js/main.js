import Game from './Game.js'
import SetPlayerComponent from './SetPlayerComponent.js'

let players = [{}];

$(document).ready(function() {
  /* const board = new Board('#board'); */
  let game = new Game();
  const setPlayersUI = new SetPlayerComponent();

  const gameplay = $('#container');

  gameplay.on('click', '.reset-btn', function() {
    game.reset();
    
  });

});

function createPlayers() {

}