

$(function(){
console.log("Game Ready!");

var playerPosition = 1;
var p2Position = 1;
var rollResult;
var num = 1;
setPlayer();
var diceTimerID;
var characterTimerID;
var moveAnimationCounter = 1;
var round;
var temp = 0;





// set player1 to starting position
// player1 moves according to dice roll




function setPlayer() {
  console.log("Player Set");
  $('#p1-profile').prepend('<img src="images/raph-grey.png" id="startRaph" width="147" height="125" />');
  $('#p2-profile').prepend('<img src="images/elsa-grey.png" id="startElsa" width="147" height="125" />');
  $('#p3-profile').prepend('<img src="images/panda-grey.png" id="startPanda" width="147" height="125" />');
}

// Initialize State Control
var gameState = {
  c1: "",
  c2: "",
  c3: "",
  c4: "",
  c5: "",
  c6: "",
  c7: "",
  c8: "",
  c9: "",
  c10: "",
  c11: "",
  c12: "",
  c13: "",
  c14: "",
  c15: ""
}

// Close State Control

function rollDice() {

  $("#dice" + rollResult).removeClass("diceSelector"); // remove previous selection
  rollResult = Math.floor(Math.random() * 8) + 1; // random a number from 1 to 8

  setTimeout(function(){ // set a 400ms delay
    startTimeOut();
      }, 400);
  }

function startTimeOut() {     // set dice rolling animation
  initTimer();
}

function initTimer() {   // creating a 100ms timer
  diceTimerID = window.setInterval(startDiceAnimation, 100);
}

 function startDiceAnimation() {
   $('#status1').text("Dice Rolling ..");
   $("#dice" + (num - 1)).removeClass("diceSelector");
   console.log("rollResult: " + rollResult + " " + "Index is: " + num);

   if (num > 8) {
     round = true;
     num = num - 8;
    }

   $("#dice" + num).addClass("diceSelector");
   num ++;

if (num == rollResult + 1 && round == true) {
  window.clearInterval(diceTimerID);
  round = false;
  num = 1;
  $('#status1').text("Dice is " + rollResult);
  placeCharacter(rollResult);
}
}

function placeCharacter(rollResult) {

  var newPosition = playerPosition + rollResult;

  if (newPosition > 24){
  newPosition = newPosition - 24;
  console.log("New Position is:" + newPosition);
    }

  characterTimerID = window.setInterval(startMoveAnimation, 100);


    function startMoveAnimation() {

      if (playerPosition > 24) {
        playerPosition = playerPosition - 24;
        console.log("Player Position exceeds 24! Player Position is now: " + playerPosition);
      }


     $("#c" + playerPosition + "-playerBox-1").removeClass("showRaph");
     console.log("Removed Raph from position: " + playerPosition);
     $('#c' + (playerPosition + 1) + '-playerBox-1').addClass("showRaph");
     console.log("Place Raph into position: " + playerPosition);
     playerPosition ++;


     if (moveAnimationCounter == rollResult) {
       window.clearInterval(characterTimerID);
       moveAnimationCounter = 1;
       console.log("Player Position is:" + playerPosition);
     }
     else {
       moveAnimationCounter ++;
       console.log("Move Animation Counter + 1");
     }

    }







function loadChar(character) {  // load character into game
if (character == "raph") {
  $('#p1-profile').prepend('<img src="images/raph.png" id="startRaph" width="147" height="125" />');
}

else if (character == "elsa") {
  $('#p2-profile').prepend('<img src="images/elsa.png" id="startElsa" width="147" height="125" />');
}

else if (character == "panda") {
  console.log("Panda Loaded");
  $('#p3-profile').prepend('<img src="images/panda.png" id="startPanda" width="147" height="125" />');
}
}

// Add Listener

$('button').click(function() {
  console.log(this.id);
if (this.id == "roll") {
  rollDice()
}
else if (this.id == "reload") {
  location.reload();
}
});


$('img').click(function() {

  if (this.id == "startRaph"){
  $('#c1-playerBox-1').addClass("showRaph");
  console.log("Start Raph");
  loadChar("raph");
}

else if (this.id == "startElsa"){
  $('#c1-playerBox-2').addClass("showElsa");
  console.log("Start Elsa");
  loadChar("elsa");
}

else if (this.id == "startPanda"){
  $('#c1-playerBox-3').addClass("showPanda");
  console.log("Start Panda");
  loadChar("panda");
}

});





});
