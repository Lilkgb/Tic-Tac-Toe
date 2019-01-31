$(document).ready(function() {
  var player1 = "X";
  var player2 = "O";

  var currentTurn = 1;
  var movesMade = 0;

  var sqr = $(".game-field");
  var winnerContainer=$(".winner");
  var reset=$(".reset");

  sqr.on('click', function(e) {
    movesMade++;
    if(currentTurn === 1) {
      event.target.innerHTML = player1;
      event.target.style.color = "red";
      currentTurn++
    }
    else {
      event.target.innerHTML = player2;
      event.target.style.color = "green";
      currentTurn--
    }
    if (checkForWinner()) {
      var theWinner = currentTurn === 1 ?player2:player1;
      declareWinner(theWinner);

    }
  });

  reset.on("click", function(e) {
    var moves = Array.prototype.slice.call($(".game-field"));
    moves.map((m) => {
      m.innerHTML = "";
    });
    winnerContainer.html("");
    currentTurn = 1;
  });

  function checkForWinner() {
    if (movesMade > 4) {
      var moves = Array.prototype.slice.call($(".game-field"));
      var results = moves.map(function(square){
        return square.innerHTML;
      });
      var winningCombos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
      ];

      return winningCombos.find(function(combo){
        if(results[combo[0]] !== "" && results[combo[1]] !== "" && results[combo[2]] !== "" && results[combo[0]] === results[combo[1]] && results[combo[1]] === results[combo[2]]) {
          return true;
        } else {
          return false;
        }
      });
    }
  }
  function declareWinner(winner) {
    winner = winner === player1 ? "Player1 ":"Player2 ";
    winnerContainer.html(winner + "WINS!");
  }

});
