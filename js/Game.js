import Board from './Board.js'
import Player from './Player.js'

export default class Game {
  constructor() {
    this.rows = 6;
    this.cols = 7;
    this.players = [];
    /* this.createGame(); */
    /* this.setPlayers(); */
    this.gameOver = false;
    this.playerturn = 1;
    this.maxRounds = 42;
    this.connect = 4;
    this.colors = ['red', 'green'];
    this.current = 0;
    this.emptyCells = 0;
    this.togglePlayerCreation();
    this.setPlayerButton();
    this.playButton();
    /* this.gamePlay(); */
  }

  togglePlayerCreation() {
    $(document).on('click', '.close-player-selection-btn', function(){
      $('.player-creation-container').toggleClass('hide');
    });
  }

  playButton() {
    let that = this;
    let playertemp = [];
    $(document).on('click', '.play', function(){
      $('.player-creation-container').toggleClass('hide');
      $('.frontpage').toggle();
      $('input[name="player-input"]').each(function() {
        playertemp.push($(this).val());
      });

      that.createPlayers(playertemp);

      console.log(that.players);
      const board = new Board();
      that.gamePlay();
    });
  }

  createPlayers(list) {
    for(let i = 0; i < list.length; i++){
      let player = new Player(`${list[i]}`, this.colors[i]);
      this.players.push(player);
    }
  }

  setPlayerButton() {
    $('.set-player-btn').on('click', function(){
      $('.player-creation-container').toggleClass('hide');
    });
  }

  gamePlay() {
    /* console.log($('.col').length); */
    const gameplay = $('#container');
    const that = this;
    let counter = 0;

    function placement(col) {
      const cells = $(`.col[data-col='${col}']`);
      for(let i = cells.length-1; i >= 0; i--){
        const cell = $(cells[i]);
        if(cell.hasClass('empty')){
          return cell;
        }
      }
      return null;
    }

    gameplay.on('mouseenter', '.col.empty', function(){
      if(that.gameOver) { return; }
      
      const targetCol = $(this).data('col');
      const placing = placement(targetCol);
      placing.addClass(`hoverplayer-${that.players[that.current].color}`);
    });

    gameplay.on('mouseleave', '.col', function() {
      $('.col').removeClass(`hoverplayer-${that.players[that.current].color}`);
    });

    gameplay.on('click', '.col.empty', function() {
      if(that.gameOver) { 
        alert('YO');
        return;
      }
      const targetCol = $(this).data('col');
      const placing = placement(targetCol);
      placing.removeClass(`empty hoverplayer-${that.players[that.current].color}`)
             .addClass(`${that.players[that.current].color}`);
      placing.data('player', that.players[that.current].color);
      console.log(placing);

      /* if(that.current == 0) {
        that.current = 1;
      } else if(that.current == 1) {
        that.current = 0;
      } */

      /* console.log(`row: ${placing.data('row')}, col: ${placing.data('col')}`); */

      const winner = that.checkIfWin(
        placing.data('row'),
        placing.data('col')
      );

      if(winner) {
        that.gameOver = true;
        alert(`Game over! Player ${that.colors[that.current]} has won`);
        $('.col.empty').removeClass('empty');
        return;
      }

      if(that.current == 0) {
        that.current = 1;
      } else if(that.current == 1) {
        that.current = 0;
      }

      $(this).trigger('mouseenter');
      counter++;
      console.log(counter);
      /* console.log("empty slots left: " + that.emptySlots());
      console.log("emptyCells variable: " + that.emptyCells); */
    });
  }

  checkIfWin(row, col) {
    const that = this;

    function getPlacementCord(i, j) {
      return $(`.col[data-row=${i}][data-col=${j}]`);
    }

    function checkDirection(direction) {
      let total = 0;
      let i = row + direction.i;
      let j = col + direction.j;
      let next = getPlacementCord(i, j);
      while(i >= 0 &&
        i < that.rows &&
        j >= 0 &&
        j < that.cols &&
        next.data('player') === that.players[that.current].color) {
          console.log("yoyo");
          total++;
          i += direction.i;
          j += direction.j;
          next = getPlacementCord(i, j);
        }
        return total;
    }

    function checkWin(directionA, directionB) {
      const total = 1 +
        checkDirection(directionA) +
        checkDirection(directionB);
      if(total >= 4) {
        console.log("log from win");
        return that.players[that.current];
      } else {
        return null;
      }
    }

    function checkDiagonalBLtoTR() {
      return checkWin({i: 1, j: -1}, {i: 1, j:1});
    }
    
    function checkDiagonalTLtoBR() {
      return checkWin({i: 1, j: 1}, {i: -1, j: -1});
    }

    function checkVerticals() {
      return checkWin({i: -1, j: 0}, {i: 1, j: 0});
    }

    function checkHorizontals() {
      return checkWin({i: 0, j: -1}, {i: 0, j:1});
    }

    return checkDiagonalBLtoTR() 
           || checkDiagonalTLtoBR() 
           || checkVerticals() 
           || checkHorizontals()

  }

  emptySlots() {
    this.emptyCells = 0;
    let board = $('.col');

    for(let cell of board) {
      let c = $(cell);
      if(c.hasClass('empty')) {
        this.emptyCells++;
      }
    }
    
    return this.emptyCells;
  }

}
