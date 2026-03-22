const board = document.querySelector('.board');

// modal
const startButton = document.querySelector(".btn-start");
const modal = document.querySelector(".modal");
const startGameModal = document.querySelector(".start-game");
const gameOverModal = document.querySelector(".game-over");
const restartButton = document.querySelector(".btn-restart");

//  score card
const highScoreElement = document.querySelector("#high-score");
const scoreElement = document.querySelector("#score");
const timeElement = document.querySelector("#time");

const blockHeight = 50;
const blockWidth = 50;

// let highScore = 0
let highScore = localStorage.getItem("highScore") || 0 // if undeifned comes at the start( if no local storaage create) , the vlaue will show 0 ( undefined or 0 => 0 or 0 which is 0)
let score = 0
let time = `00-00`

console.log(localStorage.getItem("highScore")); 

console.log(highScore)

highScoreElement.innerHTML = highScore;

// Math.floor(boardWidht / block width) = number of blocks fitting

const cols = Math.floor(board.clientWidth /blockWidth);
const rows = Math.floor(board.clientHeight /blockHeight);

let intervalId = null;
let timerIntervalId = null;

let food = {x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) };



// for(let i=0; i< rows * cols ; i++){
//     const block = document.createElement('div');
//     block.classList.add("block");
//     board.appendChild(block);
// }

// snake game logic- fps ( frame per second ) // we will show user three fps 
// the ssnake will move in grid - one block move = 1 frame
// the grid elemetns have number i, j 
// we will maintian array with three object( for three blocks )
// if snake csume food we will ad one more block at last of video 





const blocks =[]; // because canot create 2D array directly in js so change 1d to 2d at run time // it mimics 2d array

// Snake
// const snake = [{ // let so we can change it in restart function
let snake = [{
    // row , column
    x:1, y:3 // head will be this because this is first element
}, 
    // {
    //   x:1, y:4   
    // }, {
    //   x:1, y:5
    // }
];
// let direction = "right";  // 'up' 'down' 'left' 'right'
// let direction = "left";
// let direction = "up";
let direction = "down";






for(let row =0; row <rows; row++){
    for (let col = 0; col < cols; col++) {
        const block = document.createElement('div');
        block.classList.add("block");
        board.appendChild(block);
        block.innerHTML = `${row}-${col}` ; // cordinates
        // we need to do this same in js ( we use 2d array - digital ocean )
        blocks[`${row}-${col}`] = block; // block is div so div stored at the i,j value
    }
}

// console.log(blocks);// blocks array





function render(){

    let head = null;

    blocks[ `${food.x}-${food.y}`].classList.add("food"); // fills the food block when no chang ein food then the same will be filled again

    
    if(direction === "left"){
        head = {x: snake[0].x , y: snake[0].y-1}
    }else if(direction === "right"){
        head = {x: snake[0].x , y: snake[0].y+1}
    }else if(direction === "down"){
        head = {x: snake[0].x+1 , y: snake[0].y}
    }else if(direction === "up"){
        head = {x: snake[0].x-1 , y: snake[0].y}
    }


    if(head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols){
        // alert("Game over");
        clearInterval(intervalId);

        // restart menu / game over menu
        modal.style.display ="flex";
        startGameModal.style.display = "none";
        gameOverModal.style.display = "flex";

        return; // stop
    }

    // food score logic
    if(head.x== food.x && head.y ==food.y){
        // remove fill on the current food
        blocks[ `${food.x}-${food.y}`].classList.remove("food");
        food = {x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) };
        blocks[ `${food.x}-${food.y}`].classList.add("food");

        snake.unshift(head); // add another head at start 
        // head jood gaya ab jab fir jab sab cross ho jayenge us fod ke previous lement ko to show karne lagega
        // jab last segment is food ke block ko paar karega tacbhi new element/segmet aayega, kyuki ek jagah do baar (element ho jaayega to use pop karte time 2 element add honge same block ke liye ast mai popping mai , but hai ek hi saath overlapped fill so aisa lagega ki new element add hua hai last mai , ye last mai hoga kyuk tabhi last mai double fills pop honge )

        // score logic
        score += 10
        scoreElement.innerHTML = score;

        // local sorage in -> inspect -> applications -> Storage -> localstorage-> site link
        if( score > highScore){
            highScore = score
            localStorage.setItem("highScore", highScore.toString()); // coverted to string  // beacuse local storgae only saves value as string
        }

    }
    

    // clears fill
    snake.forEach(segment=>{
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
    })
   
    snake.unshift(head); // add one element at start
    snake.pop(); // remove last segment  // but fill not cleared
    
    snake.forEach(segment=>{ // each elements in snake array
        // console.log(segment);

        // console.log(blocks[`${segment.x}-${segment.y}`]);
        blocks[`${segment.x}-${segment.y}`].classList.add("fill");


    })
}






// every 300 second calclate render new postion using direction 
// intervalId = setInterval(() => {
//     let head = null;
    
//     if(direction === "left"){
//         head = {x: snake[0].x , y: snake[0].y-1}
//     }else if(direction === "right"){
//         head = {x: snake[0].x , y: snake[0].y+1}
//     }else if(direction === "down"){
//         head = {x: snake[0].x+1 , y: snake[0].y}
//     }else if(direction === "up"){
//         head = {x: snake[0].x-1 , y: snake[0].y}
//     }


//     if(head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols){
//         alert("Game over");
//         clearInterval(intervalId);
//     }
    
//     // clears fill
//     snake.forEach(segment=>{
//         blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
//     })
   
//     snake.unshift(head); // add one element at start
//     snake.pop(); // remove last segment  // but fill not cleared

//     render();
// }, 400); // 0.4 ms moving 



// intervalId = setInterval(() => {
//     render();
// }, 400); 



// time 
// time.split("-")
// (2) ['00', '00']
// const [m,s] = time.split("-") destructuring



startButton.addEventListener("click",()=>{
    modal.style.display = "none";
    intervalId = setInterval(() => { render(); }, 300);
    timerIntervalId = setInterval(() => {
        let[min,sec] = time.split("-").map(Number) // destructuring // map(Number) covert array to to number ( no string values)
        if(sec == 59){
            min += 1
            sec = 0
        }else{
            sec+=1
        }

        time =`${min}-${sec}`
        timeElement.innerHTML = time
    },1000 );
})

restartButton.addEventListener("click", restartGame);

function restartGame(){

    // clear older items 

    score = 0;
    time = `00-00`

    scoreElement.innerHTML = score;
    timeElement.innerHTML = time
    highScoreElement.innerHTML = highScore

    blocks[ `${food.x}-${food.y}`].classList.remove("food");
    snake.forEach(segment=>{
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
    })

    modal.style.display = "none";
    direction ="down";
    snake = [{x:1,y:3}];
    food = {x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) };
    intervalId = setInterval(() => { render(); }, 300);

}


/* ArrowUp
 ArrowRight
 ArrowLeft
 ArrowDown */
addEventListener("keydown",(event)=>{
    // console.log(event.key); 
    if(event.key === "ArrowUp"){
        direction = "up";
    }else if(event.key === "ArrowLeft"){
        direction = "left";
    }else if(event.key === "ArrowRight"){
        direction = "right";
    }else if(event.key === "ArrowDown"){
        direction = "down";
    }
})