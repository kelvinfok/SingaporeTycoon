$(function() {

  var venueObject = {
    rafflesBoulevardPrice: 1000,
    rafflesBoulevardOccupancy: "0/3",

    caughtSmoking: 500,
    caughtSmokingOccupancy: null,

    botanicGardensPrice: 1000,
    botanicGardensOccupancy: null,

    ritzCarltonPrice: 1500,
    ritzCarltonOccupancy: "0/3",

    rafflesHotelPrice: 1500,
    rafflesHotelOccupancy: "0/3",

    caughtSpeedingPrice: 1500,
    caughtSpeedingOccupancy: null,

    bigSurprisePrice: [5000, -3000, 10000],
    bigSurpriseOccupancy: null,

    railMallPrice: 1500,
    railMallOccupancy: "0/3",

    westCoastParkPrice: 1500,
    westCoastParkOccupancy: null,

    lostInCasinoPrice: 1500,
    lostInCasinoOccupancy: null,

    dairyFarmPrice: 1500,
    dairyFarmOccupancy: "0/3",

    panPacificPrice: 1500,
    panPacificOccupancy: "0/3",

    rafflesCityMallPrice: 1500,
    rafflesCityMallOccupancy: "0/3",

    esplanadeParkPrice: 1500,
    esplanadeParkOccupancy: null,

    gotMuggedPrice: 1500,
    gotMuggedOccupancy: null,

    oldHollandRoadPrice: 1500,
    oldHollandRoadOccupancy: "0/3",

    NigerianScamPrice: 1500,
    NigerianScamOccupancy: null,

    belmontRoadPrice: 2500,
    belmontRoadOccupancy: "0/3",

    leedonParkPrice: 2500,
    leedonParkOccupancy: null,

    sentosaCovePrice: 3500,
    Occupancy: "0/3",
  }

	var gameState = {
      startedGame: false,
      whoseTurn: "human",
			humanCash: 8000,
			computerCash: 8000,
			numOfPlayerInGame: 0,
			currentTurn: "firstPlayer",
			firstPlayerName: "",
			secondPlayerName: "",
			thirdPlayerName: "",
			humanPlayerPosition: 1,
			computerPlayerPosition: 1,
		}

  	var playerPosition = 1;
  	var rollResult;
  	var num = 1;
  	var diceTimerID;
  	var characterMovementID;
  	var moveAnimationCounter = 0;
  	var completeRound;
    var playerClass;
    var movementCounter;

    init();


function init() {
			$('#p1-profile').prepend('<img src="images/raph-grey.png" id="raphAvatar" width="147" height="125" />');
			$('#p2-profile').prepend('<img src="images/elsa-grey.png" id="elsaAvatar" width="147" height="125" />');
      loadVenueInfo();
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

function loadVenueInfo() {
  $("#c2-venue").append('<span class="venueInfo-1"><br>$' + venueObject.bigSurprisePrice + '</span>');
  $("#c3-venue").append('<span class="venueInfo-1"><br>$' + venueObject.rafflesBoulevardPrice + '</span>');
  $("#c4-venue").append('<span class="venueInfo-1"><br>$' + venueObject.caughtSpeedingPrice + '</span>');
  $("#c5-venue").append('<span class="venueInfo-1"><br>$' + venueObject.botanicGardensPrice + '</span>');
  $("#c6-venue").append('<span class="venueInfo-1"><br>$' + venueObject.ritzCarltonPrice + '</span>');
  $("#c7-venue").append('<span class="venueInfo-1"><br>$' + venueObject.rafflesHotelPrice + '</span>');
  $("#c8-venue").append('<span class="venueInfo-1"><br>$' + venueObject.caughtSpeedingPrice + '</span>');
  $("#c9-venue").append('<span class="venueInfo-1"><br>$' + venueObject.bigSurprisePrice + '</span>');
  $("#c10-venue").append('<span class="venueInfo-1"><br>$' + venueObject.railMallPrice + '</span>');
  $("#c11-venue").append('<span class="venueInfo-1"><br>$' + venueObject.westCoastParkPrice + '</span>');
  $("#c12-venue").append('<span class="venueInfo-1"><br>$' + venueObject.lostInCasinoPrice + '</span>');
  $("#c13-venue").append('<span class="venueInfo-1"><br>$' + venueObject.bigSurprisePrice + '</span>');
  $("#c14-venue").append('<span class="venueInfo-1"><br>$' + venueObject.dairyFarmPrice + '</span>');
  $("#c15-venue").append('<span class="venueInfo-1"><br>$' + venueObject.panPacificPrice + '</span>');
  $("#c16-venue").append('<span class="venueInfo-1"><br>$' + venueObject.rafflesCityMallPrice + '</span>');
  $("#c17-venue").append('<span class="venueInfo-1"><br>$' + venueObject.esplanadeParkPrice + '</span>');
  $("#c18-venue").append('<span class="venueInfo-1"><br>$' + venueObject.gotMuggedPrice + '</span>');
  $("#c19-venue").append('<span class="venueInfo-1"><br>$' + venueObject.bigSurprisePrice + '</span>');
  $("#c20-venue").append('<span class="venueInfo-1"><br>$' + venueObject.oldHollandRoadPrice + '</span>');
  $("#c21-venue").append('<span class="venueInfo-1"><br>$' + venueObject.NigerianScamPrice + '</span>');
  $("#c22-venue").append('<span class="venueInfo-1"><br>$' + venueObject.belmontRoadPrice + '</span>');
  $("#c23-venue").append('<span class="venueInfo-1"><br>$' + venueObject.leedonParkPrice + '</span>');
  $("#c24-venue").append('<span class="venueInfo-1"><br>$' + venueObject.sentosaCovePrice + '</span>');
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
        $("#humanCashDisplay").text("Cash: $" + gameState.humanCash);
        break;
    case "elsa":
        $("#computerCashDisplay").text("Cash: $" + gameState.computerCash);
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
      removeDiceSelector();
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
  			characterMovementID = window.setInterval(startMoveAnimation, 100);
  		}
  	}

    function removeDiceSelector() {
      for (var x = 0; x < 9; x++)
      {
        $("#dice" + x).removeClass("diceSelector");
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
        getStartMoney("human");
        $("#status-2").text(moveAnimationCounter);
        $("#status-3").text(gameState.humanPlayerPosition);

        if (moveAnimationCounter == rollResult) {
          window.clearInterval(characterMovementID);
          gameState.whoseTurn = "computer";
          moveAnimationCounter = 0;
          landsOnGrid("human");
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
        getStartMoney("computer");
        $("#status-2").text(moveAnimationCounter);
        $("#status-3").text(gameState.computerPlayerPosition);

        if (moveAnimationCounter == rollResult) {
          window.clearInterval(characterMovementID);
          gameState.whoseTurn = "human";
          moveAnimationCounter = 0;
          landsOnGrid("computer");

      }
    }
}

      function getStartMoney(player) {
        console.log("Get Money Request");
        if (player == "human" && gameState.humanPlayerPosition == 1)
        {
          gameState.humanCash = gameState.humanCash + 4000;
          console.log("Human Get Money");
        }
        else if (player == "computer" & gameState.computerPlayerPosition == 1)
        {
          gameState.computerCash = gameState.computerCash + 4000;
          console.log("Computer Get Money");
        }
        $("#raphCashDisplay").text("Cash: $" + gameState.humanCash);
        $("#elsaCashDisplay").text("Cash: $" + gameState.computerCash);
      } // ends getStartMoney

      function landsOnGrid(player) {
        if (player == "human" && gameState.humanPlayerPosition == 1 ) {
          $("#status-4").text("Receive some moolah!");
        }
        else if (player == "computer" && gameState.computerPlayerPosition == 1 ) {
        $("#status-4").text("Receive some moolah 2!");
        }

        else if (player == "human" && gameState.humanPlayerPosition == 2 ) {
          $("#status-4").text("Surprise For you!");
        }
        else if (player == "computer" && gameState.computerPlayerPosition == 2 ) {
        $("#status-4").text("Surprise For you 2!");
        }

        else if (player == "human" && gameState.humanPlayerPosition == 3 ) {
          $("#status-4").text("Raffles Boulevard For Sale!");
        }
        else if (player == "computer" && gameState.computerPlayerPosition == 3 ) {
        $("#status-4").text("Raffles Boulevard For Sale2!");
        }

        else if (player == "human" && gameState.humanPlayerPosition == 4 ) {
          $("#status-4").text("FINE 4 Smoking!");
        }
        else if (player == "computer" && gameState.computerPlayerPosition == 4 ) {
        $("#status-4").text("FINE 4 Smoking2!");
        }

        else if (player == "human" && gameState.humanPlayerPosition == 5 ) {
          $("#status-4").text("Botanic Gardens!");
        }
        else if (player == "computer" && gameState.computerPlayerPosition == 5 ) {
        $("#status-4").text("Botanic Gardens2!");
        }

        else if (player == "human" && gameState.humanPlayerPosition == 6 ) {
          $("#status-4").text("Buy Ritz Carlton!");
        }
        else if (player == "computer" && gameState.computerPlayerPosition == 6 ) {
        $("#status-4").text("Buy Ritz Carlton 2!");
        }

        else if (player == "human" && gameState.humanPlayerPosition == 7 ) {
          $("#status-4").text("Buy Raffles Hotel!");
        }
        else if (player == "computer" && gameState.computerPlayerPosition == 7 ) {
        $("#status-4").text("Buy Raffles Hotel2!");
        }

        else if (player == "human" && gameState.humanPlayerPosition == 8 ) {
          $("#status-4").text("Caught Speeding!");
          gameState.humanCash -= 1500;
          updateDisplay();
        }
        else if (player == "computer" && gameState.computerPlayerPosition == 8 ) {
        $("#status-4").text("Caught Speeding2!");
        }

        else if (player == "human" && gameState.humanPlayerPosition == 9 ) {
          $("#status-4").text("BIG SURPRISE!");
        }
        else if (player == "computer" && gameState.computerPlayerPosition == 9 ) {
        $("#status-4").text("BIG SURPRISE2!");
        }

        else if (player == "human" && gameState.humanPlayerPosition == 10 ) {
          $("#status-4").text("Buy Rail Mall!");
        }
        else if (player == "computer" && gameState.computerPlayerPosition == 10 ) {
        $("#status-4").text("Buy Rail Mall 2!");
        }

        else if (player == "human" && gameState.humanPlayerPosition == 11 ) {
          $("#status-4").text("Buy West Coast Park!");
        }
        else if (player == "computer" && gameState.computerPlayerPosition == 11 ) {
        $("#status-4").text("Buy West Coast Park 2!");
        }

        else if (player == "human" && gameState.humanPlayerPosition == 12 ) {
          $("#status-4").text("Lost Money in Casino!");
        }
        else if (player == "computer" && gameState.computerPlayerPosition == 12 ) {
        $("#status-4").text("Lost Money in Casino 2!");
        }

        else if (player == "human" && gameState.humanPlayerPosition == 13 ) {
          $("#status-4").text("BIG SURPRISE!");
        }
        else if (player == "computer" && gameState.computerPlayerPosition == 13 ) {
        $("#status-4").text("BIG SURPRISE 2!");
        }

        else if (player == "human" && gameState.humanPlayerPosition == 14 ) {
          $("#status-4").text("Dairy Farm Road!");
        }
        else if (player == "computer" && gameState.computerPlayerPosition == 14 ) {
        $("#status-4").text("Dairy Farm Road 2 !");
        }

        else if (player == "human" && gameState.humanPlayerPosition == 15 ) {
          $("#status-4").text("Buy Pan Pacific!");
        }
        else if (player == "computer" && gameState.computerPlayerPosition == 15 ) {
        $("#status-4").text("Buy Pan Pacific 2!");
        }

        else if (player == "human" && gameState.humanPlayerPosition == 16 ) {
          $("#status-4").text("Buy Raffles City Mall!");
        }
        else if (player == "computer" && gameState.computerPlayerPosition == 16 ) {
        $("#status-4").text("Buy Raffles City Mall 2!");
        }

        else if (player == "human" && gameState.humanPlayerPosition == 17 ) {
          $("#status-4").text("Buy Esplanade Park!");
        }
        else if (player == "computer" && gameState.computerPlayerPosition == 17 ) {
        $("#status-4").text("Buy Esplanade Park 2!");
        }

        else if (player == "human" && gameState.humanPlayerPosition == 18 ) {
          $("#status-4").text("Got Mugged!");
        }
        else if (player == "computer" && gameState.computerPlayerPosition == 18 ) {
        $("#status-4").text("Got Mugged 2!");
        }

        else if (player == "human" && gameState.humanPlayerPosition == 19 ) {
          $("#status-4").text("BIG SURPRISE!");
        }
        else if (player == "computer" && gameState.computerPlayerPosition == 19 ) {
        $("#status-4").text("BIG SURPRISE 2!");
        }

        else if (player == "human" && gameState.humanPlayerPosition == 20 ) {
          $("#status-4").text("Buy Old Holland Road!");
        }
        else if (player == "computer" && gameState.computerPlayerPosition == 20 ) {
        $("#status-4").text("Buy Old Holland Road 2!");
        }

        else if (player == "human" && gameState.humanPlayerPosition == 21 ) {
          $("#status-4").text("Nigerian Scam!");
        }
        else if (player == "computer" && gameState.computerPlayerPosition == 21 ) {
        $("#status-4").text("Nigerian Scam 2!");
        }

        else if (player == "human" && gameState.humanPlayerPosition == 22 ) {
          $("#status-4").text("Buy Belmont Road!");
        }
        else if (player == "computer" && gameState.computerPlayerPosition == 22 ) {
        $("#status-4").text("Buy Belmont Road 2!");
        }

        else if (player == "human" && gameState.humanPlayerPosition == 23 ) {
          $("#status-4").text("Buy Leedon Park!");
        }
        else if (player == "computer" && gameState.computerPlayerPosition == 23 ) {
        $("#status-4").text("Buy Leedon Park 2!");
        }

        else if (player == "human" && gameState.humanPlayerPosition == 24 ) {
          $("#status-4").text("Buy Sentosa Cove!");
        }
        else if (player == "computer" && gameState.computerPlayerPosition == 24 ) {
        $("#status-4").text("Buy Sentosa Cove 2!");
        }
      }

      function updateDisplay() {
        $("#raphCashDisplay").text("hello");
      }


}); // close function
