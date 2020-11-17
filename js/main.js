console.log('Let\'s play!');

let playerOne = "";
let playerTwo = "";

let stateCount = 0;
let tableSize = 5;
// $(document).ready(function() {   -------JQUERY CODE BELOW HERE-------

  //---Request Board Size---
  const requestBoardSize = function() {
    if(parseInt($('#playerName').val()) > 21 || parseInt($('#playerName').val()) < 3) {
      tableSize = parseInt($('#playerName').val()) < 3 ? 3 : 21;
      $('#setPlayers p').html(`Table size must be between 3 and 21! <br/> ${playerOne} it's your turn!`);
    } else if(parseInt($('#playerName').val()) % 2 === 0) {
      tableSize = parseInt($('#playerName').val()) + 1;
      $('#setPlayers p').html(`I said odd numbers! <br/> ${playerOne} it's your turn!`);
    } else {
      tableSize = parseInt($('#playerName').val());
      $('#setPlayers p').html(`${playerOne} it's your turn!`);
    }
  } //requestBoardSize()


  //---Set Board Size---
  const setBoardSize = function() {
    $gridContainer = $('.gridContainer');
    $gridContainer.css({gridTemplateRows: `repeat(${tableSize}, 1fr)`, gridTemplateColumns: `repeat(${tableSize}, 1fr)`});
    for(let i = 1; i <= tableSize; i++) {
      for(let j = 1; j <= tableSize; j++) {
        const $newDiv = $(`<div id="${i}_${j}" class="checkSquares"></div>`)
        $gridContainer.append($newDiv);
      }
    }
    $('.checkSquares').css('font-size', `${$('.checkSquares').height() * 0.7}px`);
  } //setBoardSize()

  //---Check Victory Conditions---
  const victory = function() {

    let inARow = [];
    let correctCount = 1;
    //check rows
    for(let i = 1; i < tableSize + 1; i++) {
      for(let j = 1; j < tableSize + 1; j++) {
        const cellValue = $('#' + i + '_' + j).html();
        inARow.push(cellValue);
        if(j > 1 && inARow[j - 1] === inARow[j - 2] && inARow[0] !== "") {
          correctCount++;
        };
      };
      inARow = [];
      if(correctCount === tableSize) {
        return console.log('Victory!');
      } else {
        correctCount = 1;
      }
    }

    //check columns
    for(let i = 1; i < tableSize + 1; i++) {
      for(let j = 1; j < tableSize + 1; j++) {
        const cellValue = $('#' + j + '_' + i).html();
        inARow.push(cellValue);
        if(j > 1 && inARow[j - 1] === inARow[j - 2] && inARow[0] !== "") {
          correctCount++;
        };
      };
      inARow = [];
      if(correctCount === tableSize) {
        return console.log('Victory!');
      } else {
        correctCount = 1;
      }
    };

    //check diagonals
    //top left => bottom right
    for(let i = 1; i < tableSize + 1; i++) {
      const cellValue = $('#' + i + '_' + i).html();
      inARow.push(cellValue);
      if(i > 1 && inARow[i - 1] === inARow[i - 2] && inARow[0] !== "") {
        correctCount++;
      };
    };
    inARow = [];
    if(correctCount === tableSize) {
      return console.log('Victory!');
    } else {
      correctCount = 1;
    }

    //top right => bottom left
    for(let i = 1; i < tableSize + 1; i++) {
      const cellValue = $('#' + (tableSize - i + 1) + '_' + i).html();
      inARow.push(cellValue);
      if(i > 1 && inARow[i - 1] === inARow[i - 2] && inARow[0] !== "") {
        correctCount++;
      };
    };
    inARow = [];
    if(correctCount === tableSize) {
      return console.log('Victory!');
    } else {
      correctCount = 1;
    }
  } //victory()



  // ---Set Names---
  $('#playerName').keyup(function(e) {
    if(e.keyCode === 13) {
      $('#playerButton').trigger('click');
    }
  });

  $('#playerButton').on('click', function() {
    if($('#playerName').val() === '') {
      return;
    } else if(stateCount === 0) {
      playerOne = $('#playerName').val();
      $('#playerName').val('');
      $('#setPlayers p').html('Player 2 - Enter your name');
      stateCount++;
    } else if(stateCount === 1) {
      playerTwo = $('#playerName').val();
      $('#playerName').val('');
      $('#setPlayers p').html('Enter a board size, odd numbers only!');
      stateCount++;
    } else {
      requestBoardSize();
      setBoardSize();
      $('#setPlayers input').hide();
    }
  });

  //---Play Turns---
  $('.gridContainer').on('click', '.checkSquares', function() {
    if($(this).html() !== "") {
      return;
    } else if(stateCount % 2 === 0) {
      $(this).html('X');
      stateCount++
      victory();
      $('#setPlayers p').html(`${playerTwo} it's your turn!`);
    } else {
      $(this).html('O');
      stateCount++
      victory();
      $('#setPlayers p').html(`${playerOne} it's your turn!`);
    }
  });






// }); //end of $(document).ready() handler
