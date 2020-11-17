console.log('Let\'s play!');

let playerOne = "";
let playerTwo = "";

let stateCount = 0;
let tableSize = 5;
// $(document).ready(function() {   -------JQUERY CODE BELOW HERE-------

  //---Set Board Size---
  //Update grid container css
  //Add font scaling inside squares
  //Add request for tableSize
  //Set tableSize variable
  const setBoardSize = function() {
    $gridContainer = $('.gridContainer');
    $gridContainer.css({gridTemplateRows: `repeat(${tableSize}, 1fr);`, gridTemplateColumns: `repeat(${tableSize}, 1fr);`});
    for(let i = 1; i <= tableSize; i++) {
      for(let j = 1; j <= tableSize; j++) {
        const $newDiv = $(`<div id="${i}_${j}" class="checkSquares"></div>`)
        $gridContainer.append($newDiv);
      }
    }
  }

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
    };

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
  }//victory()



  // ---Set Names---
  $('#playerButton').on('click', function() {
    if(stateCount === 0) {
      playerOne = $('#playerName').val();
      $('#playerName').val('');
      $('#setPlayers p').html('Player 2 - Enter your name');
      stateCount++;
    } else if(stateCount === 1) {
      playerTwo = $('#playerName').val();
      $('#playerName').val('');
      $('#setPlayers p').html('Enter a board size, odd numbers only!');   //!!!Add check for odd number
      stateCount++;
    } else {
      tableSize = parseInt($('#playerName').val());
      $('#setPlayers p').html(`${playerOne} it's your turn!`);
      $('#setPlayers input').hide();
    }
  });

  //---Play Turns---
  $('div.checkSquares').on('click', function() {
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
