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
		okToBuy: null
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
		} else if (this.id == "reload") {
			location.reload();
		} else if (this.id == "btn-buyHotel") {
			buyHotel();
		} else if (this.id == "btn-sellHotel") {
			sellHotel();
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
			$("#status-3").text("WhoseTurn now: " + gameState.whoseTurn)
		} else {
			$("#status-3").text("WhoseTurn now: " + gameState.whoseTurn)
			rollDice();
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
		rollResult = Math.floor(Math.random() * 8) + 1;
		$("#dice" + rollResult).removeClass("diceSelector"); // remove dice region colour
		diceTimerID = window.setInterval(startDiceAnimation, 10);
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
			$("#status-3").text(gameState.humanPlayerPosition);
			if (moveAnimationCounter == 1) { // set Roll to 1 for testing
				window.clearInterval(characterMovementID);
				gameState.whoseTurn = "computer";
				$("#status-3").text("WhoseTurn now: " + gameState.whoseTurn)
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
			$("#status-3").text(gameState.computerPlayerPosition);
			if (moveAnimationCounter == 1) { // set Roll to 1 for testing
				window.clearInterval(characterMovementID);
				gameState.whoseTurn = "human";
				$("#status-3").text("WhoseTurn now: " + gameState.whoseTurn)
				moveAnimationCounter = 0;
				console.log("Computer position is at: " + gameState.computerPlayerPosition);
				landsOnGrid("computer");
			}
		}
	}

	function getStartMoney(player) {
			console.log("Get Money Request");
			if (player == "human" && gameState.humanPlayerPosition == 1) {
				gameState.humanCash = gameState.humanCash + 4000;
				console.log("Human Get Money");
			} else if (player == "computer" & gameState.computerPlayerPosition == 1) {
				gameState.computerCash = gameState.computerCash + 4000;
				console.log("Computer Get Money");
			}
			updateCashDisplay();
		} // ends getStartMoney

	function landsOnGrid(player) {
		console.log(venueObject);
		console.log(gameState);
		if (player == "human" && gameState.humanPlayerPosition == 1) {
			$("#status-4").text("Receive some moolah!");
		} else if (player == "computer" && gameState.computerPlayerPosition == 1) {
			$("#status-4").text("Receive some moolah 2!");
		} else if (player == "human" && gameState.humanPlayerPosition == 2) {
			var prize = getSurprise();
			gameState.humanCash = gameState.humanCash + prize;
			$("#status-4").html("Congrats! <p> You won $" + prize + "!");
			updateCashDisplay();
		} else if (player == "computer" && gameState.computerPlayerPosition == 2) {
			var prize = getSurprise();
			gameState.computerCash = gameState.computerCash + prize;
			$("#status-4").html("Congrats! <p> You won $" + prize + "!");
			updateCashDisplay();
		} else if (player == "human" && gameState.humanPlayerPosition == 3) {
			payRent("human", venueObject.rafflesBoulevardOwner, 3);
			$("#p1Assets").text("Human Cash: " + gameState.humanCash + ",  Raffles Boulevard: " + venueObject.rafflesBoulevardPrice + " , Occupancy: " + venueObject.rafflesBoulevardOccupancy)
			if (gameState.humanCash > venueObject.rafflesBoulevardPrice && venueObject.rafflesBoulevardOccupancy == false) {
				$("#status-4").html("Raffles Boulevard is available! <p>Do You Want To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
			} else {
				gameState.okToBuy = false;
				$("#status-4").html("Sorry! <p>You can't buy that awesome real estate!");
				updateCashDisplay();
			}
		} else if (player == "computer" && gameState.computerPlayerPosition == 3) {
			payRent("computer", venueObject.rafflesBoulevardOwner, 3);
			$("#p1Assets").text("Computer Cash: " + gameState.computerCash + ",  Dairy Farm: " + venueObject.rafflesBoulevardPrice + " , Occupancy: " + venueObject.rafflesBoulevardOccupancy)
			if (gameState.computerCash > venueObject.rafflesBoulevardPrice && venueObject.rafflesBoulevardOccupancy == false) {
				$("#status-4").text("Raffles Boulevard is available! <p>Do You Wish To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
			} else {
				gameState.okToBuy = false;
				$("#status-4").html("Sorry! <p>You can't buy that awesome real estate!");
				updateCashDisplay();
			}
		} else if (player == "human" && gameState.humanPlayerPosition == 4) {
			gameState.humanCash = gameState.humanCash - venueObject.caughtSmoking;
			$("#status-4").text("Fined for Smoking!");
			updateCashDisplay();
		} else if (player == "computer" && gameState.computerPlayerPosition == 4) {
			gameState.computerCash = gameState.computerCash - venueObject.caughtSmoking;
			$("#status-4").text("Fined for Smoking!");
			updateCashDisplay();
		} else if (player == "human" && gameState.humanPlayerPosition == 5) {
			payRent("human", venueObject.botanicGardensOwner, 5);
			$("#p1Assets").text("Human Cash: " + gameState.humanCash + ", Botanic Gardens Price: " + venueObject.botanicGardensPrice + " , Occupancy: " + venueObject.botanicGardensOccupancy)
			if (gameState.humanCash > venueObject.botanicGardensPrice && venueObject.botanicGardensOccupancy == false) {
				$("#status-4").html('"Botanic Gardens For Sale! <p>Do You Want To Buy?"');
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
			} else {
				gameState.okToBuy = false;
				$("#status-4").html("Sorry, you can't buy that awesome real estate!");
				updateCashDisplay();
			}
		} else if (player == "computer" && gameState.computerPlayerPosition == 5) {
			payRent("computer", venueObject.botanicGardensOwner, 5);
			$("#p1Assets").text("Computer Cash: " + gameState.computerCash + ", Botanic Garden Price: " + venueObject.botanicGardensPrice + " , Occupancy: " + venueObject.botanicGardensOccupancy)
			if (gameState.computerCash > venueObject.botanicGardensPrice && venueObject.botanicGardensOccupancy == false) {
				$("#status-4").html("Botanic For Sale! <p>Do You Wish To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
			} else {
				gameState.okToBuy = false;
				$("#status-4").html("Sorry! <p>You can't buy that awesome real estate!");
				updateCashDisplay();
			}
		} else if (player == "human" && gameState.humanPlayerPosition == 6) {
			payRent("human", venueObject.ritzCarltonOwner, 6);
			$("#p1Assets").text("Human Cash: " + gameState.humanCash + ", Ritz Carlton Price: " + venueObject.ritzCarltonPrice + " , Occupancy: " + venueObject.ritzCarltonOccupancy)
			if (gameState.humanCash > venueObject.ritzCarltonPrice && venueObject.ritzCarltonOccupancy == false) {
				$("#status-4").html("Ritz Carlton is available! <p>Do You Want To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
			} else {
				gameState.okToBuy = false;
				$("#status-4").html("Sorry! <p>you can't buy that awesome real estate!");
				updateCashDisplay();
			}
		} else if (player == "computer" && gameState.computerPlayerPosition == 6) {
			payRent("computer", venueObject.ritzCarltonOwner, 6);
			$("#p1Assets").text("Computer Cash: " + gameState.computerCash + ", Ritz Carlton Price: " + venueObject.ritzCarltonPrice + " , Occupancy: " + venueObject.ritzCarltonOccupancy)
			if (gameState.computerCash > venueObject.ritzCarltonPrice && venueObject.ritzCarltonOccupancy == false) {
				$("#status-4").text("Ritz Carlton is available! <p>Do You Wish To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
			} else {
				gameState.okToBuy = false;
				$("#status-4").html("Sorry! <p>You can't buy that awesome real estate!");
				updateCashDisplay();
			}
		} else if (player == "human" && gameState.humanPlayerPosition == 7) {
			payRent("human", venueObject.rafflesHotelOwner, 7);
			$("#p1Assets").text("Human Cash: " + gameState.humanCash + ", Raffles Hotel Price: " + venueObject.rafflesHotelPrice + " , Occupancy: " + venueObject.rafflesHotelOccupancy)
			if (gameState.humanCash > venueObject.rafflesHotelPrice && venueObject.rafflesHotelOccupancy == false) {
				$("#status-4").html("Raffles Hotel is available! <p>Do You Want To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
			} else {
				gameState.okToBuy = false;
				$("#status-4").html("Sorry! <p>you can't buy that awesome real estate!");
				updateCashDisplay();
			}
		} else if (player == "computer" && gameState.computerPlayerPosition == 7) {
			payRent("computer", venueObject.rafflesHotelOwner, 7);
			$("#p1Assets").text("Computer Cash: " + gameState.computerCash + ", Raffles Hotel Price: " + venueObject.rafflesHotelPrice + " , Occupancy: " + venueObject.rafflesHotelOccupancy)
			if (gameState.computerCash > venueObject.rafflesBoulevardPrice && venueObject.rafflesHotelOccupancy == false) {
				$("#status-4").text("Raffles Hotel is available! <p>Do You Wish To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
			} else {
				gameState.okToBuy = false;
				$("#status-4").html("Sorry! <p>You can't buy that awesome real estate!");
				updateCashDisplay();
			}
		} else if (player == "human" && gameState.humanPlayerPosition == 8) {
			gameState.humanCash = gameState.humanCash - venueObject.caughtSpeedingPrice;
			$("#status-4").text("Arrested for Speeding!");
			updateCashDisplay();
		} else if (player == "computer" && gameState.computerPlayerPosition == 8) {
			gameState.computerCash = gameState.computerCash - venueObject.caughtSpeedingPrice;
			$("#status-4").text("Arrested for Speeding!");
			updateCashDisplay();
		} else if (player == "human" && gameState.humanPlayerPosition == 9) {
			var prize = getSurprise();
			gameState.humanCash = gameState.humanCash + prize;
			$("#status-4").html("Congrats! <p> You won $" + prize + "!");
			updateCashDisplay();
		} else if (player == "computer" && gameState.computerPlayerPosition == 9) {
			var prize = getSurprise();
			gameState.computerCash = gameState.computerCash + prize;
			$("#status-4").html("Congrats! <p> You won $" + prize + "!");
			updateCashDisplay();
		} else if (player == "human" && gameState.humanPlayerPosition == 10) {
			payRent("human", venueObject.railMallOwner, 10);
			$("#p1Assets").text("Human Cash: " + gameState.humanCash + ", Rail Mall Price: " + venueObject.railMallPrice + " , Occupancy: " + venueObject.railMallOccupancy)
			if (gameState.humanCash > venueObject.railMallPrice && venueObject.railMallOccupancy == false) {
				$("#status-4").html("Rail Mall is available! <p>Do You Want To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
			} else {
				gameState.okToBuy = false;
				$("#status-4").html("Sorry! <p>you can't buy that awesome real estate!");
				updateCashDisplay();
			}
		} else if (player == "computer" && gameState.computerPlayerPosition == 10) {
			payRent("computer", venueObject.railMallOwner, 10);
			$("#p1Assets").text("Computer Cash: " + gameState.computerCash + ", Rail Mall Price: " + venueObject.railMallPrice + " , Occupancy: " + venueObject.railMallOccupancy)
			if (gameState.computerCash > venueObject.railMallPrice && venueObject.railMallOccupancy == false) {
				$("#status-4").text("Rail Mall is available! <p>Do You Wish To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
			} else {
				gameState.okToBuy = false;
				$("#status-4").html("Sorry! <p>You can't buy that awesome real estate!");
				updateCashDisplay();
			}
		} else if (player == "human" && gameState.humanPlayerPosition == 11) {
			payRent("human", venueObject.westCoastParkOwner, 11);
			$("#p1Assets").text("Human Cash: " + gameState.humanCash + ",  West Coast Park Price: " + venueObject.westCoastParkPrice + " , Occupancy: " + venueObject.westCoastParkOccupancy)
			if (gameState.humanCash > venueObject.westCoastParkPrice && venueObject.westCoastParkOccupancy == false) {
				$("#status-4").html("West Coast Park is available! <p>Do You Want To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
			} else {
				gameState.okToBuy = false;
				$("#status-4").html("Sorry! <p>You can't buy that awesome real estate!");
				updateCashDisplay();
			}
		} else if (player == "computer" && gameState.computerPlayerPosition == 11) {
			payRent("computer", venueObject.westCoastParkOwner, 11);
			$("#p1Assets").text("Computer Cash: " + gameState.computerCash + ",  West Coast Park Price: " + venueObject.westCoastParkPrice + " , Occupancy: " + venueObject.westCoastParkOccupancy)
			if (gameState.computerCash > venueObject.westCoastParkPrice && venueObject.westCoastParkOccupancy == false) {
				$("#status-4").text("West Coast Park is available! <p>Do You Wish To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
			} else {
				gameState.okToBuy = false;
				$("#status-4").html("Sorry! <p>You can't buy that awesome real estate!");
				updateCashDisplay();
			}
		} else if (player == "human" && gameState.humanPlayerPosition == 12) {
			gameState.humanCash = gameState.humanCash - venueObject.lostInCasinoPrice;
			$("#status-4").text("Lost Money in Casino!");
			updateCashDisplay();
		} else if (player == "computer" && gameState.computerPlayerPosition == 12) {
			gameState.computerCash = gameState.computerCash - venueObject.lostInCasinoPrice;
			$("#status-4").text("Lost Money In Casino!");
			updateCashDisplay();
		} else if (player == "human" && gameState.humanPlayerPosition == 13) {
			var prize = getSurprise();
			gameState.humanCash = gameState.humanCash + prize;
			$("#status-4").html("Congrats! <p> You won $" + prize + "!");
			updateCashDisplay();
		} else if (player == "computer" && gameState.computerPlayerPosition == 13) {
			var prize = getSurprise();
			gameState.computerCash = gameState.computerCash + prize;
			$("#status-4").html("Congrats! <p> You won $" + prize + "!");
			updateCashDisplay();
		} else if (player == "human" && gameState.humanPlayerPosition == 14) {
			payRent("human", venueObject.dairyFarmOwner, 14);
			$("#p1Assets").text("Human Cash: " + gameState.humanCash + ",  Dairy Farm: " + venueObject.dairyFarmPrice + " , Occupancy: " + venueObject.dairyFarmOccupancy)
			if (gameState.humanCash > venueObject.dairyFarmPrice && venueObject.dairyFarmOccupancy == false) {
				$("#status-4").html("Dairy Farm is available! <p>Do You Want To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
			} else {
				gameState.okToBuy = false;
				$("#status-4").html("Sorry! <p>You can't buy that awesome real estate!");
				updateCashDisplay();
			}
		} else if (player == "computer" && gameState.computerPlayerPosition == 14) {
			payRent("computer", venueObject.dairyFarmOwner, 14);
			$("#p1Assets").text("Computer Cash: " + gameState.computerCash + ",  Dairy Farm: " + venueObject.dairyFarmPrice + " , Occupancy: " + venueObject.dairyFarmOccupancy)
			if (gameState.computerCash > venueObject.dairyFarmPrice && venueObject.dairyFarmOccupancy == false) {
				$("#status-4").text("Dairy Farm is available! <p>Do You Wish To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
			} else {
				gameState.okToBuy = false;
				$("#status-4").html("Sorry! <p>You can't buy that awesome real estate!");
				updateCashDisplay();
			}
		} else if (player == "human" && gameState.humanPlayerPosition == 15) {
			payRent("human", venueObject.panPacificOwner, 15);
			$("#p1Assets").text("Human Cash: " + gameState.humanCash + ",  Pan Pacific: " + venueObject.panPacificPrice + " , Occupancy: " + venueObject.panPacificOccupancy)
			if (gameState.humanCash > venueObject.panPacificPrice && venueObject.panPacificOccupancy == false) {
				$("#status-4").html("Pan Pacific is available! <p>Do You Want To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
			} else {
				gameState.okToBuy = false;
				$("#status-4").html("Sorry! <p>You can't buy that awesome real estate!");
				updateCashDisplay();
			}
		} else if (player == "computer" && gameState.computerPlayerPosition == 15) {
			payRent("computer", venueObject.panPacificOwner, 15);
			$("#p1Assets").text("Computer Cash: " + gameState.computerCash + ",  Pan Pacific: " + venueObject.panPacificPrice + " , Occupancy: " + venueObject.panPacificOccupancy)
			if (gameState.computerCash > venueObject.panPacificPrice && venueObject.panPacificOccupancy == false) {
				$("#status-4").text("Pan Pacific is available! <p>Do You Wish To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
			} else {
				gameState.okToBuy = false;
				$("#status-4").html("Sorry! <p>You can't buy that awesome real estate!");
				updateCashDisplay();
			}
		} else if (player == "human" && gameState.humanPlayerPosition == 16) {
			payRent("human", venueObject.rafflesCityOwner, 16);
			$("#p1Assets").text("Human Cash: " + gameState.humanCash + ",  Raffles City Mall: " + venueObject.rafflesCityMallPrice + " , Occupancy: " + venueObject.rafflesCityMallOccupancy)
			if (gameState.humanCash > venueObject.rafflesCityMallPrice && venueObject.rafflesCityMallOccupancy == false) {
				$("#status-4").html("Raffles City Mall is available! <p>Do You Want To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
			} else {
				gameState.okToBuy = false;
				$("#status-4").html("Sorry! <p>You can't buy that awesome real estate!");
				updateCashDisplay();
			}
		} else if (player == "computer" && gameState.computerPlayerPosition == 16) {
			payRent("computer", venueObject.rafflesCityOwner, 16);
			$("#p1Assets").text("Computer Cash: " + gameState.computerCash + ",  Pan Pacific: " + venueObject.rafflesCityMallPrice + " , Occupancy: " + venueObject.rafflesCityMallOccupancy)
			if (gameState.computerCash > venueObject.rafflesCityMallPrice && venueObject.rafflesCityMallOccupancy == false) {
				$("#status-4").text("Raffles City Mall is available! <p>Do You Wish To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
			} else {
				gameState.okToBuy = false;
				$("#status-4").html("Sorry! <p>You can't buy that awesome real estate!");
				updateCashDisplay();
			}
		} else if (player == "human" && gameState.humanPlayerPosition == 17) {
			payRent("human", venueObject.esplanadeParkOwner, 17);
			$("#p1Assets").text("Human Cash: " + gameState.humanCash + ",  Raffles City Mall: " + venueObject.esplanadeParkPrice + " , Occupancy: " + venueObject.esplanadeParkOccupancy)
			if (gameState.humanCash > venueObject.esplanadeParkPrice && venueObject.esplanadeParkOccupancy == false) {
				$("#status-4").html("Esplanade Park is available! <p>Do You Want To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
			} else {
				gameState.okToBuy = false;
				$("#status-4").html("Sorry! <p>You can't buy that awesome real estate!");
				updateCashDisplay();
			}
		} else if (player == "computer" && gameState.computerPlayerPosition == 17) {
			payRent("computer", venueObject.esplanadeParkOwner, 17);
			$("#p1Assets").text("Computer Cash: " + gameState.computerCash + ",  Pan Pacific: " + venueObject.esplanadeParkPrice + " , Occupancy: " + venueObject.esplanadeParkOccupancy)
			if (gameState.computerCash > venueObject.esplanadeParkPrice && venueObject.esplanadeParkOccupancy == false) {
				$("#status-4").text("Esplanade Park is available! <p>Do You Wish To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
			} else {
				gameState.okToBuy = false;
				$("#status-4").html("Sorry! <p>You can't buy that awesome real estate!");
				updateCashDisplay();
			}
		} else if (player == "human" && gameState.humanPlayerPosition == 18) {
			gameState.humanCash = gameState.humanCash - venueObject.gotMuggedPrice;
			$("#status-4").text("Got Mugged!");
			updateCashDisplay();
		} else if (player == "computer" && gameState.computerPlayerPosition == 18) {
			gameState.computerCash = gameState.computerCash - venueObject.gotMuggedPrice;
			$("#status-4").text("Got Mugged!");
			updateCashDisplay();
		} else if (player == "human" && gameState.humanPlayerPosition == 19) {
			var prize = getSurprise();
			gameState.humanCash = gameState.humanCash + prize;
			$("#status-4").html("Congrats! <p> You won $" + prize + "!");
			updateCashDisplay();
		} else if (player == "computer" && gameState.computerPlayerPosition == 19) {
			var prize = getSurprise();
			gameState.computerCash = gameState.computerCash + prize;
			$("#status-4").html("Congrats! <p> You won $" + prize + "!");
			updateCashDisplay();
		} else if (player == "human" && gameState.humanPlayerPosition == 20) {
			payRent("human", venueObject.oldHollandRoadOwner, 20);
			$("#p1Assets").text("Human Cash: " + gameState.humanCash + ",  Old Holland Road: " + venueObject.oldHollandRoadPrice + " , Occupancy: " + venueObject.oldHollandRoadOccupancy)
			if (gameState.humanCash > venueObject.oldHollandRoadPrice && venueObject.oldHollandRoadOccupancy == false) {
				$("#status-4").html("Old Holland Road is available! <p>Do You Want To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
			} else {
				gameState.okToBuy = false;
				$("#status-4").html("Sorry! <p>You can't buy that awesome real estate!");
				updateCashDisplay();
			}
		} else if (player == "computer" && gameState.computerPlayerPosition == 20) {
			payRent("computer", venueObject.oldHollandRoadOwner, 20);
			$("#p1Assets").text("Computer Cash: " + gameState.computerCash + ",  Pan Pacific: " + venueObject.oldHollandRoadPrice + " , Occupancy: " + venueObject.oldHollandRoadOccupancy)
			if (gameState.computerCash > venueObject.oldHollandRoadPrice && venueObject.oldHollandRoadOccupancy == false) {
				$("#status-4").text("Old Holland Road is available! <p>Do You Wish To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
			} else {
				gameState.okToBuy = false;
				$("#status-4").html("Sorry! <p>You can't buy that awesome real estate!");
				updateCashDisplay();
			}
		} else if (player == "human" && gameState.humanPlayerPosition == 21) {
			gameState.humanCash = gameState.humanCash - venueObject.NigerianScamPrice;
			$("#status-4").text("Nigerian Scam!");
			updateCashDisplay();
		} else if (player == "computer" && gameState.computerPlayerPosition == 21) {
			gameState.computerCash = gameState.computerCash - venueObject.NigerianScamPrice;
			$("#status-4").text("Nigerian Scam!");
			updateCashDisplay();
		} else if (player == "human" && gameState.humanPlayerPosition == 22) {
			payRent("human", venueObject.belmontRoadOwner, 22);
			$("#p1Assets").text("Human Cash: " + gameState.humanCash + ",  Belmont Road: " + venueObject.belmontRoadPrice + " , Occupancy: " + venueObject.belmontRoadOccupancy)
			if (gameState.humanCash > venueObject.belmontRoadPrice && venueObject.belmontRoadOccupancy == false) {
				$("#status-4").html("Belmont Road is available! <p>Do You Want To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
			} else {
				gameState.okToBuy = false;
				$("#status-4").html("Sorry! <p>You can't buy that awesome real estate!");
				updateCashDisplay();
			}
		} else if (player == "computer" && gameState.computerPlayerPosition == 22) {
			payRent("computer", venueObject.belmontRoadOwner, 22);
			$("#p1Assets").text("Computer Cash: " + gameState.computerCash + ",  Belmont Road: " + venueObject.belmontRoadPrice + " , Occupancy: " + venueObject.belmontRoadOccupancy)
			if (gameState.computerCash > venueObject.belmontRoadPrice && venueObject.belmontRoadOccupancy == false) {
				$("#status-4").text("Belmont Road is available! <p>Do You Wish To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
			} else {
				gameState.okToBuy = false;
				$("#status-4").html("Sorry! <p>You can't buy that awesome real estate!");
				updateCashDisplay();
			}
		} else if (player == "human" && gameState.humanPlayerPosition == 23) {
			payRent("human", venueObject.leedonParkOwner, 23);
			$("#p1Assets").text("Human Cash: " + gameState.humanCash + ",  Leedon Park: " + venueObject.leedonParkPrice + " , Occupancy: " + venueObject.leedonParkOccupancy)
			if (gameState.humanCash > venueObject.leedonParkPrice && venueObject.leedonParkOccupancy == false) {
				$("#status-4").html("Leedon Park is available! <p>Do You Want To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
			} else {
				gameState.okToBuy = false;
				$("#status-4").html("Sorry! <p>You can't buy that awesome real estate!");
				updateCashDisplay();
			}
		} else if (player == "computer" && gameState.computerPlayerPosition == 23) {
			payRent("computer", venueObject.leedonParkOwner, 23);
			$("#p1Assets").text("Computer Cash: " + gameState.computerCash + ",  Leedon Park: " + venueObject.leedonParkPrice + " , Occupancy: " + venueObject.leedonParkOccupancy)
			if (gameState.computerCash > venueObject.leedonParkPrice && venueObject.leedonParkOccupancy == false) {
				$("#status-4").text("Leedon Park is available! <p>Do You Wish To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
			} else {
				gameState.okToBuy = false;
				$("#status-4").html("Sorry! <p>You can't buy that awesome real estate!");
				updateCashDisplay();
			}
		} else if (player == "human" && gameState.humanPlayerPosition == 24) {
			payRent("human", venueObject.sentosaCoveOwner, 24);
			$("#p1Assets").text("Human Cash: " + gameState.humanCash + ",  Sentosa Cove: " + venueObject.sentosaCovePrice + " , Occupancy: " + venueObject.sentosaCoveOccupancy)
			if (gameState.humanCash > venueObject.sentosaCovePrice && venueObject.sentosaCoveOccupancy == false) {
				$("#status-4").html("Sentosa Cove is available! <p>Do You Want To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
			} else {
				gameState.okToBuy = false;
				$("#status-4").html("Sorry! <p>You can't buy that awesome real estate!");
				updateCashDisplay();
			}
		} else if (player == "computer" && gameState.computerPlayerPosition == 24) {
			payRent("computer", venueObject.sentosaCoveOwner, 24);
			$("#p1Assets").text("Computer Cash: " + gameState.computerCash + ",  Sentosa Cove: " + venueObject.sentosaCovePrice + " , Occupancy: " + venueObject.sentosaCoveOccupancy)
			if (gameState.computerCash > venueObject.sentosaCovePrice && venueObject.sentosaCoveOccupancy == false) {
				$("#status-4").text("Sentosa Cove is available! <p>Do You Wish To Buy?");
				gameState.okToBuy = true;
				$("#btn-buyHotel").prop("disabled", false);
				updateCashDisplay();
			} else {
				gameState.okToBuy = false;
				$("#status-4").html("Sorry! <p>You can't buy that awesome real estate!");
				updateCashDisplay();
			}
		}
	}

	function updateCashDisplay() {
		$("#humanCashDisplay").text("Cash: $" + gameState.humanCash);
		$("#computerCashDisplay").text("Cash: $" + gameState.computerCash);
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
				$("#status-4").html("Botanic Gardens has been sold to " + whoIsThis + " !");
				if (whoIsThis == "human") {
					gameState.humanCash = gameState.humanCash - venueObject.rafflesBoulevardPrice;
				} else {
					gameState.computerCash = gameState.computerCash - venueObject.rafflesBoulevardPrice;
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
				$("#status-4").html("Botanic Gardens has been sold to " + whoIsThis + " !");
				if (whoIsThis == "human") {
					gameState.humanCash = gameState.humanCash - venueObject.botanicGardensPrice;
				} else {
					gameState.computerCash = gameState.computerCash - venueObject.botanicGardensPrice;
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
				$("#status-4").html("Ritz Carlton has been sold to " + whoIsThis + " !");
				if (whoIsThis == "human") {
					gameState.humanCash = gameState.humanCash - venueObject.ritzCarltonPrice;
				} else {
					gameState.computerCash = gameState.computerCash - venueObject.ritzCarltonPrice;
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
				$("#status-4").html("Raffles Hotel has been sold to " + whoIsThis + " !");
				if (whoIsThis == "human") {
					gameState.humanCash = gameState.humanCash - venueObject.rafflesHotelPrice;
				} else {
					gameState.computerCash = gameState.computerCash - venueObject.rafflesHotelPrice;
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
				$("#status-4").html("Rail Mall has been sold to " + whoIsThis + " !");
				if (whoIsThis == "human") {
					gameState.humanCash = gameState.humanCash - venueObject.railMallPrice;
				} else {
					gameState.computerCash = gameState.computerCash - venueObject.railMallPrice;
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
				$("#status-4").html("West Coast has been sold to " + whoIsThis + " !");
				if (whoIsThis == "human") {
					gameState.humanCash = gameState.humanCash - venueObject.westCoastParkPrice;
				} else {
					gameState.computerCash = gameState.computerCash - venueObject.westCoastParkPrice;
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
				$("#status-4").html("Dairy Farm has been sold to " + whoIsThis + " !");
				if (whoIsThis == "human") {
					gameState.humanCash = gameState.humanCash - venueObject.dairyFarmPrice;
				} else {
					gameState.computerCash = gameState.computerCash - venueObject.dairyFarmPrice;
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
				$("#status-4").html("Pan Pacific has been sold to " + whoIsThis + " !");
				if (whoIsThis == "human") {
					gameState.humanCash = gameState.humanCash - venueObject.panPacificPrice;
				} else {
					gameState.computerCash = gameState.computerCash - venueObject.panPacificPrice;
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
				$("#status-4").html("Raffles City has been sold to " + whoIsThis + " !");
				if (whoIsThis == "human") {
					gameState.humanCash = gameState.humanCash - venueObject.rafflesCityMallPrice;
				} else {
					gameState.computerCash = gameState.computerCash - venueObject.rafflesCityMallPrice;
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
				$("#status-4").html("Esplanade Park has been sold to " + whoIsThis + " !");
				if (whoIsThis == "human") {
					gameState.humanCash = gameState.humanCash - venueObject.esplanadeParkPrice;
				} else {
					gameState.computerCash = gameState.computerCash - venueObject.esplanadeParkPrice;
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
				$("#status-4").html("Old Holland Road has been sold to " + whoIsThis + " !");
				if (whoIsThis == "human") {
					gameState.humanCash = gameState.humanCash - venueObject.oldHollandRoadPrice;
				} else {
					gameState.computerCash = gameState.computerCash - venueObject.oldHollandRoadPrice;
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
				$("#status-4").html("Belmont Road has been sold to " + whoIsThis + " !");
				if (whoIsThis == "human") {
					gameState.humanCash = gameState.humanCash - venueObject.belmontRoadPrice;
				} else {
					gameState.computerCash = gameState.computerCash - venueObject.belmontRoadPrice;
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
				$("#status-4").html("Belmont Road has been sold to " + whoIsThis + " !");
				if (whoIsThis == "human") {
					gameState.humanCash = gameState.humanCash - venueObject.leedonParkPrice;
				} else {
					gameState.computerCash = gameState.computerCash - venueObject.leedonParkPrice;
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
				$("#status-4").html("Sentosa Cove has been sold to " + whoIsThis + " !");
				if (whoIsThis == "human") {
					gameState.humanCash = gameState.humanCash - venueObject.sentosaCovePrice;
				} else {
					gameState.computerCash = gameState.computerCash - venueObject.sentosaCovePrice;
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
		alert("Pay Rent Initialized");
		if (whoIsThis == "human" && locationOwnerStatus == "computer" && venue == 3) {
			gameState.humanCash = gameState.humanCash - venueObject.rafflesBoulevardPrice;
			gameState.computerCash = gameState.computerCash + venueObject.rafflesBoulevardPrice;
			updateCashDisplay();
			$("#status-2").html("Human paid rent $" + venueObject.rafflesBoulevardPrice + " to Computer");
			alert("Rental is paid!");
		} else if (whoIsThis == "computer" && locationOwnerStatus == "human" && venue == 3) {
			gameState.humanCash = gameState.humanCash + venueObject.rafflesBoulevardPrice;
			gameState.computerCash = gameState.computerCash - venueObject.rafflesBoulevardPrice;
			updateCashDisplay();
			$("#status-2").html("Computer paid rent $" + venueObject.rafflesBoulevardPrice + " to Human");
			alert("Rental is paid!");
		} else if (whoIsThis == "human" && locationOwnerStatus == "computer" && venue == 5) {
			gameState.humanCash = gameState.humanCash - venueObject.botanicGardensPrice;
			gameState.computerCash = gameState.computerCash + venueObject.botanicGardensPrice;
			updateCashDisplay();
			$("#status-2").html("Human paid rent $" + venueObject.botanicGardensPrice + " to Computer");
			alert("Rental is paid!");
		} else if (whoIsThis == "computer" && locationOwnerStatus == "human" && venue == 5) {
			gameState.humanCash = gameState.humanCash + venueObject.botanicGardensPrice;
			gameState.computerCash = gameState.computerCash - venueObject.botanicGardensPrice;
			updateCashDisplay();
			$("#status-2").html("Computer paid rent $" + venueObject.botanicGardensPrice + " to Human");
			alert("Rental is paid!");
		} else if (whoIsThis == "human" && locationOwnerStatus == "computer" && venue == 6) {
			gameState.humanCash = gameState.humanCash - venueObject.ritzCarltonPrice;
			gameState.computerCash = gameState.computerCash + venueObject.ritzCarltonPrice;
			updateCashDisplay();
			$("#status-2").html("Human paid rent $" + venueObject.ritzCarltonPrice + " to Computer");
			alert("Rental is paid!");
		} else if (whoIsThis == "computer" && locationOwnerStatus == "human" && venue == 6) {
			gameState.humanCash = gameState.humanCash + venueObject.ritzCarltonPrice;
			gameState.computerCash = gameState.computerCash - venueObject.ritzCarltonPrice;
			updateCashDisplay();
			$("#status-2").html("Computer paid rent $" + venueObject.ritzCarltonPrice + " to Human");
			alert("Rental is paid!");
		} else if (whoIsThis == "human" && locationOwnerStatus == "computer" && venue == 7) {
			gameState.humanCash = gameState.humanCash - venueObject.rafflesHotelPrice;
			gameState.computerCash = gameState.computerCash + venueObject.rafflesHotelPrice;
			updateCashDisplay();
			$("#status-2").html("Human paid rent $" + venueObject.rafflesHotelPrice + " to Computer");
			alert("Rental is paid!");
		} else if (whoIsThis == "computer" && locationOwnerStatus == "human" && venue == 7) {
			gameState.humanCash = gameState.humanCash + venueObject.rafflesHotelPrice;
			gameState.computerCash = gameState.computerCash - venueObject.rafflesHotelPrice;
			updateCashDisplay();
			$("#status-2").html("Computer paid rent $" + venueObject.rafflesHotelPrice + " to Human");
			alert("Rental is paid!");
		} else if (whoIsThis == "human" && locationOwnerStatus == "computer" && venue == 10) {
			gameState.humanCash = gameState.humanCash - venueObject.railMallPrice;
			gameState.computerCash = gameState.computerCash + venueObject.railMallPrice;
			updateCashDisplay();
			$("#status-2").html("Human paid rent $" + venueObject.railMallPrice + " to Computer");
			alert("Rental is paid!");
		} else if (whoIsThis == "computer" && locationOwnerStatus == "human" && venue == 10) {
			gameState.humanCash = gameState.humanCash + venueObject.railMallPrice;
			gameState.computerCash = gameState.computerCash - venueObject.railMallPrice;
			updateCashDisplay();
			$("#status-2").html("Computer paid rent $" + venueObject.railMallPrice + " to Human");
			alert("Rental is paid!");
		} else if (whoIsThis == "human" && locationOwnerStatus == "computer" && venue == 11) {
			gameState.humanCash = gameState.humanCash - venueObject.westCoastParkPrice;
			gameState.computerCash = gameState.computerCash + venueObject.westCoastParkPrice;
			updateCashDisplay();
			$("#status-2").html("Human paid rent $" + venueObject.westCoastParkPrice + " to Computer");
			alert("Rental is paid!");
		} else if (whoIsThis == "computer" && locationOwnerStatus == "human" && venue == 11) {
			gameState.humanCash = gameState.humanCash + venueObject.westCoastParkPrice;
			gameState.computerCash = gameState.computerCash - venueObject.westCoastParkPrice;
			updateCashDisplay();
			$("#status-2").html("Computer paid rent $" + venueObject.westCoastParkPrice + " to Human");
			alert("Rental is paid!");
		} else if (whoIsThis == "human" && locationOwnerStatus == "computer" && venue == 14) {
			gameState.humanCash = gameState.humanCash - venueObject.dairyFarmPrice;
			gameState.computerCash = gameState.computerCash + venueObject.dairyFarmPrice;
			updateCashDisplay();
			$("#status-2").html("Human paid rent $" + venueObject.dairyFarmPrice + " to Computer");
			alert("Rental is paid!");
		} else if (whoIsThis == "computer" && locationOwnerStatus == "human" && venue == 14) {
			gameState.humanCash = gameState.humanCash + venueObject.dairyFarmPrice;
			gameState.computerCash = gameState.computerCash - venueObject.dairyFarmPrice;
			updateCashDisplay();
			$("#status-2").html("Computer paid rent $" + venueObject.dairyFarmPrice + " to Human");
			alert("Rental is paid!");
		} else if (whoIsThis == "human" && locationOwnerStatus == "computer" && venue == 15) {
			gameState.humanCash = gameState.humanCash - venueObject.panPacificPrice;
			gameState.computerCash = gameState.computerCash + venueObject.panPacificPrice;
			updateCashDisplay();
			$("#status-2").html("Human paid rent $" + venueObject.panPacificPrice + " to Computer");
			alert("Rental is paid!");
		} else if (whoIsThis == "computer" && locationOwnerStatus == "human" && venue == 15) {
			gameState.humanCash = gameState.humanCash + venueObject.panPacificPrice;
			gameState.computerCash = gameState.computerCash - venueObject.panPacificPrice;
			updateCashDisplay();
			$("#status-2").html("Computer paid rent $" + venueObject.panPacificPrice + " to Human");
			alert("Rental is paid!");
		} else if (whoIsThis == "human" && locationOwnerStatus == "computer" && venue == 16) {
			gameState.humanCash = gameState.humanCash - venueObject.rafflesCityMallPrice;
			gameState.computerCash = gameState.computerCash + venueObject.rafflesCityMallPrice;
			updateCashDisplay();
			$("#status-2").html("Human paid rent $" + venueObject.rafflesCityMallPrice + " to Computer");
			alert("Rental is paid!");
		} else if (whoIsThis == "computer" && locationOwnerStatus == "human" && venue == 16) {
			gameState.humanCash = gameState.humanCash + venueObject.rafflesCityMallPrice;
			gameState.computerCash = gameState.computerCash - venueObject.rafflesCityMallPrice;
			updateCashDisplay();
			$("#status-2").html("Computer paid rent $" + venueObject.rafflesCityMallPrice + " to Human");
			alert("Rental is paid!");
		} else if (whoIsThis == "human" && locationOwnerStatus == "computer" && venue == 17) {
			gameState.humanCash = gameState.humanCash - venueObject.esplanadeParkPrice;
			gameState.computerCash = gameState.computerCash + venueObject.esplanadeParkPrice;
			updateCashDisplay();
			$("#status-2").html("Human paid rent $" + venueObject.esplanadeParkPrice + " to Computer");
			alert("Rental is paid!");
		} else if (whoIsThis == "computer" && locationOwnerStatus == "human" && venue == 17) {
			gameState.humanCash = gameState.humanCash + venueObject.esplanadeParkPrice;
			gameState.computerCash = gameState.computerCash - venueObject.esplanadeParkPrice;
			updateCashDisplay();
			$("#status-2").html("Computer paid rent $" + venueObject.esplanadeParkPrice + " to Human");
			alert("Rental is paid!");
		} else if (whoIsThis == "human" && locationOwnerStatus == "computer" && venue == 20) {
			gameState.humanCash = gameState.humanCash - venueObject.oldHollandRoadPrice;
			gameState.computerCash = gameState.computerCash + venueObject.oldHollandRoadPrice;
			updateCashDisplay();
			$("#status-2").html("Human paid rent $" + venueObject.oldHollandRoadPrice + " to Computer");
			alert("Rental is paid!");
		} else if (whoIsThis == "computer" && locationOwnerStatus == "human" && venue == 20) {
			gameState.humanCash = gameState.humanCash + venueObject.oldHollandRoadPrice;
			gameState.computerCash = gameState.computerCash - venueObject.oldHollandRoadPrice;
			updateCashDisplay();
			$("#status-2").html("Computer paid rent $" + venueObject.oldHollandRoadPrice + " to Human");
			alert("Rental is paid!");
		} else if (whoIsThis == "human" && locationOwnerStatus == "computer" && venue == 22) {
			gameState.humanCash = gameState.humanCash - venueObject.belmontRoadPrice;
			gameState.computerCash = gameState.computerCash + venueObject.belmontRoadPrice;
			updateCashDisplay();
			$("#status-2").html("Human paid rent $" + venueObject.belmontRoadPrice + " to Computer");
			alert("Rental is paid!");
		} else if (whoIsThis == "computer" && locationOwnerStatus == "human" && venue == 22) {
			gameState.humanCash = gameState.humanCash + venueObject.belmontRoadPrice;
			gameState.computerCash = gameState.computerCash - venueObject.belmontRoadPrice;
			updateCashDisplay();
			$("#status-2").html("Computer paid rent $" + venueObject.belmontRoadPrice + " to Human");
			alert("Rental is paid!");
		} else if (whoIsThis == "human" && locationOwnerStatus == "computer" && venue == 23) {
			gameState.humanCash = gameState.humanCash - venueObject.belmontRoadPrice;
			gameState.computerCash = gameState.computerCash + venueObject.belmontRoadPrice;
			updateCashDisplay();
			$("#status-2").html("Human paid rent $" + venueObject.belmontRoadPrice + " to Computer");
			alert("Rental is paid!");
		} else if (whoIsThis == "computer" && locationOwnerStatus == "human" && venue == 23) {
			gameState.humanCash = gameState.humanCash + venueObject.belmontRoadPrice;
			gameState.computerCash = gameState.computerCash - venueObject.belmontRoadPrice;
			updateCashDisplay();
			$("#status-2").html("Computer paid rent $" + venueObject.belmontRoadPrice + " to Human");
			alert("Rental is paid!");
		} else if (whoIsThis == "human" && locationOwnerStatus == "computer" && venue == 24) {
			gameState.humanCash = gameState.humanCash - venueObject.sentosaCovePrice;
			gameState.computerCash = gameState.computerCash + venueObject.sentosaCovePrice;
			updateCashDisplay();
			$("#status-2").html("Human paid rent $" + venueObject.sentosaCovePrice + " to Computer");
			alert("Rental is paid!");
		} else if (whoIsThis == "computer" && locationOwnerStatus == "human" && venue == 24) {
			gameState.humanCash = gameState.humanCash + venueObject.sentosaCovePrice;
			gameState.computerCash = gameState.computerCash - venueObject.sentosaCovePrice;
			updateCashDisplay();
			$("#status-2").html("Computer paid rent $" + venueObject.sentosaCovePrice + " to Human");
			alert("Rental is paid!");
		}
	}

	function sellHotel() {
		alert("Sell Hotel");
	}
}); // close function
