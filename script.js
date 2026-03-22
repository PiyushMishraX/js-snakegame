const board = document.querySelector('.board');
const blockHeight = 30;
const blockWidth = 30;

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



for(let row =0; row <rows; row++){
    for (let col = 0; col < cols; col++) {
        const block = document.createElement('div');
        block.classList.add("block");
        board.appendChild(block);
    }
}
