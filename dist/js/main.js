console.log('Let\'s play!');

let playerOne = '';
let playerTwo = '';

let pOneScore = 0;
let pTwoScore = 0;

let stateCount = 0;
let tableSize = 0;
let roundCount = 0;
let roundMod = Math.round(roundCount % 2);

let correctCount = 1;

// $(document).ready(function() {   -------JQUERY CODE BELOW HERE-------

  const $outputField = $('#playerIO p');
  const $gridContainer = $('.gridContainer');
  const $textInput = $('#textInput');
  const $score = $('#score');
  const $endButtons = $('.endButtons');
  const $startButtons = $('.startButtons');


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
    };
  } //requestBoardSize()


  //---Set Board Size---
  const setBoardSize = function() {
    $gridContainer.css({gridTemplateRows: `repeat(${tableSize}, 1fr)`, gridTemplateColumns: `repeat(${tableSize}, 1fr)`});
    for(let i = 1; i <= tableSize; i++) {
      for(let j = 1; j <= tableSize; j++) {
        const $newDiv = $(`<div id="${i}_${j}" class="gridSquares"></div>`);
        $gridContainer.append($newDiv);
      };
    };
    $('.gridSquares').css('font-size', `${$('.gridSquares').height() * 0.7}px`);
  } //setBoardSize()


  //---Display Endgame Output---
  const endGame = function() {
    $score.html(`${pOneScore} - ${pTwoScore}`);
    $endButtons.show();
  } //endGame()


  //---Display Victory---
  const displayVictory = function() {
    if(correctCount === tableSize) {
      if(stateCount % 2 !== 0) {
        $outputField.html(`${playerOne} is Victorious!`);
        pOneScore++;
        endGame();
      } else {
        $outputField.html(`${playerTwo} is Victorious!`);
        pTwoScore++;
        endGame();
      };
    } else if(Math.pow(tableSize, 2) === stateCount - roundMod - 2) {
      $outputField.html('You\'re both losers!');
      endGame();
    }
    correctCount = 1;
  } //displayVictory()


  //---Scan Rows For Matches---
  const rowScan = function() {
    let inARow = [];
    for(let i = 1; i < tableSize + 1; i++) {
      for(let j = 1; j < tableSize + 1; j++) {
        const cellValue = $('#' + i + '_' + j).html();
        inARow.push(cellValue);
        if(j > 1 && inARow[j - 1] === inARow[j - 2] && inARow[0] !== "") {
          correctCount++;
        };
      };
      inARow = [];
      displayVictory()
    };
  } //rowScan()

  //---Scan Columns For Matches---
  const columnScan = function() {
    let inARow = [];
    for(let i = 1; i < tableSize + 1; i++) {
      for(let j = 1; j < tableSize + 1; j++) {
        const cellValue = $('#' + j + '_' + i).html();
        inARow.push(cellValue);
        if(j > 1 && inARow[j - 1] === inARow[j - 2] && inARow[0] !== "") {
          correctCount++;
        };
      };
      inARow = [];
      displayVictory()
    };
  }

  //---Check Top Left To Bottom Right Diagonal---
  const diagonalOne = function() {
    let inARow = [];
    for(let i = 1; i < tableSize + 1; i++) {
      const cellValue = $('#' + i + '_' + i).html();
      inARow.push(cellValue);
      if(i > 1 && inARow[i - 1] === inARow[i - 2] && inARow[0] !== "") {
        correctCount++;
      };
    };
    inARow = [];
    displayVictory()
  }

  //---Check Top Right to Bottom Left Diagonal---
  const diagonalTwo = function() {
    let inARow = [];
    for(let i = 1; i < tableSize + 1; i++) {
      const cellValue = $('#' + (tableSize - i + 1) + '_' + i).html();
      inARow.push(cellValue);
      if(i > 1 && inARow[i - 1] === inARow[i - 2] && inARow[0] !== "") {
        correctCount++;
      };
    };
    inARow = [];
    displayVictory()
  }

  //---Check Victory Conditions---
  const victory = function() {
    rowScan();
    columnScan();
    diagonalOne();
    diagonalTwo();
  } //victory()


  //---Game Select---
  const gameSelect = function() {
    if($textInput.val() === '') {
      return;
    };
    if(stateCount > 0) {
      gameSetup();
      return;
    }
    playerOne = $textInput.val();
    $textInput.val('');
    $outputField.html('Choose game mode');
    $startButtons.hide();
    $('.gameSelect').show();
    stateCount++;
  } //gameSelect()



  // ---Local Game Setup---
  const gameSetup = function() {
    if(stateCount === 1) {
      $('.gameSelect').hide();
      $startButtons.show();
      $('#playerOne').html(playerOne);
      $outputField.html('Player 2 - Enter your name');
      stateCount++
    } else if(stateCount === 2) {
      playerTwo = $textInput.val();
      $textInput.val('');
      $('#playerTwo').html(playerTwo);
      $outputField.html('Enter a board size, odd numbers only!');
      stateCount++;
    } else {
      requestBoardSize();
      setBoardSize();
      $textInput.val('');
      $startButtons.hide();
      stateCount--;
    };
  } //gameSetup()


  //---Network Game Setup---
  const networkGame = function() {
    $('.gameSelect').hide();
    $('.networkButtons').show();
    stateCount++;
  } //networkGame()


  //---Play Turns---
  const playTurns = function() {
    if($(this).html() !== "") {
      return;
    }
    if(stateCount % 2 === 0) {
      $(this).html('X').css('color', 'red');
      $outputField.html(`${playerTwo} it's your turn`);
    } else {
      $(this).html('O').css('color', 'blue');
      $outputField.html(`${playerOne} it's your turn`);
    };
    stateCount++;
    victory();
  } //playTurns()


  //---Play Again---
  const playAgain = function() {
    roundCount++;
    roundMod = Math.round(roundCount % 2);
    $('.gridSquares').empty();
    if(roundCount % 2 === 0) {
      stateCount = 2;
      $outputField.html(`${playerTwo} it's your turn`);
    } else {
      stateCount = 3;
      $outputField.html(`${playerOne} it's your turn`);
    }
    $endButtons.hide();
  } //playAgain()


  //---Reset Game---
  const resetGame = function() {
    $('.gridSquares').remove();
    stateCount = 0;
    roundCount = 0;
    playerOne = '';
    playerTwo = '';
    pOneScore = 0;
    pTwoScore = 0;
    $score.html('0 - 0');
    $('#playerOne').html('Player One');
    $('#playerTwo').html('Player Two');
    $outputField.html('Player 1 - Enter your name');
    $endButtons.hide();
    $startButtons.show();
  } //resetGame()


  //---Event Listeners---
  $submitButton = $('#submitButton');
  $textInput.keyup(function(e) {
    if(e.keyCode === 13) {
      $submitButton.trigger('click');
    };
  });

  // $submitButton.on('click', function() {gameSetup()});
  $submitButton.on('click', gameSelect);

  $gridContainer.on('click', '.gridSquares', playTurns);

  $('#playAgain').on('click', playAgain);

  $('#resetGame').on('click', resetGame);

  $('#local').on('click', gameSetup);

  $('#network').on('click', networkGame);

  $('#create').on('click', function() {
    createGame(playerOne);
  });

  //====Firebase is crazy===
  let database = firebase.database();

  const createGame = function(name) {
    let roomID = name + '\'s room';
    database.ref('gameRooms/' + roomID).set({creator: playerOne});
  }


  const removeRoom = function(name) {
    let roomID = name + '\'s room';
    database.ref('gameRooms/' + roomID).remove();
  }

// }); //end of $(document).ready() handler
