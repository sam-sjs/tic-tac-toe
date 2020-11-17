console.log('Let\'s play!');

let playerOne = "";
let playerTwo = "";

let stateCount = 0;
let tableSize = 5;
// $(document).ready(function() {   -------JQUERY CODE BELOW HERE-------

  const $outputField = $('#playerIO p');
  const $gridContainer = $('.gridContainer');
  const $textInput = $('#textInput');

  //---Request Board Size---
  const requestBoardSize = function() {
    const $playerInput = parseInt($textInput.val());
    if($playerInput > 21 || $playerInput < 3) {
      tableSize = $playerInput < 3 ? 3 : 21;
      $outputField.html(`Table size must be between 3 and 21! <br/> ${playerOne} it's your turn`);
    } else if($playerInput % 2 === 0) {
      tableSize = $playerInput + 1;
      $outputField.html(`I said odd numbers! <br/> ${playerOne} it's your turn`);
    } else {
      tableSize = $playerInput;
      $outputField.html(`${playerOne} it's your turn`);
    }
  } //requestBoardSize()


  //---Set Board Size---
  const setBoardSize = function() {
    $gridContainer.css({gridTemplateRows: `repeat(${tableSize}, 1fr)`, gridTemplateColumns: `repeat(${tableSize}, 1fr)`});
    for(let i = 1; i <= tableSize; i++) {
      for(let j = 1; j <= tableSize; j++) {
        const $newDiv = $(`<div id="${i}_${j}" class="gridSquares"></div>`)
        $gridContainer.append($newDiv);
      }
    };
    $('.gridSquares').css('font-size', `${$('.gridSquares').height() * 0.7}px`);
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
  $submitButton = $('#submitButton');
  $textInput.keyup(function(e) {
    if(e.keyCode === 13) {
      $submitButton.trigger('click');
    }
  });

  $submitButton.on('click', function() {
    if($textInput.val() === '') {
      return;
    } else if(stateCount === 0) {
      playerOne = $textInput.val();
      $textInput.val('');
      $('#playerOne').html(playerOne);
      $outputField.html('Player 2 - Enter your name');
      stateCount++;
    } else if(stateCount === 1) {
      playerTwo = $textInput.val();
      $textInput.val('');
      $('#playerTwo').html(playerTwo);
      $outputField.html('Enter a board size, odd numbers only!');
      stateCount++;
    } else {
      requestBoardSize();
      setBoardSize();
      $('#playerIO input').hide();
    }
  });

  //---Play Turns---
  $gridContainer.on('click', '.gridSquares', function() {
    if($(this).html() !== "") {
      return;
    } else if(stateCount % 2 === 0) {
      $(this).html('X').css('color', 'red');
      stateCount++
      victory();
      $outputField.html(`${playerTwo} it's your turn`);
    } else {
      $(this).html('O').css('color', 'blue');
      stateCount++
      victory();
      $outputField.html(`${playerOne} it's your turn`);
    }
  });






// }); //end of $(document).ready() handler
