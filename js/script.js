const diceFaces = [
  "13.5% 33%",
  "50% 33%",
  "86% 33%",
  "13.5% 66.5%",
  "50% 66.5%",
  "86% 66.5%",
];

const newGameButton = document.getElementById("newGameButton");
const rollingDice = document.getElementById("rollingDice");
const rollDiceButton = document.getElementById("rollDiceButton");
const holdButton = document.getElementById("holdButton");
const totalScore1 = document.getElementById("totalScore1");
const currentScore1 = document.getElementById("currentScore1");
const totalScore2 = document.getElementById("totalScore2");
const currentScore2 = document.getElementById("currentScore2");
const player1Space = document.getElementById("player1Space");
const player2Space = document.getElementById("player2Space");
const player1Name = document.getElementById("player1Name");
const player2Name = document.getElementById("player2Name");
const scoreSpace2 = document.getElementById("scoreSpace2");
const scoreSpace1 = document.getElementById("scoreSpace1");
const smileFace1 = document.getElementById("smileFace1");
const smileFace2 = document.getElementById("smileFace2");

const winningDegree = 100;
let currentRoll = 0;
let currentPlayer = 1;
let player1Current = 0;
let player1Total = 0;
let player2Current = 0;
let player2Total = 0;

let player1 = prompt("First Player Name ...", 'PLAYER1');
let player2 = prompt("Second Player Name ...", 'PLAYER2');
checkUserNamesEntered();

function checkUserNamesEntered(){
  if(player1 != null && player2 != null){
    player1Name.innerHTML = player1;
    player2Name.innerHTML = player2;
  }
}

rollDiceButton.addEventListener("click", newRoll);

function newRoll() {
  let rollNumber = getRandomNumber();
  currentRoll = getRandomNumber();
  showingDice(currentRoll);
  if (currentRoll == 1) {
    oneFalsyRoll();
  } else {
    processNewRoll(currentRoll);
  }
}

function oneFalsyRoll() {
  if (currentPlayer == 1) {
    player1Current = 0;
    switchFrom1To2();
  } else if (currentPlayer == 2) {
    player2Current = 0;
    switchFrom2To1();
  }
}

function processNewRoll(currentRoll) {
  if (currentPlayer == 1) {
    player1Current += currentRoll;
    currentScore1.innerHTML = player1Current;
  } else if (currentPlayer == 2) {
    player2Current += currentRoll;
    currentScore2.innerHTML = player2Current;
  }
}

function getRandomNumber() {
  let num = Math.round(Math.random() * 6);
  if (num == 0) {
    num += Math.round(Math.random() * 5) + 1;
  }
  return num;
}

function showingDice(currentRoll) {
  rollingDice.classList.remove("d-none");
  rollingDice.style.backgroundPosition = `${diceFaces[currentRoll - 1]}`;
}

holdButton.addEventListener("click", holdState);
function holdState() {
  if (currentPlayer == 1) {
    switchFrom1To2();
  } else if (currentPlayer == 2) {
    switchFrom2To1();
  }
}

function switchFrom1To2() {
  player1Total += player1Current;
  if (player1Total >= 100) {
    player1Win();
  }
  totalScore1.innerHTML = player1Total;
  player1Current = 0;
  currentScore1.innerHTML = player1Current;
  activePlayer2();
}

function switchFrom2To1() {
  player2Total += player2Current;
  if (player2Total >= 100) {
    player2Win();
  }
  totalScore2.innerHTML = player2Total;
  player2Current = 0;
  currentScore2.innerHTML = player1Current;
  activePlayer1();
}

function activePlayer2() {
  currentPlayer = 2;
  player1Space.classList.replace("background-active", "background-disactive");
  player2Space.classList.replace("background-disactive", "background-active");
}

function activePlayer1() {
  currentPlayer = 1;
  player2Space.classList.replace("background-active", "background-disactive");
  player1Space.classList.replace("background-disactive", "background-active");
}

function player1Win() {
  player1Space.classList.add("bg-success");
  scoreSpace1.classList.add("d-none");
  smileFace1.classList.remove("d-none");
  stopGame();
}

function player2Win() {
  player2Space.classList.add("bg-success");
  scoreSpace2.classList.add("d-none");
  smileFace2.classList.remove("d-none");
  stopGame();
}

function stopGame() {
  rollDiceButton.classList.add("disabled");
  holdButton.classList.add("disabled");
}

newGameButton.addEventListener("click", () => {
  location.reload();
});
