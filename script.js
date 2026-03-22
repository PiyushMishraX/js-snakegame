const board = document.querySelector('.board');
const blockHeight = 80;
const blockWidth = 80;

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


const blocks =[] // because canot create 2D array directly in js so change 1d to 2d at run time // it mimics 2d array


for(let row =0; row <rows; row++){
    for (let col = 0; col < cols; col++) {
        const block = document.createElement('div');
        block.classList.add("block");
        board.appendChild(block);
        // block.innerHTML = `${row}-${col}` ; // cordinates
        // we need to do this same in js ( we use 2d array - digital ocean )
        blocks[`${row}-${col}`] = block 
    }
}

