const killzone = document.getElementById("killzone");
const startBtn = document.getElementById("start");
const restartBtn = document.getElementById("restart");
const gameOverScreen = document.getElementById("game_over");
const playerInput = document.getElementById("player_input");
const form = document.getElementsByTagName("form");
var wordsScreen = document.getElementById("words_screen");

var wordsOnScreen = {};
var lost = false;
var spawnWord = null;

var score = 0;
var scoreElement = document.getElementById("score");

const words_list = ["hello", "sugar", "banana", "games", "test", "attack"];

const SPEED = window.innerWidth / 1000 - 100;

form[0].addEventListener("submit", (e) => {
  e.preventDefault();
  for (let i = 0; i < wordsScreen.children.length; i++) {
    if (wordsScreen.children[i].id == playerInput.value) {
      wordsScreen.children[i].remove();
      updateScore();
      break;
    }
  }
  playerInput.value = "";
});

startBtn.addEventListener("click", () => {
  spawnNewWord(2000);
  startBtn.setAttribute("disabled", true);
});

restartBtn.addEventListener("click", () => {
  wordsScreen = document.getElementById("words_screen");
  clearInterval(spawnWord);
  gameOverScreen.style.display = "none";
  startBtn.removeAttribute("disabled");
  wordsScreen.replaceChildren();
  wordsOnScreen = {};
  score = 0;
  scoreElement.innerHTML = `SCORE: ${score}`;
  playerInput.value = "";
});

function updateScore() {
  score++;
  scoreElement.innerHTML = `SCORE: ${score}`;
}

class Enemy {
  constructor(word) {
    let item = document.createElement("span");
    item.innerHTML = word;
    item.id = word;
    item.style.top = `${Math.random() * window.innerHeight - 50}px`;
    wordsScreen.appendChild(item);
    this.word = item;
  }
  move() {
    let id = null;
    let item = this.word;

    clearInterval(id);
    id = setInterval(frame, SPEED);
    function frame() {
      let pos = item.getBoundingClientRect().x;
      if (pos >= killzone.getBoundingClientRect().x - 18) {
        clearInterval(id);
        clearInterval(spawnWord);
        gameOverScreen.style.display = "flex";
      } else {
        pos++;
        item.style.left = pos + "px";
      }
    }
  }
}
function spawnNewWord(time) {
  spawnWord = setInterval(() => {
    let rand = Math.floor(Math.random() * words_list.length);
    let newWord = words_list[rand];
    let newWordKey = newWord + Object.keys(wordsOnScreen).length;
    wordsOnScreen[newWordKey] = new Enemy(newWord);
    wordsOnScreen[newWordKey].move();
  }, time);
}
let gameTimer = setInterval(() => {
  if (score > 10 && score <= 20) {
    clearInterval(spawnWord);
    spawnNewWord(1500);
  } else if (score > 20 && score <= 30) {
    clearInterval(spawnWord);
    spawnNewWord(1000);
  } else if (score > 30) {
    clearInterval(spawnWord);
    spawnNewWord(500);
  }
}, 5000);
