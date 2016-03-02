$(function() {

  init();
	var playerPosition = 1;
	var rollResult;
	var num = 1;
	var diceTimerID;
	var characterMovementID;
	var moveAnimationCounter = 0;
	var completeRound;
  var playerClass;
  var movementCounter;




	var gameState = {
      startedGame: false,
      whoseTurn: "human",
			raphCash: 0,
			elsaCash: 0,
			numOfPlayerInGame: 0,
			currentTurn: "firstPlayer",
			firstPlayerName: "",
			secondPlayerName: "",
			thirdPlayerName: "",
			humanPlayerPosition: 1,
			computerPlayerPosition: 1
		}


function init() {
			$('#p1-profile').prepend('<img src="images/raph-grey.png" id="raphAvatar" width="147" height="125" />');
			$('#p2-profile').prepend('<img src="images/elsa-grey.png" id="elsaAvatar" width="147" height="125" />');
      $("#btn-roll").addClass("btnPreGame");
		}

$('button').click(function() {  		// Add Button Listener :: START ::
		if (this.id == "btn-roll") {
			startGame()
		} else if (this.id == "reload") {
			location.reload();
		}
	});

function startGame() {
    if (gameState.startedGame == false) {
      loadPlayers();
      $("#btn-roll").removeClass("btnPreGame");
      $("#btn-roll").text("Roll Dice");
      $("#btn-roll").addClass("startDice");
      gameState.startedGame = true;
      console.log("Game has started");
    }
    else {
      rollDice();
    }
  }

function loadPlayers() {
  loadRaphIntoGame();
  loadElsaIntoGame();
}

function loadRaphIntoGame() {
  $('#c1-playerBox-1').addClass("showRaph");  // Un-grey Raph's profile photo
  loadAvatarSmallIcon("raph");
  loadPlayerResources("raph");
}

function loadElsaIntoGame() {
  $('#c1-playerBox-2').addClass("showElsa");  // Un-grey Elsa's profile photo
  loadAvatarSmallIcon("elsa");
  loadPlayerResources("elsa");
}

function loadAvatarSmallIcon(char) {
			if (char == "raph") {
				$('#p1-profile').prepend('<img src="images/raph.png" id="raphAvatar" width="147" height="125" />');
			} else if (char == "elsa") {
				$('#p2-profile').prepend('<img src="images/elsa.png" id="elsaAvatar" width="147" height="125" />');
			}
		}

function loadPlayerResources(char) {
    switch(char) {
    case "raph":
        gameState.raphCash = 8000;
        $("#raphCashDisplay").text("Cash: $" + gameState.raphCash);
        break;
    case "elsa":
        gameState.elsaCash = 8000;
        $("#elsaCashDisplay").text("Cash: $" + gameState.elsaCash);
        break;
    default:
        console.log("No Resources Loaded");
            }
          }

function rollDice() {
      rollResult = Math.floor(Math.random() * 8) + 1;
      $("#dice" + rollResult).removeClass("diceSelector"); // remove dice region colour
      diceTimerID = window.setInterval(startDiceAnimation, 100);
  	}

function startDiceAnimation() {
  		$('#status-1').text("Dice Rolling ..");
  		$("#dice" + (num - 1)).removeClass("diceSelector");
  		if (num > 8) {
  			completeRound = true;
  			num = num - 8;
  		}
  		$("#dice" + num).addClass("diceSelector");
  		num++;
  		if (num == rollResult + 1 && completeRound == true) {
  			window.clearInterval(diceTimerID);
  			completeRound = false;
  			num = 1;
  			$('#status-1').text("Dice is " + rollResult);
  			characterMovementID = window.setInterval(startMoveAnimation, 500);
  		}
  	}


    function startMoveAnimation() {
        if (gameState.whoseTurn == "human") {
        $("#status-2").text(gameState.humanPlayerPosition);
        $("#c" + gameState.humanPlayerPosition + "-playerBox-1").removeClass("showRaph");
        if (gameState.humanPlayerPosition != 24) {
          $('#c' + (gameState.humanPlayerPosition + 1) + '-playerBox-1').addClass("showRaph");
        }
        else {
          $('#c1-playerBox-1').addClass("showRaph");
        }

        gameState.humanPlayerPosition ++;
        if (gameState.humanPlayerPosition > 24) {
          gameState.humanPlayerPosition = gameState.humanPlayerPosition - 24;
        }
        moveAnimationCounter ++

        $("#status-2").text(moveAnimationCounter);
        $("#status-3").text(gameState.humanPlayerPosition);

        if (moveAnimationCounter == rollResult) {
          window.clearInterval(characterMovementID);
          gameState.whoseTurn = "computer";
          moveAnimationCounter = 0;
        }

      }
      else {
        $("#status-2").text(gameState.computerPlayerPosition);
        $("#c" + gameState.computerPlayerPosition + "-playerBox-2").removeClass("showElsa");
        if (gameState.computerPlayerPosition != 24) {
        $('#c' + (gameState.computerPlayerPosition + 1) + '-playerBox-2').addClass("showElsa");
          }
          else {
            $('#c1-playerBox-2').addClass("showElsa");
          }
        gameState.computerPlayerPosition ++;
        if (gameState.computerPlayerPosition > 24) {
          gameState.computerPlayerPosition = gameState.computerPlayerPosition - 24;
        }
        
        moveAnimationCounter ++
        $("#status-2").text(moveAnimationCounter);
        $("#status-3").text(gameState.computerPlayerPosition);

        if (moveAnimationCounter == rollResult) {
          window.clearInterval(characterMovementID);
          gameState.whoseTurn = "human";
          moveAnimationCounter = 0;
      }
    }
}

});
