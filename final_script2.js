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


const audioEat = new Audio('/sfx/music_food.mp3');
audioEat.preload = 'auto';
audioEat.load(); 


highScoreElement.innerHTML = highScore;

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

let intervalId = null;
let timerIntervalId = null;

// let food = {
//   x: Math.floor(Math.random() * rows),
//   y: Math.floor(Math.random() * cols),
// };

// let food = generateFood() // temporal dead zone because snake is defined below here and generate food use snake array 
// const blocks = [];

let snake = [
    {
        x: 1,
        y: 3,
    },
];

let food = generateFood() // temporal dead zone because snake is defined below here and generate food use snake array // now have putten it below snake
const blocks = [];

let direction = "down";

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);

    blocks[`${row}-${col}`] = block;
  }
}

function render() {
  let head = null;

  blocks[`${food.x}-${food.y}`].classList.add("food");


  if (direction === "left") {
    head = { x: snake[0].x, y: snake[0].y - 1 };
  } else if (direction === "right") {
    head = { x: snake[0].x, y: snake[0].y + 1 };
  } else if (direction === "down") {
    head = { x: snake[0].x + 1, y: snake[0].y };
  } else if (direction === "up") {
    head = { x: snake[0].x - 1, y: snake[0].y };
  }

  const isSelfCollision = snake.some( (segment) =>{
    return segment.x === head.x && segment.y === head.y;
  });

  if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols || isSelfCollision) {
    clearInterval(intervalId);

    modal.style.display = "flex";
    startGameModal.style.display = "none";
    gameOverScoreCurrent.innerHTML= scoreElement.innerHTML
    gameOverScoreHigh.innerHTML= highScoreElement.innerHTML
    gameOverModal.style.display = "flex";

    return;
  }

  if (head.x == food.x && head.y == food.y) {

    audioEat.play()


    blocks[`${food.x}-${food.y}`].classList.remove("food");
    // food = {
    //   x: Math.floor(Math.random() * rows),
    //   y: Math.floor(Math.random() * cols),
    // };
    food = generateFood() // to make sure the food do not collide with the body of the snake
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
  snake = [{ x: 1, y: 3 }];
  // food = {
  //  x: Math.floor(Math.random() * rows),
  //  y: Math.floor(Math.random() * cols),
  // };
  food = generateFood();
  intervalId = setInterval(() => {
    render();
  }, 350);
}

addEventListener("keydown", (event) => {

   if (event.key === "ArrowUp") {
    if(direction !== "down" || snake.length === 1)
    direction = "up";
  } else if (event.key === "ArrowLeft") {
    if(direction !== "right" || snake.length === 1)
    direction = "left";
  } else if (event.key === "ArrowRight") {
    if(direction !== "left" || snake.length === 1)
    direction = "right";
  } else if (event.key === "ArrowDown") {
    if(direction !== "up" || snake.length === 1)
    direction = "down";
  }
});



function generateFood(){
    let  newFood;
    let isOnSnake;

    do {
        newFood = {
            x: Math.floor(Math.random() * rows),
            y: Math.floor(Math.random() * cols),
        };


        isOnSnake = snake.some((segment) =>{
            return newFood.x === segment.x && newFood.y === segment.y; // returns true or false
        }) // if true then loop runs again and the random value generated again
    } while(isOnSnake)

        return newFood;
}


