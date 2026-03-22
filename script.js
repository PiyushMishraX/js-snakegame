const board = document.querySelector('.board');
const blockHeight = 50;
const blockWidth = 50;

// Math.floor(boardWidht / block width) = number of blocks fitting

const cols = Math.floor(board.clientWidth /blockWidth);
const rows = Math.floor(board.clientHeight /blockHeight);



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
const snake = [{
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
    
    snake.forEach(segment=>{ // each elements in snake array
        // console.log(segment);

        // console.log(blocks[`${segment.x}-${segment.y}`]);
        blocks[`${segment.x}-${segment.y}`].classList.add("fill");

    })
}



// every 300 second calclate render new postion using direction 
setInterval(() => {
    let head = null;
    
    if(direction === "left"){
        head = {x: snake[0].x , y: snake[0].y-1}
    }else if(direction === "right"){
        head = {x: snake[0].x , y: snake[0].y+1}
    }else if(direction === "down"){
        head = {x: snake[0].x+1 , y: snake[0].y}
    }else if(direction === "up"){
        head = {x: snake[0].x-1 , y: snake[0].y}
    }

    
    // clears fill
    snake.forEach(segment=>{
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
    })
   
    snake.unshift(head); // add one element at start
    snake.pop(); // remove last segment  // but fill not cleared

    render();
}, 400); // 0.4 ms moving 


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