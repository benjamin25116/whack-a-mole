/* TODO:

1. set up grid to display mole randomly
2. set up interval to have grid update mole position in a given time
3. Add event listener to square to detect "mouseup" event and add score
4. set up countdown to stop the game when the countdown is over

*/

const squares = document.querySelectorAll(".square");
const mole = document.getElementsByClassName("mole");
const timeLeft = document.querySelector(".time");
let score = 0;
let currentTime = timeLeft.textContent;

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
    clearInterval(timer);
    alert("Time's up! Your score is " + score);
  }
}

let timer = setInterval(countdown, 1000);

function addScore() {
  let moleID = mole[0].getAttribute("id");
  let clickedSquareId = this.getAttribute("id");
  if (clickedSquareId === moleID) {
    score++;
    [previousScore] = document.getElementsByClassName("score");
    previousScore.textContent = score.toString();
  }
}

squares.forEach((square) => square.addEventListener("mouseup", addScore));
