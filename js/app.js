$(function() {


  function Game() {

	console.log("A1. Game Ready");
  loadAvatars();
	var playerPosition = 1;
	var rollResult;
	var num = 1;
	var diceTimerID;
	var characterTimerID;
	var moveAnimationCounter = 1;
	var round;

	function loadAvatars() {
			$('#p1-profile').prepend('<img src="images/raph-grey.png" id="raphAvatar" width="147" height="125" />');
			$('#p2-profile').prepend('<img src="images/elsa-grey.png" id="elsaAvatar" width="147" height="125" />');
			$('#p3-profile').prepend('<img src="images/panda-grey.png" id="pandaAvatar" width="147" height="125" />');
      $('#status-1').text("Select Avatar!");
      console.log("A2. Grey Avatars Lodaded");
      $("#btn-roll").addClass("btnPreGame");

		}


	var gameState = {
      startGame: false,
      playersInGame: ["0","0","0"],
			raphCash: 0,
			elsaCash: 0,
			pandaCash: 0,
			numOfPlayerInGame: 0,
			currentTurn: "firstPlayer",
			firstPlayerName: "",
			secondPlayerName: "",
			thirdPlayerName: "",
			firstPlayerPosition: 1,
			secondPlayerPosition: 1,
      thirdPlayerPosition: 1,
      c14: "",
			c15: ""
		}

	function rollDice() {

    if (gameState.startGame == false) {

      if (gameState.numOfPlayerInGame < 2) {
        alert("You need to select at least 2 Avatars!");
        }
      else {
      SetTurnControl();
      $("#btn-roll").removeClass("btnPreGame");
      $("#btn-roll").text("Roll Dice");
      $("#btn-roll").addClass("startDice");
      $("#status-1").text("");
      gameState.startGame = true;
      $("#status-2").text(gameState.playersInGame);
      $("#raphAvatar").unbind("click");
      $("#elsaAvatar").unbind("click");
      $("#pandaAvatar").unbind("click");
        }
    }
    else {
		$("#dice" + rollResult).removeClass("diceSelector"); // remove previous selection
		rollResult = Math.floor(Math.random() * 8) + 1; // random a number from 1 to 8
		setTimeout(function() { // set a 400ms delay
			initTimer();
		}, 400);
  }
	}

	function initTimer() { // creating a 100ms timer
		diceTimerID = window.setInterval(startDiceAnimation, 100);
	}

	function startDiceAnimation() {
		$('#status-1').text("Dice Rolling ..");
		$("#dice" + (num - 1)).removeClass("diceSelector");
		console.log("rollResult: " + rollResult + " " + "Index is: " + num);
		if (num > 8) {
			round = true;
			num = num - 8;
		}
		$("#dice" + num).addClass("diceSelector");
		num++;
		if (num == rollResult + 1 && round == true) {
			window.clearInterval(diceTimerID);
			round = false;
			num = 1;
			$('#status-1').text("Dice is " + rollResult);
			placeCharacter(rollResult);
		}
	}

	function placeCharacter(rollResult) {

    if (gameState.numOfPlayerInGame == 2) {
      if (gameState.currentTurn == "firstPlayer") {
        var newPosition = gameState.firstPlayerPosition + rollResult;
          if (newPosition > 24) {
            newPosition -24;
          }
          characterTimerID = window.setInterval(startMoveAnimation(gameState.firstPlayerPosition, gameState.firstPlayerName), 100);
          console.log("Player 1 (" + gameState.firstPlayerName + ") position is: " + newPosition);
          gameState.currentTurn = "secondPlayer";
      }
      else {
        var newPosition = gameState.secondPlayerPosition + rollResult;
        if (newPosition > 24) {
          newPosition -24;
        }
        characterTimerID = window.setInterval(startMoveAnimation, 100);
        console.log("Player 2 (" + gameState.secondPlayerName + ") position is: " + newPosition);
        gameState.currentTurn = "firstPlayer";
      }


    }
    else if (gameState.numOfPlayerInGame == 3) {

    }

	}


  function startMoveAnimation(playerPosition, PlayerName) {

    var playerClass;

    if (PlayerName == "raph") {
      playerClass = "showRaph";
    }
    else if (PlayerName == "elsa") {
        playerClass = "showElsa";
      }
      else if (PlayerName == "panda") {
        playerClass = "showPanda";
    }

    $("#c" + playerPosition + "-playerBox-1").removeClass(playerClass);
    $('#c' + (playerPosition + 1) + '-playerBox-1').addClass(playerClass);
    console.log("Placed " + PlayerName + " into position: " + playerPosition);
    playerPosition++;
    if (moveAnimationCounter == rollResult) {
      window.clearInterval(characterTimerID);
      moveAnimationCounter = 1;
      console.log("Player Position is:" + playerPosition);
    } else {
      moveAnimationCounter++;
      console.log("Move Animation Counter + 1");
    }
  }



function SetTurnControl() {
  if (gameState.playersInGame == "1,1,0") {
    gameState.firstPlayerName = "raph";
    gameState.secondPlayerName = "elsa";
    console.log("Raph VS Elsa. Number of players in game: " + gameState.numOfPlayerInGame);
  }
  else if (gameState.playersInGame == "0,1,1") {
    gameState.firstPlayerName = "elsa";
    gameState.secondPlayerName = "panda";
    console.log("Elsa VS Panda. Number of players in game: " + gameState.numOfPlayerInGame);
  }
  else if (gameState.playersInGame == "1,1,1") {
    gameState.firstPlayerName = "raph";
    gameState.secondPlayerName = "elsa";
    gameState.thirdPlayerName = "panda";
    console.log("Raph VS Elsa VS Panda. Number of players in game: " + gameState.numOfPlayerInGame);
  }
  else if (gameState.playersInGame == "1,0,1") {
    gameState.firstPlayerName = "raph";
    gameState.secondPlayerName = "panda";
    console.log("Raph VS Panda. Number of players in game: " + gameState.numOfPlayerInGame);
  }
}

function loadAvatarSmallIcon(char) { // load character into game
			if (char == "raph") {
				$('#p1-profile').prepend('<img src="images/raph.png" id="raphAvatar" width="147" height="125" />');
			} else if (char == "elsa") {
				$('#p2-profile').prepend('<img src="images/elsa.png" id="elsaAvatar" width="147" height="125" />');
			} else if (char == "panda") {
				$('#p3-profile').prepend('<img src="images/panda.png" id="pandaAvatar" width="147" height="125" />');
			}
		}

$('button').click(function() {  		// Add Button Listener :: START ::
		if (this.id == "btn-roll") {
			rollDice()
		} else if (this.id == "reload") {
			location.reload();
		}
	});                                // Add Button Listener :: END ::

$('img').click(function() {        // Add Avatar Listener :: START ::
		if (this.id == "raphAvatar") {
      loadRaphIntoGame();
		} else if (this.id == "elsaAvatar") {
		  loadElsaIntoGame();
		} else if (this.id == "pandaAvatar") {
		  loadPandaIntoGame();
		}
	});                                 // Add Avatar Listener :: End ::

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
    case "panda":
        gameState.pandaCash = 8000;
        $("#pandaCashDisplay").text("Cash: $" + gameState.pandaCash);
        break;
    default:
        console.log("No Resources Loaded");
            }
          }

function loadRaphIntoGame() {
  $('#c1-playerBox-1').addClass("showRaph");  // Un-grey Raph's profile photo
  gameState.playersInGame[0] = "1";           // Turn on user on gameState
  console.log("B1. Raph loaded into Game. Player Status is: " + gameState.playersInGame);
  loadAvatarSmallIcon("raph");
  loadPlayerResources("raph");
  gameState.numOfPlayerInGame ++;
  console.log("Number of player in game: " + gameState.numOfPlayerInGame);
  $("#raphAvatar").unbind("click");         // disable avatar click listener
}

function loadElsaIntoGame() {
  $('#c1-playerBox-2').addClass("showElsa");  // Un-grey Elsa's profile photo
  gameState.playersInGame[1] = "1";           // Turn on user on gameState
  console.log("B2. Elsa loaded into Game. Player Status is: " + gameState.playersInGame);
  loadAvatarSmallIcon("elsa");
  loadPlayerResources("elsa");
  gameState.numOfPlayerInGame ++;
  console.log("Number of player in game: " + gameState.numOfPlayerInGame);
  $("#elsaAvatar").unbind("click");         // disable avatar click listener

}

function loadPandaIntoGame() {
  $('#c1-playerBox-3').addClass("showPanda"); // Un-grey Panda's profile photo
  gameState.playersInGame[2] = "1"            // Turn on user on gameState
  console.log("B3. Panda loaded into Game. Player Status is: " + gameState.playersInGame);
  loadAvatarSmallIcon("panda");
  loadPlayerResources("panda");
  gameState.numOfPlayerInGame ++;
  console.log("Number of player in game: " + gameState.numOfPlayerInGame);
  $("#pandaAvatar").unbind("click");          // disable avatar click listener
}
}

var game = new Game();
game.start;


});
