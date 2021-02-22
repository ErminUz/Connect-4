import Board from './Board.js'
import Player from './Player.js'

export default class Game {
  constructor(players) {
    this.rows = 6;
    this.cols = 7;
    this.players = players;
    /* this.createGame(); */
    /* this.setPlayers(); */
    this.gameOver = false;
    this.playerturn = 1;
    this.maxRounds = 42;
    this.colors = ['red', 'green'];
    this.current = 0;
    this.emptyCells = 0;
    /* this.togglePlayerCreation();
    this.setPlayerButton();
    this.playButton(); */
    this.gamePlay();
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
      let board = new Board(that.players);
      that.highscoreList();
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
    /* const gameplay = $('#container'); */
    const gameplay = $('.wrapper-board');
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
      /* if(that.gameOver) { 
        alert('YO');
        return;
      } */
      console.log("click");
      let targetCol = $(this).data('col');
      let placing = placement(targetCol);
      placing.removeClass(`empty hoverplayer-${that.players[that.current].color}`)
             .addClass(`${that.players[that.current].color}`);
      placing.data('player', that.players[that.current].color);
      console.log(placing);

      /* console.log(`row: ${placing.data('row')}, col: ${placing.data('col')}`); */

      let winner = that.checkIfWin(
        placing.data('row'),
        placing.data('col')
      );

      that.players[that.current].coins = --that.players[that.current].coins;
      $(`.coins-left-${that.players[that.current].color}`).html('Coins: ' + that.players[that.current].coins);

      if(winner) {
        that.gameOver = true;
        that.addScore(winner);
        that.addToHighscore();
        winner = null;
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

    /* gameplay.on('click', '.reset-btn', function() {
      let board = $('.col');

      for(let cell of board) {
        let c = $(cell);
        if(!c.hasClass('empty')) {
          c.removeClass(`${that.colors[0]}`).removeClass(`${that.colors[1]}`).addClass('empty');
        }
      }

      for(let player of that.players) {
        player.coins = 21;
        $(`.coins-left-${player.color}`).html('Coins: ' + player.coins);
      }
      that.current = 0;
      that.gameOver = false;
      
    }); */
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
          total++;
          i += direction.i;
          j += direction.j;
          next = getPlacementCord(i, j);
        }
        return total;
    }

    function checkWin(directionA, directionB) {
      let total = 1 +
        checkDirection(directionA) +
        checkDirection(directionB);
      if(total >= 4) {
        console.log("log from win");
        console.log("total: " + total);
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

  addScore(winner) {
    let coinsUsed = 21 - winner.coins;
    winner.score = coinsUsed;
    localStorage.setItem(`${winner.name}`, JSON.stringify(winner));
  }

  addToHighscore() {
    $('.highscore').remove();
    let scores = [{}];
    let i = 0;

    for(i = 0; i < localStorage.length; i++) {
      let storage = Object.keys(localStorage);
      let vals = JSON.parse(localStorage.getItem(storage[i]));
      scores.push(
        {
          name: vals.name,
          score: vals.score
        }
      );
    }

    scores.sort(function(a,b) {
      return a.score - b.score;
    });

    let highscores = $('.highscores');

    for(i = 0; i < scores.length; i++) {
      if(scores[i].name === undefined && scores[i].score === undefined) {
        continue;
      }
      let obj = $('<div>').addClass('highscore');
      let data = $(`
        <h4>${scores[i].name}</h4>
        <h4 class="score">${scores[i].score}</h4>
      `);
      obj.append(data);
      highscores.append(obj);
    }
  }

  highscoreList() {
    let scores = [{}];

    for(let i = 0; i < localStorage.length; i++) {
      let storage = Object.keys(localStorage);
      let vals = JSON.parse(localStorage.getItem(storage[i]));
      
      scores.push({
        name: vals.name,
        score: vals.score
      });
    }

    scores.sort(function(a,b) {
      return a.score - b.score;
    });

    let highscores = $('.highscores');

    for(let i = 0; i < scores.length; i++) {
      if(scores[i].name === undefined && scores[i].score === undefined) {
        continue;
      }
      let obj = $('<div>').addClass('highscore');
      let data = $(`
        <h4>${scores[i].name}</h4>
        <h4>${scores[i].score}</h4>
      `);
      obj.append(data);
      highscores.append(obj);
    }
  }

  reset() {
    let board = $('.col');

    for(let cell of board) {
      let c = $(cell);
      if(!c.hasClass('empty')) {
        c.removeClass(`${this.colors[0]}`).removeClass(`${this.colors[1]}`).addClass('empty');
      }
    }

    for(let player of this.players) {
      player.coins = 21;
      $(`.coins-left-${player.color}`).html('Coins: ' + player.coins);
    }
    this.current = 0;
    this.gameOver = false; 
    
  }
}