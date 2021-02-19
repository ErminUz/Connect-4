import Game from './Game.js'


export default class Board {
  constructor() {
    this.ROWS = 6;
    this.COLS = 7;
    
    this.board();
  }

  board() {
    /* let players = Game.getPlayers();
    console.log(players); */

    let player1 = $('.input1').val() ? $('.input1').val() : 'empty';
    let player2 = $('.input2').val() ? $('.input2').val() : 'empty';

    const container = $('#container');
    const wrapper = $('<div>').addClass('wrapper-board');
    wrapper.append(`
      <div class="top-wrapper">
        <h3>Players:</h3>
        <div class="flex">
          <div class="player-container player-container-red"><h2>${player1}</h2></div>
          <div class="player-container player-container-green"><h2>${player2}</h2></div>
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
  }
}