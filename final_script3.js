const board = document.querySelector(".board");

const startButton = document.querySelector(".btn-start");
const modal = document.querySelector(".modal");
const startGameModal = document.querySelector(".start-game");
const gameOverModal = document.querySelector(".game-over");
const restartButton = document.querySelector(".btn-restart");

const gameOverScoreCurrent = document.querySelector(".gameOverScoreCurrent");
const gameOverScoreHigh = document.querySelector(".gameOverScoreHigh");

const highScoreElement = document.querySelector("#high-score");
const scoreElement = document.querySelector("#score");
const timeElement = document.querySelector("#time");

const blockHeight = 50;
const blockWidth = 50;

let highScore = localStorage.getItem("highScore") || 0;
let score = 0;
let time = `00-00`;

const audioEat = new Audio("/sfx/music_food.mp3");
audioEat.preload = "auto";
audioEat.load();

highScoreElement.innerHTML = highScore;

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

let intervalId = null;
let timerIntervalId = null;

let snake = [
  {
    x: 1,
    y: 3,
  },
];

let food = generateFood(); 
const blocks = [];

let direction = "down";
let currentDirection = "down"; // current direction to prevent 180 degree turn 
// when direction  is down , then right click then up the 
// if (direction !== "down" do not work because it is right direction but snake is in up direction
//  so slef collision occurs in snake which ends the game

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);

    blocks[`${row}-${col}`] = block;
  }
}

function render() {
  currentDirection = direction; // Lock the direction for this frame
  let head = null;

  blocks[`${food.x}-${food.y}`].classList.add("food");

  // Use currentDirection for the movement logic
  if (currentDirection === "left") {
    head = { x: snake[0].x, y: snake[0].y - 1 };
  } else if (currentDirection === "right") {
    head = { x: snake[0].x, y: snake[0].y + 1 };
  } else if (currentDirection === "down") {
    head = { x: snake[0].x + 1, y: snake[0].y };
  } else if (currentDirection === "up") {
    head = { x: snake[0].x - 1, y: snake[0].y };
  }

  const isSelfCollision = snake.some((segment) => {
    return segment.x === head.x && segment.y === head.y;
  });

  if (
    head.x < 0 ||
    head.x >= rows ||
    head.y < 0 ||
    head.y >= cols ||
    isSelfCollision
  ) {
    clearInterval(intervalId);

    modal.style.display = "flex";
    startGameModal.style.display = "none";
    gameOverScoreCurrent.innerHTML = scoreElement.innerHTML;
    gameOverScoreHigh.innerHTML = highScoreElement.innerHTML;
    gameOverModal.style.display = "flex";

    return;
  }

  if (head.x == food.x && head.y == food.y) {
    audioEat.play();

    blocks[`${food.x}-${food.y}`].classList.remove("food");
    food = generateFood(); 
    blocks[`${food.x}-${food.y}`].classList.add("food");

    snake.unshift(head);

    score += 10;
    scoreElement.innerHTML = score;

    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore.toString());
      highScoreElement.innerHTML = highScore;
    }
  }

  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
  });

  snake.unshift(head);
  snake.pop();

  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.add("fill");
  });
}

startButton.addEventListener("click", () => {
  modal.style.display = "none";
  intervalId = setInterval(() => {
    render();
  }, 350);
  timerIntervalId = setInterval(() => {
    let [min, sec] = time.split("-").map(Number);
    if (sec == 59) {
      min += 1;
      sec = 0;
    } else {
      sec += 1;
    }

    time = `${min}-${sec}`;
    timeElement.innerHTML = time;
  }, 1000);
});

restartButton.addEventListener("click", restartGame);

function restartGame() {
  score = 0;
  time = `00-00`;

  scoreElement.innerHTML = score;
  timeElement.innerHTML = time;
  highScoreElement.innerHTML = highScore;

  blocks[`${food.x}-${food.y}`].classList.remove("food");
  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
  });

  modal.style.display = "none";
  direction = "down";
  currentDirection = "down"; // reset current direction to down when restarting
  snake = [{ x: 1, y: 3 }];
  food = generateFood();
  intervalId = setInterval(() => {
    render();
  }, 350);
}

// use currentDirection to prevent the 180 degree turn the current direction , have the current before updation direction of snake , so the direction matches with it nlt the direction itself
addEventListener("keydown", (event) => {
  // Use currentDirection (the snake's last actual move) to validate the new input
  if (event.key === "ArrowUp") {
    if (currentDirection !== "down" || snake.length === 1) direction = "up";
  } else if (event.key === "ArrowLeft") {
    if (currentDirection !== "right" || snake.length === 1) direction = "left";
  } else if (event.key === "ArrowRight") {
    if (currentDirection !== "left" || snake.length === 1) direction = "right";
  } else if (event.key === "ArrowDown") {
    if (currentDirection !== "up" || snake.length === 1) direction = "down";
  }
});

function generateFood() {
  let newFood;
  let isOnSnake;

  do {
    newFood = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols),
    };

    isOnSnake = snake.some((segment) => {
      return newFood.x === segment.x && newFood.y === segment.y;
    }); 
  } while (isOnSnake);

  return newFood;
}