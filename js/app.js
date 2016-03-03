$(function() {
	var venueObject = {
		rafflesBoulevardPrice: 1000,
		rafflesBoulevardOccupancy: false,
		rafflesBoulevardOwner: null,
		caughtSmoking: 500,
		botanicGardensPrice: 1100,
		botanicGardensOccupancy: false,
		botanicGardensOwner: null,
		ritzCarltonPrice: 1200,
		ritzCarltonOccupancy: false,
		ritzCarltonOwner: null,
		rafflesHotelPrice: 1300,
		rafflesHotelOccupancy: false,
		rafflesHotelOwner: null,
		caughtSpeedingPrice: 1400,
		bigSurprisePrice: [1000, 5000, 3000, 2000, 12000],
		railMallPrice: 1500,
		railMallOccupancy: false,
		railMallOwner: null,
		westCoastParkPrice: 1600,
		westCoastParkOccupancy: false,
		westCoastParkOwner: null,
		lostInCasinoPrice: 1700,
		dairyFarmPrice: 1800,
		dairyFarmOccupancy: false,
		dairyFarmOwner: null,
		panPacificPrice: 1900,
		panPacificOccupancy: false,
		panPacificOwner: null,
		rafflesCityMallPrice: 2000,
		rafflesCityMallOccupancy: false,
		rafflesCityOwner: null,
		esplanadeParkPrice: 2100,
		esplanadeParkOccupancy: false,
		esplanadeParkOwner: null,
		gotMuggedPrice: 2200,
		oldHollandRoadPrice: 2300,
		oldHollandRoadOccupancy: false,
		oldHollandRoadOwner: null,
		NigerianScamPrice: 2400,
		belmontRoadPrice: 2500,
		belmontRoadOccupancy: false,
		belmontRoadOwner: null,
		leedonParkPrice: 2600,
		leedonParkOccupancy: false,
		leedonParkOwner: null,
		sentosaCovePrice: 2700,
		sentosaCoveOccupancy: false,
		sentosaCoveOwner: null,
	}
	var gameState = {
		startedGame: false,
		whoseTurn: "human",
		humanCash: 8000,
		computerCash: 8000,
		numOfPlayerInGame: 0,
		firstPlayerName: "",
		secondPlayerName: "",
		thirdPlayerName: "",
		humanPlayerPosition: 1,
		computerPlayerPosition: 1,
		okToBuy: null,
		rentPaid: "",
		startCash: 4000,
		rentStatus: false
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
	$('button').click(function() { // Add Button Listener :: START ::
		if (this.id == "btn-roll") {
			startGame()
		} else if (this.id == "btn-buyHotel") {
			buyHotel();
		} else if (this.id == "btn-sellHotel") {
			sellHotel();
		}
	});

	function startGame() {
		if (gameState.startedGame == false) {
			loadPlayers();
			$("#status-1").html("Game Begins!")
			$("#btn-roll").removeClass("btnPreGame");
			$("#btn-roll").text("Roll Dice");
			$("#btn-roll").addClass("startDice");
			gameState.startedGame = true;
			console.log("Game has started");
			showWhoseTurnDelay();
		} else {
			showWhoseTurn();
			rollDice();
		}
	}

	function showWhoseTurnDelay () {
		setTimeout(showWhoseTurn, 600);
	}

	function showWhoseTurn() {
		if (gameState.whoseTurn == "human") {
			$("#status-2").html("Next Turn: <p> &nbsp;&nbsp;:: RAPH :: &nbsp;<p> &nbsp;&nbsp;Roll The Dice &nbsp;");
		}
		else {
			$("#status-2").html("Next Turn: <p> &nbsp;&nbsp;:: ELSA :: &nbsp;<p> &nbsp;&nbsp;Roll The Dice &nbsp;");
		}
	}

	function loadVenueInfo() {
		// $("#c2-venue").append('<span class="venueInfo-1"><br>Lucky Draw!</span>');
		$("#c3-venue").append('<span class="venueInfo-1"><br>$' + venueObject.rafflesBoulevardPrice + '</span>');
		$("#c4-venue").append('<span class="venueInfo-1"><br>$' + venueObject.caughtSmoking + '</span>');
		$("#c5-venue").append('<span class="venueInfo-1"><br>$' + venueObject.botanicGardensPrice + '</span>');
		$("#c6-venue").append('<span class="venueInfo-1"><br>$' + venueObject.ritzCarltonPrice + '</span>');
		$("#c7-venue").append('<span class="venueInfo-1"><br>$' + venueObject.rafflesHotelPrice + '</span>');
		$("#c8-venue").append('<span class="venueInfo-1"><br>$' + venueObject.caughtSpeedingPrice + '</span>');
		// $("#c9-venue").append('<span class="venueInfo-1"><br>Lucky Draw!</span>');
		$("#c10-venue").append('<span class="venueInfo-1"><br>$' + venueObject.railMallPrice + '</span>');
		$("#c11-venue").append('<span class="venueInfo-1"><br>$' + venueObject.westCoastParkPrice + '</span>');
		$("#c12-venue").append('<span class="venueInfo-1"><br>$' + venueObject.lostInCasinoPrice + '</span>');
		// $("#c13-venue").append('<span class="venueInfo-1"><br>$' + venueObject.bigSurprisePrice + '</span>');
		$("#c14-venue").append('<span class="venueInfo-1"><br>$' + venueObject.dairyFarmPrice + '</span>');
		$("#c15-venue").append('<span class="venueInfo-1"><br>$' + venueObject.panPacificPrice + '</span>');
		$("#c16-venue").append('<span class="venueInfo-1"><br>$' + venueObject.rafflesCityMallPrice + '</span>');
		$("#c17-venue").append('<span class="venueInfo-1"><br>$' + venueObject.esplanadeParkPrice + '</span>');
		$("#c18-venue").append('<span class="venueInfo-1"><br>$' + venueObject.gotMuggedPrice + '</span>');
		// $("#c19-venue").append('<span class="venueInfo-1"><br>Lucky Draw!</span>');
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
		$('#c1-playerBox-1').addClass("showRaph"); // Un-grey Raph's profile photo
		loadAvatarSmallIcon("raph");
		loadPlayerResources("raph");
	}

	function loadElsaIntoGame() {
		$('#c1-playerBox-2').addClass("showElsa"); // Un-grey Elsa's profile photo
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
		switch (char) {
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
		gameState.rentStatus = false;
		$("#status-3").html("...");
		$("#status-4").html("...");
		rollResult = Math.floor(Math.random() * 8) + 1;
		$("#dice" + rollResult).removeClass("diceSelector"); // remove dice region colour
		diceTimerID = window.setInterval(startDiceAnimation, 150);
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
			setTimeout(delayOneSecond, 1000);
		}
	}

	function delayOneSecond() {
		characterMovementID = window.setInterval(startMoveAnimation, 200);
	}

	function removeDiceSelector() {
		for (var x = 0; x < 9; x++) {
			$("#dice" + x).removeClass("diceSelector");
		}
	}

	function startMoveAnimation() {
		if (gameState.whoseTurn == "human") {
			$("#status-2").text(gameState.humanPlayerPosition);
			$("#c" + gameState.humanPlayerPosition + "-playerBox-1").removeClass("showRaph");
			if (gameState.humanPlayerPosition != 24) {
				$('#c' + (gameState.humanPlayerPosition + 1) + '-playerBox-1').addClass("showRaph");
			} else {
				$('#c1-playerBox-1').addClass("showRaph");
			}
			gameState.humanPlayerPosition++;
			if (gameState.humanPlayerPosition > 24) {
				gameState.humanPlayerPosition = gameState.humanPlayerPosition - 24;
			}
			moveAnimationCounter++
			getStartMoney("human");
			$("#status-2").text(moveAnimationCounter);
			if (moveAnimationCounter == rollResult) { // set Roll to 1 for testing
				window.clearInterval(characterMovementID);
				gameState.whoseTurn = "computer";
				moveAnimationCounter = 0;
				console.log("Human Position is at: " + gameState.humanPlayerPosition);
				landsOnGrid("human");
			}
		} else {
			$("#status-2").text(gameState.computerPlayerPosition);
			$("#c" + gameState.computerPlayerPosition + "-playerBox-2").removeClass("showElsa");
			if (gameState.computerPlayerPosition != 24) {
				$('#c' + (gameState.computerPlayerPosition + 1) + '-playerBox-2').addClass("showElsa");
			} else {
				$('#c1-playerBox-2').addClass("showElsa");
			}
			gameState.computerPlayerPosition++;
			if (gameState.computerPlayerPosition > 24) {
				gameState.computerPlayerPosition = gameState.computerPlayerPosition - 24;
			}
			moveAnimationCounter++
			getStartMoney("computer");
			$("#status-2").text(moveAnimationCounter);
			if (moveAnimationCounter == rollResult) { // set Roll to 1 for testing
				window.clearInterval(characterMovementID);
				gameState.whoseTurn = "human";
				moveAnimationCounter = 0;
				console.log("Computer position is at: " + gameState.computerPlayerPosition);
				landsOnGrid("computer");
			}
		}
	}

	function getStartMoney(player) {
			console.log("Get Money Request");
			if (player == "human" && gameState.humanPlayerPosition == 1) {
				gameState.humanCash = gameState.humanCash + gameState.startCash;
				console.log("Human Get Money");
			} else if (player == "computer" & gameState.computerPlayerPosition == 1) {
				gameState.computerCash = gameState.computerCash + gameState.startCash;
				console.log("Computer Get Money");
			}
			updateCashDisplay();
		} // ends getStartMoney

	function landsOnGrid(player) {
		console.log(venueObject);
		console.log(gameState);
		if (player == "human" && gameState.humanPlayerPosition == 1) {
			$("#status-1").html("You Have Received Some Mooolah!<p>Oh Yeah!");
			showWhoseTurnDelay();
			$("#status-3").html("+$" + gameState.startCash);
		} else if (player == "computer" && gameState.computerPlayerPosition == 1) {
			$("#status-1").html("You Have Received Some Mooolah!<p>Oh Yeah!");
			showWhoseTurnDelay();
			$("#status-4").html("+$" + gameState.startCash);
		} else if (player == "human" && gameState.humanPlayerPosition == 2) {
			var prize = getSurprise();
			gameState.humanCash = gameState.humanCash + prize;
			$("#status-1").html("Toto Results! <p> You Won $" + prize + "!");
			updateCashDisplay();
			showWhoseTurnDelay();
			$("#status-3").html("+$" + prize);
		} else if (player == "computer" && gameState.computerPlayerPosition == 2) {
			var prize = getSurprise();
			gameState.computerCash = gameState.computerCash + prize;
			$("#status-1").html("Toto Results! <p> You Won $" + prize + "!");
			updateCashDisplay();
			showWhoseTurnDelay();
			$("#status-4").html("+$" + prize);
		} else if (player == "human" && gameState.humanPlayerPosition == 3) {
			payRent("human", venueObject.rafflesBoulevardOwner, 3);
			checkLoser();
			console.log("Human Cash: " + gameState.humanCash + ",  Raffles Boulevard: " + venueObject.rafflesBoulevardPrice + " , Occupancy: " + venueObject.rafflesBoulevardOccupancy)
			if (gameState.humanCash > venueObject.rafflesBoulevardPrice && venueObject.rafflesBoulevardOccupancy == false) {
				$("#status-1").html("Raffles Boulevard is available! <p>Do You Want To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
				showWhoseTurnDelay();
			} else {
				gameState.okToBuy = false;
				if (gameState.rentStatus == true) {
					$("#status-1").html("Oops!<p>You Are On Somebody's Turf!");
				}
				else {
					$("#status-1").html("Nice Property eh?");
				}
				updateCashDisplay();
				showWhoseTurnDelay();
			}
		} else if (player == "computer" && gameState.computerPlayerPosition == 3) {
			payRent("computer", venueObject.rafflesBoulevardOwner, 3);
			console.log("Computer Cash: " + gameState.computerCash + ",  Dairy Farm: " + venueObject.rafflesBoulevardPrice + " , Occupancy: " + venueObject.rafflesBoulevardOccupancy)
			if (gameState.computerCash > venueObject.rafflesBoulevardPrice && venueObject.rafflesBoulevardOccupancy == false) {
				$("#status-1").html("Raffles Boulevard is available! <p>Do You Wish To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
				showWhoseTurnDelay();
			} else {
				gameState.okToBuy = false;
				if (gameState.rentStatus == true) {
						$("#status-1").html("Oops! <p>You Are On Somebody's Turf!");
					}
					else {
						$("#status-1").html("Nice Property eh?");
					}
				updateCashDisplay();
				showWhoseTurnDelay();
			}

		} else if (player == "human" && gameState.humanPlayerPosition == 4) {
			gameState.humanCash = gameState.humanCash - venueObject.caughtSmoking;
			$("#status-1").html("Tough Luck From The Not So Friendly NEA Officer!");
			updateCashDisplay();
			showWhoseTurnDelay();
			$("#status-3").html("-$" + venueObject.caughtSmoking);

		} else if (player == "computer" && gameState.computerPlayerPosition == 4) {
			gameState.computerCash = gameState.computerCash - venueObject.caughtSmoking;
			$("#status-1").html("Tough Luck From The Not So Friendly NEA Officer!");
			updateCashDisplay();
			showWhoseTurnDelay();
			$("#status-4").html("-$" + venueObject.caughtSmoking);
		} else if (player == "human" && gameState.humanPlayerPosition == 5) {
			payRent("human", venueObject.botanicGardensOwner, 5);
			checkLoser();
			console.log("Human Cash: " + gameState.humanCash + ", Botanic Gardens Price: " + venueObject.botanicGardensPrice + " , Occupancy: " + venueObject.botanicGardensOccupancy)
			if (gameState.humanCash > venueObject.botanicGardensPrice && venueObject.botanicGardensOccupancy == false) {
				$("#status-1").html("Botanic Gardens For Sale! <p>Do You Want To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
				showWhoseTurnDelay();
			} else {
				gameState.okToBuy = false;
				if (gameState.rentStatus == true) {
						$("#status-1").html("Oops! <p>You Are On Somebody's Turf!");
					}
					else {
						$("#status-1").html("Nice Property eh?");
					}
				updateCashDisplay();
				showWhoseTurnDelay();
			}
		} else if (player == "computer" && gameState.computerPlayerPosition == 5) {
			payRent("computer", venueObject.botanicGardensOwner, 5);
			checkLoser();
			console.log("Computer Cash: " + gameState.computerCash + ", Botanic Garden Price: " + venueObject.botanicGardensPrice + " , Occupancy: " + venueObject.botanicGardensOccupancy)
			if (gameState.computerCash > venueObject.botanicGardensPrice && venueObject.botanicGardensOccupancy == false) {
				$("#status-1").html("Botanic Gardens For Sale! <p>Do You Wish To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
				showWhoseTurnDelay();
			} else {
				gameState.okToBuy = false;
				if (gameState.rentStatus == true) {
						$("#status-1").html("Oops! <p>You Are On Somebody's Turf!");
					}
					else {
						$("#status-1").html("Nice Property eh?");
					}
									updateCashDisplay();
				showWhoseTurnDelay();
			}
		} else if (player == "human" && gameState.humanPlayerPosition == 6) {
			payRent("human", venueObject.ritzCarltonOwner, 6);
			checkLoser();
			console.log("Human Cash: " + gameState.humanCash + ", Ritz Carlton Price: " + venueObject.ritzCarltonPrice + " , Occupancy: " + venueObject.ritzCarltonOccupancy)
			if (gameState.humanCash > venueObject.ritzCarltonPrice && venueObject.ritzCarltonOccupancy == false) {
				$("#status-1").html("Ritz Carlton is available! <p>Do You Want To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
				showWhoseTurnDelay();
			} else {
				gameState.okToBuy = false;
				if (gameState.rentStatus == true) {
					$("#status-1").html("Oops!<p>You Are On Somebody's Turf!");
				}
				else {
					$("#status-1").html("Nice Property eh?");
				}
								updateCashDisplay();
				showWhoseTurnDelay();
			}
		} else if (player == "computer" && gameState.computerPlayerPosition == 6) {
			payRent("computer", venueObject.ritzCarltonOwner, 6);
			checkLoser();
			console.log("Computer Cash: " + gameState.computerCash + ", Ritz Carlton Price: " + venueObject.ritzCarltonPrice + " , Occupancy: " + venueObject.ritzCarltonOccupancy)
			if (gameState.computerCash > venueObject.ritzCarltonPrice && venueObject.ritzCarltonOccupancy == false) {
				$("#status-1").html("Ritz Carlton is available! <p>Do You Wish To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
				showWhoseTurnDelay();
			} else {
				gameState.okToBuy = false;
				if (gameState.rentStatus == true) {
					$("#status-1").html("Oops!<p>You Are On Somebody's Turf!");
				}
				else {
					$("#status-1").html("Nice Property eh?");
				}
								updateCashDisplay();
				showWhoseTurnDelay();
			}
		} else if (player == "human" && gameState.humanPlayerPosition == 7) {
			payRent("human", venueObject.rafflesHotelOwner, 7);
			checkLoser();
			console.log("Human Cash: " + gameState.humanCash + ", Raffles Hotel Price: " + venueObject.rafflesHotelPrice + " , Occupancy: " + venueObject.rafflesHotelOccupancy)
			if (gameState.humanCash > venueObject.rafflesHotelPrice && venueObject.rafflesHotelOccupancy == false) {
				$("#status-1").html("Raffles Hotel is available! <p>Do You Want To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
				showWhoseTurnDelay();
			} else {
				gameState.okToBuy = false;
				if (gameState.rentStatus == true) {
					$("#status-1").html("Oops!<p>You Are On Somebody's Turf!");
				}
				else {
					$("#status-1").html("Nice Property eh?");
				}
								updateCashDisplay();
				showWhoseTurnDelay();
			}
		} else if (player == "computer" && gameState.computerPlayerPosition == 7) {
			payRent("computer", venueObject.rafflesHotelOwner, 7);
			checkLoser();
			console.log("Computer Cash: " + gameState.computerCash + ", Raffles Hotel Price: " + venueObject.rafflesHotelPrice + " , Occupancy: " + venueObject.rafflesHotelOccupancy)
			if (gameState.computerCash > venueObject.rafflesBoulevardPrice && venueObject.rafflesHotelOccupancy == false) {
				$("#status-1").html("Raffles Hotel is available! <p>Do You Wish To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
				showWhoseTurnDelay();
			} else {
				gameState.okToBuy = false;
				if (gameState.rentStatus == true) {
					$("#status-1").html("Oops!<p>You Are On Somebody's Turf!");
				}
				else {
					$("#status-1").html("Nice Property eh?");
				}
								updateCashDisplay();
				showWhoseTurnDelay();
			}
		} else if (player == "human" && gameState.humanPlayerPosition == 8) {
			gameState.humanCash = gameState.humanCash - venueObject.caughtSpeedingPrice;
			$("#status-1").html("High Speed Chase With LTA Officer On The Roads!");
			updateCashDisplay();
			showWhoseTurnDelay();
			$("#status-3").html("-$" + venueObject.caughtSpeedingPrice);
		} else if (player == "computer" && gameState.computerPlayerPosition == 8) {
			gameState.computerCash = gameState.computerCash - venueObject.caughtSpeedingPrice;
			$("#status-1").html("High Speed Chase With LTA Officer On The Roads!");
			updateCashDisplay();
			showWhoseTurnDelay();
			$("#status-4").html("-$" + venueObject.caughtSpeedingPrice);

		} else if (player == "human" && gameState.humanPlayerPosition == 9) {
			var prize = getSurprise();
			gameState.humanCash = gameState.humanCash + prize;
			$("#status-1").html("4-D Results! <p> You Won $" + prize + "!");
			updateCashDisplay();
			showWhoseTurnDelay();
			$("#status-3").html("+$" + prize);

		} else if (player == "computer" && gameState.computerPlayerPosition == 9) {
			var prize = getSurprise();
			gameState.computerCash = gameState.computerCash + prize;
			$("#status-1").html("4-D Results! <p> You Won $" + prize + "!");
			updateCashDisplay();
			showWhoseTurnDelay();
			$("#status-4").html("+$" + prize);

		} else if (player == "human" && gameState.humanPlayerPosition == 10) {
			payRent("human", venueObject.railMallOwner, 10);
			checkLoser();
			console.log("Human Cash: " + gameState.humanCash + ", Rail Mall Price: " + venueObject.railMallPrice + " , Occupancy: " + venueObject.railMallOccupancy)
			if (gameState.humanCash > venueObject.railMallPrice && venueObject.railMallOccupancy == false) {
				$("#status-1").html("Rail Mall is available! <p>Do You Want To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
				showWhoseTurnDelay();
			} else {
				gameState.okToBuy = false;
				if (gameState.rentStatus == true) {
					$("#status-1").html("Oops!<p>You Are On Somebody's Turf!");
				}
				else {
					$("#status-1").html("Nice Property eh?");
				}
								updateCashDisplay();
				showWhoseTurnDelay();
			}
		} else if (player == "computer" && gameState.computerPlayerPosition == 10) {
			payRent("computer", venueObject.railMallOwner, 10);
			checkLoser();
			console.log("Computer Cash: " + gameState.computerCash + ", Rail Mall Price: " + venueObject.railMallPrice + " , Occupancy: " + venueObject.railMallOccupancy)
			if (gameState.computerCash > venueObject.railMallPrice && venueObject.railMallOccupancy == false) {
				$("#status-1").html("Rail Mall is available! <p>Do You Wish To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
				showWhoseTurnDelay();
			} else {
				gameState.okToBuy = false;
				if (gameState.rentStatus == true) {
					$("#status-1").html("Oops!<p>You Are On Somebody's Turf!");
				}
				else {
					$("#status-1").html("Nice Property eh?");
				}
								updateCashDisplay();
				showWhoseTurnDelay();
			}
		} else if (player == "human" && gameState.humanPlayerPosition == 11) {
			payRent("human", venueObject.westCoastParkOwner, 11);
			checkLoser();
			console.log("Human Cash: " + gameState.humanCash + ",  West Coast Park Price: " + venueObject.westCoastParkPrice + " , Occupancy: " + venueObject.westCoastParkOccupancy)
			if (gameState.humanCash > venueObject.westCoastParkPrice && venueObject.westCoastParkOccupancy == false) {
				$("#status-1").html("West Coast Park is available! <p>Do You Want To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
				showWhoseTurnDelay();
			} else {
				gameState.okToBuy = false;
				if (gameState.rentStatus == true) {
					$("#status-1").html("Oops!<p>You Are On Somebody's Turf!");
				}
				else {
					$("#status-1").html("Nice Property eh?");
				}
								updateCashDisplay();
				showWhoseTurnDelay();
			}
		} else if (player == "computer" && gameState.computerPlayerPosition == 11) {
			payRent("computer", venueObject.westCoastParkOwner, 11);
			checkLoser();
			console.log("Computer Cash: " + gameState.computerCash + ",  West Coast Park Price: " + venueObject.westCoastParkPrice + " , Occupancy: " + venueObject.westCoastParkOccupancy)
			if (gameState.computerCash > venueObject.westCoastParkPrice && venueObject.westCoastParkOccupancy == false) {
				$("#status-1").html("West Coast Park is available! <p>Do You Wish To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
				showWhoseTurnDelay();
			} else {
				gameState.okToBuy = false;
				if (gameState.rentStatus == true) {
					$("#status-1").html("Oops!<p>You Are On Somebody's Turf!");
				}
				else {
					$("#status-1").html("Nice Property eh?");
				}
								updateCashDisplay();
				showWhoseTurnDelay();
			}
		} else if (player == "human" && gameState.humanPlayerPosition == 12) {
			gameState.humanCash = gameState.humanCash - venueObject.lostInCasinoPrice;
			$("#status-1").html("Lost Money In Casino After Drunken Stupor! First Round Showed Hand!");
			updateCashDisplay();
			showWhoseTurnDelay();
		} else if (player == "computer" && gameState.computerPlayerPosition == 12) {
			gameState.computerCash = gameState.computerCash - venueObject.lostInCasinoPrice;
			$("#status-1").html("Lost Money In Casino After Drunken Stupor! First Round Showed Hand!");
			updateCashDisplay();
			showWhoseTurnDelay();
		} else if (player == "human" && gameState.humanPlayerPosition == 13) {
			var prize = getSurprise();
			gameState.humanCash = gameState.humanCash + prize;
			$("#status-1").html("Found A Cheque With Your Name <p>$" + prize + "!");
			updateCashDisplay();
			showWhoseTurnDelay();
			$("#status-3").html("+$" + prize);

		} else if (player == "computer" && gameState.computerPlayerPosition == 13) {
			var prize = getSurprise();
			gameState.computerCash = gameState.computerCash + prize;
			$("#status-1").html("Found A Cheque With Your Name <p>$" + prize + "!");
			updateCashDisplay();
			showWhoseTurnDelay();
			$("#status-4").html("+$" + prize);

		} else if (player == "human" && gameState.humanPlayerPosition == 14) {
			payRent("human", venueObject.dairyFarmOwner, 14);
			checkLoser();
			console.log("Human Cash: " + gameState.humanCash + ",  Dairy Farm: " + venueObject.dairyFarmPrice + " , Occupancy: " + venueObject.dairyFarmOccupancy)
			if (gameState.humanCash > venueObject.dairyFarmPrice && venueObject.dairyFarmOccupancy == false) {
				$("#status-1").html("Dairy Farm is available! <p>Do You Want To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
				showWhoseTurnDelay();
			} else {
				gameState.okToBuy = false;
				if (gameState.rentStatus == true) {
					$("#status-1").html("Oops!<p>You Are On Somebody's Turf!");
				}
				else {
					$("#status-1").html("Nice Property eh?");
				}
								updateCashDisplay();
				showWhoseTurnDelay();
			}
		} else if (player == "computer" && gameState.computerPlayerPosition == 14) {
			payRent("computer", venueObject.dairyFarmOwner, 14);
			checkLoser();
			console.log("Computer Cash: " + gameState.computerCash + ",  Dairy Farm: " + venueObject.dairyFarmPrice + " , Occupancy: " + venueObject.dairyFarmOccupancy)
			if (gameState.computerCash > venueObject.dairyFarmPrice && venueObject.dairyFarmOccupancy == false) {
				$("#status-1").html("Dairy Farm is available! <p>Do You Wish To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
				showWhoseTurnDelay();
			} else {
				gameState.okToBuy = false;
				if (gameState.rentStatus == true) {
					$("#status-1").html("Oops!<p>You Are On Somebody's Turf!");
				}
				else {
					$("#status-1").html("Nice Property eh?");
				}
								updateCashDisplay();
				showWhoseTurnDelay();
			}
		} else if (player == "human" && gameState.humanPlayerPosition == 15) {
			payRent("human", venueObject.panPacificOwner, 15);
			checkLoser();
			console.log("Human Cash: " + gameState.humanCash + ",  Pan Pacific: " + venueObject.panPacificPrice + " , Occupancy: " + venueObject.panPacificOccupancy)
			if (gameState.humanCash > venueObject.panPacificPrice && venueObject.panPacificOccupancy == false) {
				$("#status-1").html("Pan Pacific is available! <p>Do You Want To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
				showWhoseTurnDelay();
			} else {
				gameState.okToBuy = false;
				if (gameState.rentStatus == true) {
					$("#status-1").html("Oops!<p>You Are On Somebody's Turf!");
				}
				else {
					$("#status-1").html("Nice Property eh?");
				}
								updateCashDisplay();
				showWhoseTurnDelay();
			}
		} else if (player == "computer" && gameState.computerPlayerPosition == 15) {
			payRent("computer", venueObject.panPacificOwner, 15);
			checkLoser();
			console.log("Computer Cash: " + gameState.computerCash + ",  Pan Pacific: " + venueObject.panPacificPrice + " , Occupancy: " + venueObject.panPacificOccupancy)
			if (gameState.computerCash > venueObject.panPacificPrice && venueObject.panPacificOccupancy == false) {
				$("#status-1").html("Pan Pacific is available! <p>Do You Wish To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
				showWhoseTurnDelay();
			} else {
				gameState.okToBuy = false;
				if (gameState.rentStatus == true) {
					$("#status-1").html("Oops!<p>You Are On Somebody's Turf!");
				}
				else {
					$("#status-1").html("Nice Property eh?");
				}
								updateCashDisplay();
				showWhoseTurnDelay();
			}
		} else if (player == "human" && gameState.humanPlayerPosition == 16) {
			payRent("human", venueObject.rafflesCityOwner, 16);
			checkLoser();
			console.log("Human Cash: " + gameState.humanCash + ",  Raffles City Mall: " + venueObject.rafflesCityMallPrice + " , Occupancy: " + venueObject.rafflesCityMallOccupancy)
			if (gameState.humanCash > venueObject.rafflesCityMallPrice && venueObject.rafflesCityMallOccupancy == false) {
				$("#status-1").html("Raffles City Mall is available! <p>Do You Want To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
				showWhoseTurnDelay();
			} else {
				gameState.okToBuy = false;
				if (gameState.rentStatus == true) {
					$("#status-1").html("Oops!<p>You Are On Somebody's Turf!");
				}
				else {
					$("#status-1").html("Nice Property eh?");
				}
								updateCashDisplay();
				showWhoseTurnDelay();
			}
		} else if (player == "computer" && gameState.computerPlayerPosition == 16) {
			payRent("computer", venueObject.rafflesCityOwner, 16);
			checkLoser();
			console.log("Computer Cash: " + gameState.computerCash + ",  Pan Pacific: " + venueObject.rafflesCityMallPrice + " , Occupancy: " + venueObject.rafflesCityMallOccupancy)
			if (gameState.computerCash > venueObject.rafflesCityMallPrice && venueObject.rafflesCityMallOccupancy == false) {
				$("#status-1").html("Raffles City Mall is available! <p>Do You Wish To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
				showWhoseTurnDelay();
			} else {
				gameState.okToBuy = false;
				if (gameState.rentStatus == true) {
					$("#status-1").html("Oops!<p>You Are On Somebody's Turf!");
				}
				else {
					$("#status-1").html("Nice Property eh?");
				}
								updateCashDisplay();
				showWhoseTurnDelay();
			}
		} else if (player == "human" && gameState.humanPlayerPosition == 17) {
			payRent("human", venueObject.esplanadeParkOwner, 17);
			checkLoser();
			console.log("Human Cash: " + gameState.humanCash + ",  Raffles City Mall: " + venueObject.esplanadeParkPrice + " , Occupancy: " + venueObject.esplanadeParkOccupancy)
			if (gameState.humanCash > venueObject.esplanadeParkPrice && venueObject.esplanadeParkOccupancy == false) {
				$("#status-1").html("Esplanade Park is available! <p>Do You Want To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
				showWhoseTurnDelay();
			} else {
				gameState.okToBuy = false;
				if (gameState.rentStatus == true) {
					$("#status-1").html("Oops!<p>You Are On Somebody's Turf!");
				}
				else {
					$("#status-1").html("Nice Property eh?");
				}
								updateCashDisplay();
				showWhoseTurnDelay();
			}
		} else if (player == "computer" && gameState.computerPlayerPosition == 17) {
			payRent("computer", venueObject.esplanadeParkOwner, 17);
			checkLoser();
			console.log("Computer Cash: " + gameState.computerCash + ",  Pan Pacific: " + venueObject.esplanadeParkPrice + " , Occupancy: " + venueObject.esplanadeParkOccupancy)
			if (gameState.computerCash > venueObject.esplanadeParkPrice && venueObject.esplanadeParkOccupancy == false) {
				$("#status-1").html("Esplanade Park is available! <p>Do You Wish To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
				showWhoseTurnDelay();
			} else {
				gameState.okToBuy = false;
				if (gameState.rentStatus == true) {
					$("#status-1").html("Oops!<p>You Are On Somebody's Turf!");
				}
				else {
					$("#status-1").html("Nice Property eh?");
				}
								updateCashDisplay();
				showWhoseTurnDelay();
			}
		} else if (player == "human" && gameState.humanPlayerPosition == 18) {
			gameState.humanCash = gameState.humanCash - venueObject.gotMuggedPrice;
			$("#status-1").html("While Taking A Leak At The Road Side, You Got Mugged!");
			updateCashDisplay();
			showWhoseTurnDelay();
			$("#status-3").html("-$" + venueObject.gotMuggedPrice);

		} else if (player == "computer" && gameState.computerPlayerPosition == 18) {
			gameState.computerCash = gameState.computerCash - venueObject.gotMuggedPrice;
			$("#status-1").html("While Taking A Leak At The Road Side, You Got Mugged!");
			updateCashDisplay();
			showWhoseTurnDelay();
			$("#status-4").html("-$" + venueObject.gotMuggedPrice);

		} else if (player == "human" && gameState.humanPlayerPosition == 19) {
			var prize = getSurprise();
			gameState.humanCash = gameState.humanCash + prize;
			$("#status-1").html("Baby Bonus Rewards<p>$" + prize + "!");
			updateCashDisplay();
			showWhoseTurnDelay();
			$("#status-3").html("+$" + prize);

		} else if (player == "computer" && gameState.computerPlayerPosition == 19) {
			var prize = getSurprise();
			gameState.computerCash = gameState.computerCash + prize;
			$("#status-1").html("Baby Bonus Rewards<p>$" + prize + "!");
			updateCashDisplay();
			showWhoseTurnDelay();
			$("#status-4").html("+$" + prize);

		} else if (player == "human" && gameState.humanPlayerPosition == 20) {
			payRent("human", venueObject.oldHollandRoadOwner, 20);
			checkLoser();
			console.log("Human Cash: " + gameState.humanCash + ",  Old Holland Road: " + venueObject.oldHollandRoadPrice + " , Occupancy: " + venueObject.oldHollandRoadOccupancy)
			if (gameState.humanCash > venueObject.oldHollandRoadPrice && venueObject.oldHollandRoadOccupancy == false) {
				$("#status-1").html("Old Holland Road is available! <p>Do You Want To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
				showWhoseTurnDelay();
			} else {
				gameState.okToBuy = false;
				if (gameState.rentStatus == true) {
					$("#status-1").html("Oops!<p>You Are On Somebody's Turf!");
				}
				else {
					$("#status-1").html("Nice Property eh?");
				}
								updateCashDisplay();
				showWhoseTurnDelay();
			}
		} else if (player == "computer" && gameState.computerPlayerPosition == 20) {
			payRent("computer", venueObject.oldHollandRoadOwner, 20);
			checkLoser();
			console.log("Computer Cash: " + gameState.computerCash + ",  Pan Pacific: " + venueObject.oldHollandRoadPrice + " , Occupancy: " + venueObject.oldHollandRoadOccupancy)
			if (gameState.computerCash > venueObject.oldHollandRoadPrice && venueObject.oldHollandRoadOccupancy == false) {
				$("#status-1").html("Old Holland Road is available! <p>Do You Wish To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
				showWhoseTurnDelay();
			} else {
				gameState.okToBuy = false;
				if (gameState.rentStatus == true) {
					$("#status-1").html("Oops!<p>You Are On Somebody's Turf!");
				}
				else {
					$("#status-1").html("Nice Property eh?");
				}
								updateCashDisplay();
				showWhoseTurnDelay();
			}
		} else if (player == "human" && gameState.humanPlayerPosition == 21) {
			gameState.humanCash = gameState.humanCash - venueObject.NigerianScamPrice;
			$("#status-1").html("Got Scam By An Online Billionaire Who Asked For Your Bank Account.");
			updateCashDisplay();
			showWhoseTurnDelay();
			$("#status-3").html("-$" + venueObject.NigerianScamPrice);

		} else if (player == "computer" && gameState.computerPlayerPosition == 21) {
			gameState.computerCash = gameState.computerCash - venueObject.NigerianScamPrice;
			$("#status-1").html("Got Scam By An Online Billionaire Who Asked For Your Bank Account.");
			updateCashDisplay();
			showWhoseTurnDelay();
			$("#status-4").html("-$" + venueObject.NigerianScamPrice);

		} else if (player == "human" && gameState.humanPlayerPosition == 22) {
			payRent("human", venueObject.belmontRoadOwner, 22);
			checkLoser();
			console.log("Human Cash: " + gameState.humanCash + ",  Belmont Road: " + venueObject.belmontRoadPrice + " , Occupancy: " + venueObject.belmontRoadOccupancy)
			if (gameState.humanCash > venueObject.belmontRoadPrice && venueObject.belmontRoadOccupancy == false) {
				$("#status-1").html("Belmont Road is available! <p>Do You Want To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
				showWhoseTurnDelay();
			} else {
				gameState.okToBuy = false;
				if (gameState.rentStatus == true) {
					$("#status-1").html("Oops!<p>You Are On Somebody's Turf!");
				}
				else {
					$("#status-1").html("Nice Property eh?");
				}
								updateCashDisplay();
				showWhoseTurnDelay();
			}
		} else if (player == "computer" && gameState.computerPlayerPosition == 22) {
			payRent("computer", venueObject.belmontRoadOwner, 22);
			checkLoser();
			console.log("Computer Cash: " + gameState.computerCash + ",  Belmont Road: " + venueObject.belmontRoadPrice + " , Occupancy: " + venueObject.belmontRoadOccupancy)
			if (gameState.computerCash > venueObject.belmontRoadPrice && venueObject.belmontRoadOccupancy == false) {
				$("#status-1").html("Belmont Road is available! <p>Do You Wish To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
				showWhoseTurnDelay();
			} else {
				gameState.okToBuy = false;
				if (gameState.rentStatus == true) {
					$("#status-1").html("Oops!<p>You Are On Somebody's Turf!");
				}
				else {
					$("#status-1").html("Nice Property eh?");
				}
								updateCashDisplay();
				showWhoseTurnDelay();
			}
		} else if (player == "human" && gameState.humanPlayerPosition == 23) {
			payRent("human", venueObject.leedonParkOwner, 23);
			checkLoser();
			console.log("Human Cash: " + gameState.humanCash + ",  Leedon Park: " + venueObject.leedonParkPrice + " , Occupancy: " + venueObject.leedonParkOccupancy)
			if (gameState.humanCash > venueObject.leedonParkPrice && venueObject.leedonParkOccupancy == false) {
				$("#status-1").html("Leedon Park is available! <p>Do You Want To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
				showWhoseTurnDelay();
			} else {
				gameState.okToBuy = false;
				if (gameState.rentStatus == true) {
					$("#status-1").html("Oops!<p>You Are On Somebody's Turf!");
				}
				else {
					$("#status-1").html("Nice Property eh?");
				}
								updateCashDisplay();
				showWhoseTurnDelay();
			}
		} else if (player == "computer" && gameState.computerPlayerPosition == 23) {
			payRent("computer", venueObject.leedonParkOwner, 23);
			checkLoser();
			$console.log("Computer Cash: " + gameState.computerCash + ",  Leedon Park: " + venueObject.leedonParkPrice + " , Occupancy: " + venueObject.leedonParkOccupancy)
			if (gameState.computerCash > venueObject.leedonParkPrice && venueObject.leedonParkOccupancy == false) {
				$("#status-1").html("Leedon Park is available! <p>Do You Wish To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
				showWhoseTurnDelay();
			} else {
				gameState.okToBuy = false;
				if (gameState.rentStatus == true) {
					$("#status-1").html("Oops!<p>You Are On Somebody's Turf!");
				}
				else {
					$("#status-1").html("Nice Property eh?");
				}
								updateCashDisplay();
				showWhoseTurnDelay();
			}
		} else if (player == "human" && gameState.humanPlayerPosition == 24) {
			payRent("human", venueObject.sentosaCoveOwner, 24);
			checkLoser();
			console.log("Human Cash: " + gameState.humanCash + ",  Sentosa Cove: " + venueObject.sentosaCovePrice + " , Occupancy: " + venueObject.sentosaCoveOccupancy)
			if (gameState.humanCash > venueObject.sentosaCovePrice && venueObject.sentosaCoveOccupancy == false) {
				$("#status-1").html("Sentosa Cove is available! <p>Do You Want To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
				showWhoseTurnDelay();
			} else {
				gameState.okToBuy = false;
				if (gameState.rentStatus == true) {
					$("#status-1").html("Oops!<p>You Are On Somebody's Turf!");
				}
				else {
					$("#status-1").html("Nice Property eh?");
				}
								updateCashDisplay();
				showWhoseTurnDelay();
			}
		} else if (player == "computer" && gameState.computerPlayerPosition == 24) {
			payRent("computer", venueObject.sentosaCoveOwner, 24);
			checkLoser();
			console.log("Computer Cash: " + gameState.computerCash + ",  Sentosa Cove: " + venueObject.sentosaCovePrice + " , Occupancy: " + venueObject.sentosaCoveOccupancy)
			if (gameState.computerCash > venueObject.sentosaCovePrice && venueObject.sentosaCoveOccupancy == false) {
				$("#status-1").html("Sentosa Cove is available! <p>Do You Wish To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
				showWhoseTurnDelay();
			} else {
				gameState.okToBuy = false;
				if (gameState.rentStatus == true) {
					$("#status-1").html("Oops!<p>You Are On Somebody's Turf!");
				}
				else {
					$("#status-1").html("Nice Property eh?");
				}
								updateCashDisplay();
				showWhoseTurnDelay();
			}
		}
	}


	function updateCashDisplay() {
		$("#humanCashDisplay").html("Cash: $" + gameState.humanCash);
		$("#computerCashDisplay").html("Cash: $" + gameState.computerCash);
	}

	function getSurprise() {
		var randomNum = Math.floor((Math.random() * 4) + 1);
		var loot = venueObject.bigSurprisePrice[randomNum];
		return loot;
	}

	function buyHotel() {
		var whoIsThis;
		var whereIsHe;
		if (gameState.okToBuy == true) {
			console.log("Ok to buy: True");
			if (gameState.whoseTurn == "human") {
				whoIsThis = "computer";
			} else {
				whoIsThis = "human";
			}
			console.log("Whose Turn: " + whoIsThis);
			if (whoIsThis == "human") {
				whereIsHe = gameState.humanPlayerPosition;
				console.log("Human position is: " + whereIsHe);
			} else {
				whereIsHe = gameState.computerPlayerPosition;
				console.log("Computer position is: " + whereIsHe);
			}
			console.log("Before Updating Ownership. whoIsThis is: " + whoIsThis + " and whereIsHe is: " + whereIsHe)
			updateOwnerShip(whoIsThis, whereIsHe);
		} else {
			alert("You cannot buy!")
		}
		updateCashDisplay();
	}

	function updateOwnerShip(whoIsThis, whereIsHe) {
		console.log("Updating Ownership. whoIsThis is: " + whoIsThis + ". whereisHe is: " + whereIsHe);
		switch (whereIsHe) {
			case 3:
				venueObject.rafflesBoulevardOwner = whoIsThis;
				$('#c3-hotel-1').prepend('<img src="images/' + whoIsThis + '.png" />');
				$('#c3-hotel-2').prepend('<img src="images/' + whoIsThis + '.png" />');
				$('#c3-hotel-3').prepend('<img src="images/' + whoIsThis + '.png" />');
				console.log("Raffles Boulevard now belongs to " + whoIsThis);
				$("#btn-buyHotel").prop("disabled", true);
				venueObject.rafflesBoulevardOccupancy = true;
				setTimeout(setVenueSold, 2000);
				if (whoIsThis == "human") {
					gameState.humanCash = gameState.humanCash - venueObject.rafflesBoulevardPrice;
					$("#status-3").html("Owns<p>Raffles Boulevard!");

				} else {
					gameState.computerCash = gameState.computerCash - venueObject.rafflesBoulevardPrice;
					$("#status-4").html("Owns<p>Raffles Boulevard!");

				}
				break;
			case 5:
				venueObject.botanicGardensOwner = whoIsThis;
				$('#c5-hotel-1').prepend('<img src="images/' + whoIsThis + '.png" />');
				$('#c5-hotel-2').prepend('<img src="images/' + whoIsThis + '.png" />');
				$('#c5-hotel-3').prepend('<img src="images/' + whoIsThis + '.png" />');
				console.log("Botanic Gardens now belongs to " + whoIsThis);
				$("#btn-buyHotel").prop("disabled", true);
				venueObject.botanicGardensOccupancy = true;
				setTimeout(setVenueSold, 2000);
				if (whoIsThis == "human") {
					gameState.humanCash = gameState.humanCash - venueObject.botanicGardensPrice;
					$("#status-3").html("Owns<p>Botanic Gardens!");

				} else {
					gameState.computerCash = gameState.computerCash - venueObject.botanicGardensPrice;
					$("#status-4").html("Owns<p>Botanic Gardens!");

				}
				break;
			case 6:
				venueObject.ritzCarltonOwner = whoIsThis;
				$('#c6-hotel-1').prepend('<img src="images/' + whoIsThis + '.png" />');
				$('#c6-hotel-2').prepend('<img src="images/' + whoIsThis + '.png" />');
				$('#c6-hotel-3').prepend('<img src="images/' + whoIsThis + '.png" />');
				console.log("Ritz Carlton now belongs to " + whoIsThis);
				$("#btn-buyHotel").prop("disabled", true);
				venueObject.ritzCarltonOccupancy = true;
				setTimeout(setVenueSold, 2000);
				if (whoIsThis == "human") {
					gameState.humanCash = gameState.humanCash - venueObject.ritzCarltonPrice;
					$("#status-3").html("Owns<p>Ritz Carlton!");

				} else {
					gameState.computerCash = gameState.computerCash - venueObject.ritzCarltonPrice;
					$("#status-4").html("Owns<p>Ritz Carlton!");

				}
				break;
			case 7:
				venueObject.rafflesHotelOwner = whoIsThis;
				$('#c7-hotel-1').prepend('<img src="images/' + whoIsThis + '.png" />');
				$('#c7-hotel-2').prepend('<img src="images/' + whoIsThis + '.png" />');
				$('#c7-hotel-3').prepend('<img src="images/' + whoIsThis + '.png" />');
				console.log("Raffles Hotel now belongs to " + whoIsThis);
				$("#btn-buyHotel").prop("disabled", true);
				venueObject.rafflesHotelOccupancy = true;
				setTimeout(setVenueSold, 2000);
				if (whoIsThis == "human") {
					gameState.humanCash = gameState.humanCash - venueObject.rafflesHotelPrice;
					$("#status-3").html("Owns<p>Raffles Hotel!");

				} else {
					gameState.computerCash = gameState.computerCash - venueObject.rafflesHotelPrice;
					$("#status-4").html("Owns<p>Raffles Hotel!");

				}
				break;
			case 10:
				venueObject.railMallOwner = whoIsThis;
				$('#c10-hotel-1').prepend('<img src="images/' + whoIsThis + '.png" />');
				$('#c10-hotel-2').prepend('<img src="images/' + whoIsThis + '.png" />');
				$('#c10-hotel-3').prepend('<img src="images/' + whoIsThis + '.png" />');
				console.log("Rail Mall now belongs to " + whoIsThis);
				$("#btn-buyHotel").prop("disabled", true);
				venueObject.railMallOccupancy = true;
				setTimeout(setVenueSold, 2000);
				if (whoIsThis == "human") {
					gameState.humanCash = gameState.humanCash - venueObject.railMallPrice;
					$("#status-3").html("Owns<p>Rail Mall!");

				} else {
					gameState.computerCash = gameState.computerCash - venueObject.railMallPrice;
					$("#status-4").html("Owns<p>Rail Mall!");

				}
				break;
			case 11:
				venueObject.westCoastParkOwner = whoIsThis;
				$('#c11-hotel-1').prepend('<img src="images/' + whoIsThis + '.png" />');
				$('#c11-hotel-2').prepend('<img src="images/' + whoIsThis + '.png" />');
				$('#c11-hotel-3').prepend('<img src="images/' + whoIsThis + '.png" />');
				console.log("West Coast Park now belongs to " + whoIsThis);
				$("#btn-buyHotel").prop("disabled", true);
				venueObject.westCoastParkOccupancy = true;
				setTimeout(setVenueSold, 2000);
				if (whoIsThis == "human") {
					gameState.humanCash = gameState.humanCash - venueObject.westCoastParkPrice;
					$("#status-3").html("Owns<p>West Coast Park!");

				} else {
					gameState.computerCash = gameState.computerCash - venueObject.westCoastParkPrice;
					$("#status-4").html("Owns<p>West Coast Park!");

				}
				break;
			case 14:
				venueObject.dairyFarmOwner = whoIsThis;
				$('#c14-hotel-1').prepend('<img src="images/' + whoIsThis + '.png" />');
				$('#c14-hotel-2').prepend('<img src="images/' + whoIsThis + '.png" />');
				$('#c14-hotel-3').prepend('<img src="images/' + whoIsThis + '.png" />');
				console.log("Dairy Farm now belongs to " + whoIsThis);
				$("#btn-buyHotel").prop("disabled", true);
				venueObject.dairyFarmOccupancy = true;
				setTimeout(setVenueSold, 2000);
				if (whoIsThis == "human") {
					gameState.humanCash = gameState.humanCash - venueObject.dairyFarmPrice;
					$("#status-3").html("Owns<p>Dairy Farm!");

				} else {
					gameState.computerCash = gameState.computerCash - venueObject.dairyFarmPrice;
					$("#status-4").html("Owns<p>Dairy Farm!");

				}
				break;
			case 15:
				venueObject.panPacificOwner = whoIsThis;
				$('#c15-hotel-1').prepend('<img src="images/' + whoIsThis + '.png" />');
				$('#c15-hotel-2').prepend('<img src="images/' + whoIsThis + '.png" />');
				$('#c15-hotel-3').prepend('<img src="images/' + whoIsThis + '.png" />');
				console.log("Pan Pacific now belongs to " + whoIsThis);
				$("#btn-buyHotel").prop("disabled", true);
				venueObject.panPacificOccupancy = true;
				setTimeout(setVenueSold, 2000);
				if (whoIsThis == "human") {
					gameState.humanCash = gameState.humanCash - venueObject.panPacificPrice;
					$("#status-3").html("Owns<p>Pan Pacific!");

				} else {
					gameState.computerCash = gameState.computerCash - venueObject.panPacificPrice;
					$("#status-4").html("Owns<p>Pan Pacific!");

				}
				break;
			case 16:
				venueObject.rafflesCityOwner = whoIsThis;
				$('#c16-hotel-1').prepend('<img src="images/' + whoIsThis + '.png" />');
				$('#c16-hotel-2').prepend('<img src="images/' + whoIsThis + '.png" />');
				$('#c16-hotel-3').prepend('<img src="images/' + whoIsThis + '.png" />');
				console.log("Raffles City now belongs to " + whoIsThis);
				$("#btn-buyHotel").prop("disabled", true);
				venueObject.rafflesCityMallOccupancy = true;
				setTimeout(setVenueSold, 2000);
				if (whoIsThis == "human") {
					gameState.humanCash = gameState.humanCash - venueObject.rafflesCityMallPrice;
					$("#status-3").html("Owns<p>Raffles City Mall!");

				} else {
					gameState.computerCash = gameState.computerCash - venueObject.rafflesCityMallPrice;
					$("#status-4").html("Owns<p>Raffles City Mall!");

				}
				break;
			case 17:
				venueObject.esplanadeParkOwner = whoIsThis;
				$('#c17-hotel-1').prepend('<img src="images/' + whoIsThis + '.png" />');
				$('#c17-hotel-2').prepend('<img src="images/' + whoIsThis + '.png" />');
				$('#c17-hotel-3').prepend('<img src="images/' + whoIsThis + '.png" />');
				console.log("Esplanade Park now belongs to " + whoIsThis);
				$("#btn-buyHotel").prop("disabled", true);
				venueObject.esplanadeParkOccupancy = true;
				setTimeout(setVenueSold, 2000);
				if (whoIsThis == "human") {
					gameState.humanCash = gameState.humanCash - venueObject.esplanadeParkPrice;
					$("#status-3").html("Owns<p>Esplanade Park!");

				} else {
					gameState.computerCash = gameState.computerCash - venueObject.esplanadeParkPrice;
					$("#status-4").html("Owns<p>Esplanade Park!");

				}
				break;
			case 20:
				venueObject.oldHollandRoadOwner = whoIsThis;
				$('#c20-hotel-1').prepend('<img src="images/' + whoIsThis + '.png" />');
				$('#c20-hotel-2').prepend('<img src="images/' + whoIsThis + '.png" />');
				$('#c20-hotel-3').prepend('<img src="images/' + whoIsThis + '.png" />');
				console.log("Old Holland Road now belongs to " + whoIsThis);
				$("#btn-buyHotel").prop("disabled", true);
				venueObject.oldHollandRoadOccupancy = true;
				setTimeout(setVenueSold, 2000);
				if (whoIsThis == "human") {
					gameState.humanCash = gameState.humanCash - venueObject.oldHollandRoadPrice;
					$("#status-3").html("Owns<p>Old Holland Road!");

				} else {
					gameState.computerCash = gameState.computerCash - venueObject.oldHollandRoadPrice;
					$("#status-4").html("Owns<p>Old Holland Road!");

				}
				break;
			case 22:
				venueObject.belmontRoadOwner = whoIsThis;
				$('#c22-hotel-1').prepend('<img src="images/' + whoIsThis + '.png" />');
				$('#c22-hotel-2').prepend('<img src="images/' + whoIsThis + '.png" />');
				$('#c22-hotel-3').prepend('<img src="images/' + whoIsThis + '.png" />');
				console.log("Belmont Road now belongs to " + whoIsThis);
				$("#btn-buyHotel").prop("disabled", true);
				venueObject.belmontRoadOccupancy = true;
				setTimeout(setVenueSold, 2000);
				if (whoIsThis == "human") {
					gameState.humanCash = gameState.humanCash - venueObject.belmontRoadPrice;
					$("#status-3").html("Owns<p>Belmont Road!");

				} else {
					gameState.computerCash = gameState.computerCash - venueObject.belmontRoadPrice;
					$("#status-4").html("Owns<p>Belmont Road!");

				}
				break;
			case 23:
				venueObject.leedonParkOwner = whoIsThis;
				$('#c23-hotel-1').prepend('<img src="images/' + whoIsThis + '.png" />');
				$('#c23-hotel-2').prepend('<img src="images/' + whoIsThis + '.png" />');
				$('#c23-hotel-3').prepend('<img src="images/' + whoIsThis + '.png" />');
				console.log("Leedon Park now belongs to " + whoIsThis);
				$("#btn-buyHotel").prop("disabled", true);
				venueObject.leedonParkOccupancy = true;
				setTimeout(setVenueSold, 2000);
				if (whoIsThis == "human") {
					gameState.humanCash = gameState.humanCash - venueObject.leedonParkPrice;
					$("#status-3").html("Owns<p>Leedon Park!");

				} else {
					gameState.computerCash = gameState.computerCash - venueObject.leedonParkPrice;
					$("#status-4").html("Owns<p>Leedon Park!");

				}
				break;
			case 24:
				venueObject.sentosaCoveOwner = whoIsThis;
				$('#c24-hotel-1').prepend('<img src="images/' + whoIsThis + '.png" />');
				$('#c24-hotel-2').prepend('<img src="images/' + whoIsThis + '.png" />');
				$('#c24-hotel-3').prepend('<img src="images/' + whoIsThis + '.png" />');
				console.log("Sentosa Cove now belongs to " + whoIsThis);
				$("#btn-buyHotel").prop("disabled", true);
				venueObject.sentosaCoveOccupancy = true;
				setTimeout(setVenueSold, 2000);
				if (whoIsThis == "human") {
					gameState.humanCash = gameState.humanCash - venueObject.sentosaCovePrice;
					$("#status-3").html("Owns<p>Sentosa Cove!");

				} else {
					gameState.computerCash = gameState.computerCash - venueObject.sentosaCovePrice;
					$("#status-4").html("Owns<p>Sentosa Cove!");

				}
				break;
			default:
				console.log("Occupancy Error!");
				break;
		}
	}

	function setOccupancyStatus(whereIsHe) {
		switch (whereIsHe) {
			case 3:
				venueObject.rafflesBoulevardOccupancy = true;
				alert("Raffles Boulevard Occupancy is now: " + venueObject.rafflesBoulevardOccupancy)
				break;
			case 5:
				venueObject.botanicGardensOccupancy = true;
				alert("Botanic Gardens Occupancy is now: " + venueObject.rafflesBoulevardOccupancy)
				break;
			case 6:
				venueObject.ritzCarltonOccupancy = true;
				alert("Ritz Carlton Occupancy is now: " + venueObject.rafflesBoulevardOccupancy)
				break;
			case 7:
				venueObject.rafflesHotelOccupancy = true;
				alert("Raffles Hotel Occupancy is now: " + venueObject.rafflesBoulevardOccupancy)
				break;
			case 10:
				venueObject.railMallOccupancy = true;
				alert("Rail Mall Occupancy is now: " + venueObject.rafflesBoulevardOccupancy)
				break;
			case 11:
				venueObject.westCoastParkOccupancy = true;
				alert("West Coast Park Occupancy is now: " + venueObject.rafflesBoulevardOccupancy)
				break;
			case 14:
				venueObject.dairyFarmOccupancy = true;
				alert("Dairy Farm Occupancy is now: " + venueObject.rafflesBoulevardOccupancy)
				break;
			case 15:
				venueObject.panPacificOccupancy = true;
				alert("Pan Pacific Occupancy is now: " + venueObject.rafflesBoulevardOccupancy)
				break;
			case 16:
				venueObject.rafflesCityMallOccupancy = true;
				alert("Raffles City Occupancy is now: " + venueObject.rafflesBoulevardOccupancy)
				break;
			case 17:
				venueObject.esplanadeParkOccupancy = true;
				alert("Esplanade Park Occupancy is now: " + venueObject.rafflesBoulevardOccupancy)
				break;
			case 20:
				venueObject.oldHollandRoadOccupancy = true;
				alert("Old Holland Road Occupancy is now: " + venueObject.rafflesBoulevardOccupancy)
				break;
			case 22:
				venueObject.belmontRoadOccupancy = true;
				alert("Belmont Occupancy is now: " + venueObject.rafflesBoulevardOccupancy)
				break;
			case 23:
				venueObject.leedonParkOccupancy = true;
				alert("Leedon Park Occupancy is now: " + venueObject.rafflesBoulevardOccupancy)
				break;
			case 24:
				venueObject.sentosaCoveOccupancy = true;
				alert("Sentosa Cove Occupancy is now: " + venueObject.rafflesBoulevardOccupancy)
				break;
			default:
				console.log("Occupancy Error");
		}
	}

	function payRent(whoIsThis, locationOwnerStatus, venue) {
		// alert("Pay Rent Initialized");
		if (whoIsThis == "human" && locationOwnerStatus == "computer" && venue == 3) {
			gameState.humanCash = gameState.humanCash - venueObject.rafflesBoulevardPrice;
			gameState.computerCash = gameState.computerCash + venueObject.rafflesBoulevardPrice;
			updateCashDisplay();
			$("#status-3").html("RAPH Bleeds <p>-$" + venueObject.rafflesBoulevardPrice + "<p>Ouch!");
			$("#status-4").html("Receives <p>+$" + venueObject.rafflesBoulevardPrice + "<p>Rental Income!");
			gameState.rentStatus = true;
			// $("#status-1").html("RAPH paid rent $" + venueObject.rafflesBoulevardPrice + " to ELSA");
			// alert("Rental is paid!");
		} else if (whoIsThis == "computer" && locationOwnerStatus == "human" && venue == 3) {
			gameState.humanCash = gameState.humanCash + venueObject.rafflesBoulevardPrice;
			gameState.computerCash = gameState.computerCash - venueObject.rafflesBoulevardPrice;
			updateCashDisplay();
			gameState.rentPaid = c3;
			$("#status-4").html("ELSA Bleeds <p>-$" + venueObject.rafflesBoulevardPrice + "<p>Ouch!");
			$("#status-3").html("Receives <p>+$" + venueObject.rafflesBoulevardPrice + "<p>Rental Income!");
			gameState.rentStatus = true;
			// $("#status-1").html("ELSA paid rent $" + venueObject.rafflesBoulevardPrice + " to RAPH");
			// alert("Rental is paid!");
		} else if (whoIsThis == "human" && locationOwnerStatus == "computer" && venue == 5) {
			gameState.humanCash = gameState.humanCash - venueObject.botanicGardensPrice;
			gameState.computerCash = gameState.computerCash + venueObject.botanicGardensPrice;
			updateCashDisplay();
			$("#status-3").html("RAPH Bleeds <p>-$" + venueObject.botanicGardensPrice + "<p>Ouch!");
			$("#status-4").html("Receives <p>+$" + venueObject.botanicGardensPrice + "<p>Rental Income!");
			gameState.rentStatus = true;
		} else if (whoIsThis == "computer" && locationOwnerStatus == "human" && venue == 5) {
			gameState.humanCash = gameState.humanCash + venueObject.botanicGardensPrice;
			gameState.computerCash = gameState.computerCash - venueObject.botanicGardensPrice;
			updateCashDisplay();
			gameState.rentStatus = true;
			$("#status-4").html("ELSA Bleeds <p>-$" + venueObject.botanicGardensPrice + "<p>Ouch!");
			$("#status-3").html("Receives <p>+$" + venueObject.botanicGardensPrice + "<p>Rental Income!");			// alert("Rental is paid!");



		} else if (whoIsThis == "human" && locationOwnerStatus == "computer" && venue == 6) {
			gameState.humanCash = gameState.humanCash - venueObject.ritzCarltonPrice;
			gameState.computerCash = gameState.computerCash + venueObject.ritzCarltonPrice;
			updateCashDisplay();
			gameState.rentStatus = true;

			$("#status-3").html("RAPH Bleeds <p>-$" + venueObject.ritzCarltonPrice + "<p>Ouch!");
			$("#status-4").html("Receives <p>+$" + venueObject.ritzCarltonPrice + "<p>Rental Income!");			// alert("Rental is paid!");
		} else if (whoIsThis == "computer" && locationOwnerStatus == "human" && venue == 6) {
			gameState.humanCash = gameState.humanCash + venueObject.ritzCarltonPrice;
			gameState.computerCash = gameState.computerCash - venueObject.ritzCarltonPrice;
			updateCashDisplay();
			gameState.rentStatus = true;

			$("#status-4").html("ELSA Bleeds <p>-$" + venueObject.ritzCarltonPrice + "<p>Ouch!");
			$("#status-3").html("Receives <p>+$" + venueObject.ritzCarltonPrice + "<p>Rental Income!");			// alert("Rental is paid!");



		} else if (whoIsThis == "human" && locationOwnerStatus == "computer" && venue == 7) {
			gameState.humanCash = gameState.humanCash - venueObject.rafflesHotelPrice;
			gameState.computerCash = gameState.computerCash + venueObject.rafflesHotelPrice;
			updateCashDisplay();
			gameState.rentStatus = true;

			$("#status-3").html("RAPH Bleeds <p>-$" + venueObject.rafflesHotelPrice + "<p>Ouch!");
			$("#status-4").html("Receives <p>+$" + venueObject.rafflesHotelPrice + "<p>Rental Income!");			// alert("Rental is paid!");
		} else if (whoIsThis == "computer" && locationOwnerStatus == "human" && venue == 7) {
			gameState.humanCash = gameState.humanCash + venueObject.rafflesHotelPrice;
			gameState.computerCash = gameState.computerCash - venueObject.rafflesHotelPrice;
			updateCashDisplay();
			gameState.rentStatus = true;

			$("#status-4").html("ELSA Bleeds <p>-$" + venueObject.rafflesHotelPrice + "<p>Ouch!");
			$("#status-3").html("Receives <p>+$" + venueObject.rafflesHotelPrice + "<p>Rental Income!");				// alert("Rental is paid!");



		} else if (whoIsThis == "human" && locationOwnerStatus == "computer" && venue == 10) {
			gameState.humanCash = gameState.humanCash - venueObject.railMallPrice;
			gameState.computerCash = gameState.computerCash + venueObject.railMallPrice;
			updateCashDisplay();
			gameState.rentStatus = true;

			$("#status-3").html("RAPH Bleeds <p>-$" + venueObject.railMallPrice + "<p>Ouch!");
			$("#status-4").html("Receives <p>+$" + venueObject.railMallPrice + "<p>Rental Income!");			// alert("Rental is paid!");
		} else if (whoIsThis == "computer" && locationOwnerStatus == "human" && venue == 10) {
			gameState.humanCash = gameState.humanCash + venueObject.railMallPrice;
			gameState.computerCash = gameState.computerCash - venueObject.railMallPrice;
			updateCashDisplay();
			gameState.rentStatus = true;

			$("#status-4").html("ELSA Bleeds <p>-$" + venueObject.railMallPrice + "<p>Ouch!");
			$("#status-3").html("Receives <p>+$" + venueObject.railMallPrice + "<p>Rental Income!");				// alert("Rental is paid!");



		} else if (whoIsThis == "human" && locationOwnerStatus == "computer" && venue == 11) {
			gameState.humanCash = gameState.humanCash - venueObject.westCoastParkPrice;
			gameState.computerCash = gameState.computerCash + venueObject.westCoastParkPrice;
			updateCashDisplay();
			gameState.rentStatus = true;

			$("#status-3").html("RAPH Bleeds <p>-$" + venueObject.westCoastParkPrice + "<p>Ouch!");
			$("#status-4").html("Receives <p>+$" + venueObject.westCoastParkPrice + "<p>Rental Income!");			// alert("Rental is paid!");
		} else if (whoIsThis == "computer" && locationOwnerStatus == "human" && venue == 11) {
			gameState.humanCash = gameState.humanCash + venueObject.westCoastParkPrice;
			gameState.computerCash = gameState.computerCash - venueObject.westCoastParkPrice;
			updateCashDisplay();
			gameState.rentStatus = true;

			$("#status-4").html("ELSA Bleeds <p>-$" + venueObject.westCoastParkPrice + "<p>Ouch!");
			$("#status-3").html("Receives <p>+$" + venueObject.westCoastParkPrice + "<p>Rental Income!");			// alert("Rental is paid!");



		} else if (whoIsThis == "human" && locationOwnerStatus == "computer" && venue == 14) {
			gameState.humanCash = gameState.humanCash - venueObject.dairyFarmPrice;
			gameState.computerCash = gameState.computerCash + venueObject.dairyFarmPrice;
			updateCashDisplay();
			gameState.rentStatus = true;

			$("#status-3").html("RAPH Bleeds <p>-$" + venueObject.dairyFarmPrice + "<p>Ouch!");
			$("#status-4").html("Receives <p>+$" + venueObject.dairyFarmPrice + "<p>Rental Income!");				// alert("Rental is paid!");
		} else if (whoIsThis == "computer" && locationOwnerStatus == "human" && venue == 14) {
			gameState.humanCash = gameState.humanCash + venueObject.dairyFarmPrice;
			gameState.computerCash = gameState.computerCash - venueObject.dairyFarmPrice;
			updateCashDisplay();
			gameState.rentStatus = true;

			$("#status-4").html("ELSA Bleeds <p>-$" + venueObject.dairyFarmPrice + "<p>Ouch!");
			$("#status-3").html("Receives <p>+$" + venueObject.dairyFarmPrice + "<p>Rental Income!");			// alert("Rental is paid!");



		} else if (whoIsThis == "human" && locationOwnerStatus == "computer" && venue == 15) {
			gameState.humanCash = gameState.humanCash - venueObject.panPacificPrice;
			gameState.computerCash = gameState.computerCash + venueObject.panPacificPrice;
			updateCashDisplay();
			gameState.rentStatus = true;

			$("#status-3").html("RAPH Bleeds <p>-$" + venueObject.panPacificPrice + "<p>Ouch!");
			$("#status-4").html("Receives <p>+$" + venueObject.panPacificPrice + "<p>Rental Income!");				// alert("Rental is paid!");
		} else if (whoIsThis == "computer" && locationOwnerStatus == "human" && venue == 15) {
			gameState.humanCash = gameState.humanCash + venueObject.panPacificPrice;
			gameState.computerCash = gameState.computerCash - venueObject.panPacificPrice;
			updateCashDisplay();
			gameState.rentStatus = true;

			$("#status-4").html("ELSA Bleeds <p>-$" + venueObject.panPacificPrice + "<p>Ouch!");
			$("#status-3").html("Receives <p>+$" + venueObject.panPacificPrice + "<p>Rental Income!");				// alert("Rental is paid!");



		} else if (whoIsThis == "human" && locationOwnerStatus == "computer" && venue == 16) {
			gameState.humanCash = gameState.humanCash - venueObject.rafflesCityMallPrice;
			gameState.computerCash = gameState.computerCash + venueObject.rafflesCityMallPrice;
			updateCashDisplay();
			gameState.rentStatus = true;

			$("#status-3").html("RAPH Bleeds <p>-$" + venueObject.rafflesCityMallPrice + "<p>Ouch!");
			$("#status-4").html("Receives <p>+$" + venueObject.rafflesCityMallPrice + "<p>Rental Income!");				// alert("Rental is paid!");
		} else if (whoIsThis == "computer" && locationOwnerStatus == "human" && venue == 16) {
			gameState.humanCash = gameState.humanCash + venueObject.rafflesCityMallPrice;
			gameState.computerCash = gameState.computerCash - venueObject.rafflesCityMallPrice;
			updateCashDisplay();
			gameState.rentStatus = true;

			$("#status-4").html("ELSA Bleeds <p>-$" + venueObject.rafflesCityMallPrice + "<p>Ouch!");
			$("#status-3").html("Receives <p>+$" + venueObject.rafflesCityMallPrice + "<p>Rental Income!");			// alert("Rental is paid!");



		} else if (whoIsThis == "human" && locationOwnerStatus == "computer" && venue == 17) {
			gameState.humanCash = gameState.humanCash - venueObject.esplanadeParkPrice;
			gameState.computerCash = gameState.computerCash + venueObject.esplanadeParkPrice;
			updateCashDisplay();
			gameState.rentStatus = true;

			$("#status-3").html("RAPH Bleeds <p>-$" + venueObject.esplanadeParkPrice + "<p>Ouch!");
			$("#status-4").html("Receives <p>+$" + venueObject.esplanadeParkPrice + "<p>Rental Income!");				// alert("Rental is paid!");
		} else if (whoIsThis == "computer" && locationOwnerStatus == "human" && venue == 17) {
			gameState.humanCash = gameState.humanCash + venueObject.esplanadeParkPrice;
			gameState.computerCash = gameState.computerCash - venueObject.esplanadeParkPrice;
			updateCashDisplay();
			gameState.rentStatus = true;

			$("#status-4").html("ELSA Bleeds <p>-$" + venueObject.esplanadeParkPrice + "<p>Ouch!");
			$("#status-3").html("Receives <p>+$" + venueObject.esplanadeParkPrice + "<p>Rental Income!");				// alert("Rental is paid!");



		} else if (whoIsThis == "human" && locationOwnerStatus == "computer" && venue == 20) {
			gameState.humanCash = gameState.humanCash - venueObject.oldHollandRoadPrice;
			gameState.computerCash = gameState.computerCash + venueObject.oldHollandRoadPrice;
			updateCashDisplay();
			gameState.rentStatus = true;

			$("#status-3").html("RAPH Bleeds <p>-$" + venueObject.oldHollandRoadPrice + "<p>Ouch!");
			$("#status-4").html("Receives <p>+$" + venueObject.oldHollandRoadPrice + "<p>Rental Income!");				// alert("Rental is paid!");
		} else if (whoIsThis == "computer" && locationOwnerStatus == "human" && venue == 20) {
			gameState.humanCash = gameState.humanCash + venueObject.oldHollandRoadPrice;
			gameState.computerCash = gameState.computerCash - venueObject.oldHollandRoadPrice;
			updateCashDisplay();
			gameState.rentStatus = true;

			$("#status-4").html("ELSA Bleeds <p>-$" + venueObject.oldHollandRoadPrice + "<p>Ouch!");
			$("#status-3").html("Receives <p>+$" + venueObject.oldHollandRoadPrice + "<p>Rental Income!");				// alert("Rental is paid!");



		} else if (whoIsThis == "human" && locationOwnerStatus == "computer" && venue == 22) {
			gameState.humanCash = gameState.humanCash - venueObject.belmontRoadPrice;
			gameState.computerCash = gameState.computerCash + venueObject.belmontRoadPrice;
			updateCashDisplay();
			gameState.rentStatus = true;

			$("#status-3").html("RAPH Bleeds <p>-$" + venueObject.belmontRoadPrice + "<p>Ouch!");
			$("#status-4").html("Receives <p>+$" + venueObject.belmontRoadPrice + "<p>Rental Income!");			// alert("Rental is paid!");
		} else if (whoIsThis == "computer" && locationOwnerStatus == "human" && venue == 22) {
			gameState.humanCash = gameState.humanCash + venueObject.belmontRoadPrice;
			gameState.computerCash = gameState.computerCash - venueObject.belmontRoadPrice;
			updateCashDisplay();
			gameState.rentStatus = true;

			$("#status-4").html("ELSA Bleeds <p>-$" + venueObject.belmontRoadPrice + "<p>Ouch!");
			$("#status-3").html("Receives <p>+$" + venueObject.belmontRoadPrice + "<p>Rental Income!");				// alert("Rental is paid!");



		} else if (whoIsThis == "human" && locationOwnerStatus == "computer" && venue == 23) {
			gameState.humanCash = gameState.humanCash - venueObject.leedonParkPrice;
			gameState.computerCash = gameState.computerCash + venueObject.leedonParkPrice;
			updateCashDisplay();
			gameState.rentStatus = true;

			$("#status-3").html("RAPH Bleeds <p>-$" + venueObject.leedonParkPrice + "<p>Ouch!");
			$("#status-4").html("Receives <p>+$" + venueObject.leedonParkPrice + "<p>Rental Income!");				// alert("Rental is paid!");
		} else if (whoIsThis == "computer" && locationOwnerStatus == "human" && venue == 23) {
			gameState.humanCash = gameState.humanCash + venueObject.leedonParkPrice;
			gameState.computerCash = gameState.computerCash - venueObject.leedonParkPrice;
			updateCashDisplay();
			gameState.rentStatus = true;

			$("#status-4").html("ELSA Bleeds <p>-$" + venueObject.leedonParkPrice + "<p>Ouch!");
			$("#status-3").html("Receives <p>+$" + venueObject.leedonParkPrice + "<p>Rental Income!");				// alert("Rental is paid!");



		} else if (whoIsThis == "human" && locationOwnerStatus == "computer" && venue == 24) {
			gameState.humanCash = gameState.humanCash - venueObject.sentosaCovePrice;
			gameState.computerCash = gameState.computerCash + venueObject.sentosaCovePrice;
			updateCashDisplay();
			gameState.rentStatus = true;

			$("#status-3").html("RAPH Bleeds <p>-$" + venueObject.sentosaCovePrice + "<p>Ouch!");
			$("#status-4").html("Receives <p>+$" + venueObject.sentosaCovePrice + "<p>Rental Income!");			// alert("Rental is paid!");
		} else if (whoIsThis == "computer" && locationOwnerStatus == "human" && venue == 24) {
			gameState.humanCash = gameState.humanCash + venueObject.sentosaCovePrice;
			gameState.computerCash = gameState.computerCash - venueObject.sentosaCovePrice;
			updateCashDisplay();
			gameState.rentStatus = true;

			$("#status-4").html("ELSA Bleeds <p>-$" + venueObject.sentosaCovePrice + "<p>Ouch!");
			$("#status-3").html("Receives <p>+$" + venueObject.sentosaCovePrice + "<p>Rental Income!");				// alert("Rental is paid!");
		}
	}

	function setVenueSold() {
		$("#status-1").html("Property Is Sold!");
		setTimeout(showWhoseTurn, 2000);
		setTimeout(showGameOn, 1500);
	}

	function showGameOn() {
		var gameOnMsg = Math.floor(Math.random() * 3) + 1;
		if (gameOnMsg == 1) {
			$("#status-1").html("Keep Calm & Roll The Dice!");
		}
		else if (gameOnMsg == 2) {
			$("#status-1").html("Eat, Pray, Roll Dice!");
		}
		else if (gameOnMsg == 3) {
			$("#status-1").html("Roll It Like It's Hot!");
		}
	}

	function checkLoser() {
		if (gameState.humanCash < 0) {
			alert("ELSA WON THE GAME!");
			$("#status-1").html("ELSA Has Won The Game!");
		}
		else if (gameState.computerCash < 0) {
			alert("RAPH WON THE GAME!")
			$("#status-1").html("RAPH Has Won The Game!");
		}
	}

	function sellHotel() {
		alert("SPECIAL OFFER: Upgrade to PREMIUM to unlock SPECIAL POWER!");
	}
}); // close function
