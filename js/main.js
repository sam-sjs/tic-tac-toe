console.log('Let\'s play!');

let playerOne = "";
let playerTwo = "";

let stateCount = 0;
// $(document).ready(function() {   -------JQUERY CODE BELOW HERE-------

$('#playerButton').on('click', function() {
  if(stateCount === 0) {
    playerOne = $('#playerName').val();
    $('#playerName').val('');
    $('#setPlayers p').html('Player 2 - Enter your name');
    stateCount++;
  } else if(stateCount === 1) {
    playerTwo = $('#playerName').val();
    stateCount++;
    $('#setPlayers p').html(`${playerOne} it's your turn!`);
    $('#setPlayers input').hide();
  }
});






$('div.checkSquares').on('click', function() {
  if(stateCount % 2 === 0) {
    $(this).html('X');
    stateCount++
    $('#setPlayers p').html(`${playerTwo} it's your turn!`);
  } else {
    $(this).html('O');
    stateCount++
    $('#setPlayers p').html(`${playerOne} it's your turn!`);
  }
});






// }); //end of $(document).ready() handler
