// Variable declarations and initialisations
const squares = document.querySelectorAll(".square");
const timeLeft = document.querySelector(".time");
const startBtn = document.querySelector(".startButton");
const startScrn = document.querySelector(".startScreen");
const gameGrid = document.querySelector(".grid");
const scoreTitle = document.querySelector(".score");
const playerNameLabel = document.querySelector(".playerNameLabel");
const playerNameInput = document.querySelector("#playerName");
const leaderboardTitle = document.querySelector(".leaderboardTitle");
const leaderboardList = document.querySelector(".leaderboardList");
let score = 0;
let currentTime = timeLeft.textContent;
let timer = false;
let currentPlayerName;
let leaderboardArray = [];

// Function declarations
function updateName(inputEvent) {
  currentPlayerName = inputEvent.target.value;
}

function randomiseMole() {
  squares.forEach((square) => square.classList.remove("mole"));
  squares[Math.floor(Math.random() * 9)].classList.add("mole");
}

function gameLoop() {
  if (currentTime != 0) {
    currentTime--;
    timeLeft.textContent = currentTime;
    randomiseMole();
  } else {
    alert(`Time's up! ${currentPlayerName}'s score is ` + score);
    updateLeaderboard();
    renderLeaderboard();
    resetGame();
  }
}

function addScore() {
  const mole = document.querySelector(".mole");
  let moleID = mole.getAttribute("id");
  let clickedSquareId = this.getAttribute("id");
  if (clickedSquareId === moleID) {
    score++;
    scoreTitle.textContent = score.toString();
  }
}

function startGame() {
  if (!timer && currentPlayerName != null) {
    timeLeft.textContent = "10";
    currentTime = 10;
    timer = setInterval(gameLoop, 1000);
    startBtn.style.display = "none";
    startScrn.style.display = "none";
    gameGrid.style.display = "block";
    playerNameInput.style.display = "none";
    playerNameLabel.style.display = "none";
  } else {
    alert("Please insert name.");
  }
}

function updateLeaderboard() {
  leaderboardArray.push({ score: score, name: currentPlayerName });

  // Sort in descending order
  if (leaderboardArray.length > 1) {
    leaderboardArray.sort((playerA, playerB) => {
      return (playerA.score - playerB.score) * -1;
    });
    // Return only top 5 scores
    leaderboardArray = leaderboardArray.slice(0, 5);
  }
}

function renderLeaderboard() {
  // Clearing old list
  while (leaderboardList.firstChild) {
    leaderboardList.removeChild(leaderboardList.firstChild);
  }

  // Mapping new list
  leaderboardArray.map((player) => {
    let currentListEntry = document.createElement("li");
    currentListEntry.classList.add("listItem");
    currentListEntry.textContent = `${player.name} - ${player.score}`;
    leaderboardList.appendChild(currentListEntry);
  });

  // Displaying leaderboard
  leaderboardTitle.style.display = "block";
  leaderboardList.style.display = "flex";
}

function resetGame() {
  scoreTitle.textContent = "0";
  score = 0;
  timeLeft.textContent = "10";
  clearInterval(timer);
  timer = false;
  startBtn.style.display = "block";
  startScrn.style.display = "flex";
  gameGrid.style.display = "none";
  playerNameInput.style.display = "block";
  playerNameInput.value = "";
  currentPlayerName = null;
  playerNameLabel.style.display = "block";
  squares.forEach((square) => square.classList.remove("mole"));
  localStorage.setItem("whack-a-mole", JSON.stringify(leaderboardArray));
}

// Setting up Start Screen
gameGrid.style.display = "none";

// Getting localstorage data
if (localStorage.getItem("whack-a-mole")) {
  leaderboardArray = JSON.parse(localStorage.getItem("whack-a-mole"));
  renderLeaderboard();
}

// Add event listeners
squares.forEach((square) => square.addEventListener("mouseup", addScore));
startBtn.addEventListener("mouseup", startGame);
playerNameInput.addEventListener("input", updateName);
