// Variable declarations and initialisations
const squares = document.querySelectorAll(".square");
const mole = document.getElementsByClassName("mole");
const timeLeft = document.querySelector(".time");
const startBtn = document.querySelector(".startButton");
const startScrn = document.querySelector(".startScreen");
const gameGrid = document.querySelector(".grid");
const scoreTitle = document.querySelector(".score");
let score = 0;
let currentTime = timeLeft.textContent;
let timer = false;

// Function declarations
function randomiseMole() {
  squares.forEach((square) => square.classList.remove("mole"));
  squares[Math.floor(Math.random() * 9)].classList.add("mole");
}

function countdown() {
  if (currentTime != 0) {
    currentTime--;
    timeLeft.textContent = currentTime;
    randomiseMole();
  } else {
    alert("Time's up! Your score is " + score);
    resetGame();
  }
}

function addScore() {
  let moleID = mole[0].getAttribute("id");
  let clickedSquareId = this.getAttribute("id");
  if (clickedSquareId === moleID) {
    score++;
    previousScore = scoreTitle;
    previousScore.textContent = score.toString();
  }
}

function startGame() {
  if (!timer) {
    timeLeft.textContent = "10";
    currentTime = 10;
    timer = setInterval(countdown, 1000);
    startBtn.style.display = "none";
    startScrn.style.display = "none";
    gameGrid.style.display = "block";
  }
}

function resetGame() {
  scoreTitle.textContent = "0";
  timeLeft.textContent = "10";
  clearInterval(timer);
  timer = false;
  startBtn.style.display = "block";
  startScrn.style.display = "Block";
  gameGrid.style.display = "none";
}

// Setting up Start Screen
gameGrid.style.display = "none";

// Add event listeners
squares.forEach((square) => square.addEventListener("mouseup", addScore));
startBtn.addEventListener("mouseup", startGame);
