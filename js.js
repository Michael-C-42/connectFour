const grid = document.querySelector('.grid');
const arrows = document.querySelector('.arrow');
const height = 6;
const width = 7;

let currentPlayer = 1;
let board = [];

//Create the gameboard, will have height and width inputs available to edit
const makeBoard = () =>  {
    //create the rows in the table
    for(let y=0;y<height;y++){
        let row = document.createElement('tr');
        row.classList.add('row');
        grid.appendChild(row);
        //create JS board
        board.push(Array.from({length: width}));
        //add slots to each row
        for(let x=0;x<width;x++){
            let slot = document.createElement('td');
            slot.classList.add('slot');
            slot.setAttribute('id', `${y}-${x}`);
            row.appendChild(slot);
        };
    };
};

//Function to drop the right color piece to the right spot
const placeInTable = (y,x) => {
    //create circle piece
    const piece = document.createElement('div');
    piece.classList.add('piece');
    //add the correct player class
    piece.classList.add(`p${currentPlayer}`);
    //find the right td and append
    const spot = document.getElementById(`${y}-${x}`);
    spot.appendChild(piece);
};

//Function to find the right y position using the td id
const findSpotForCol = (x) => {
    for(let y = height -1;y>=0;y--){
        //if undefined return y, if true return null
        if(!board[y][x]) {
            return y;
        }
    }
    return null;
};


//Mouse events for drop row
//Trigger events on click
arrows.addEventListener('click', (e)=>{
    //get drop td id
    const x = e.target.getAttribute('id');
    const y = findSpotForCol(x);
    //return function if no more space in column available
    if(y === null){
        return;
    };

    //fill array with current player 1 || 2
    board[y][x] = currentPlayer;
    placeInTable(y,x);
    //check if win
    if (checkForWin()) {
        alert(`Player ${currentPlayer} won!`);
    };
    //check if tie
    if (board.every(row => row.every(cell => cell))) {
        alert('Match is a draw!');
    };
    //switch current player after piece drop and game over checks
    currentPlayer = currentPlayer === 1 ? 2: 1;
});
//mouse over player indicator
arrows.addEventListener('mouseover', (e)=> {
    e.target.classList.add('hover', `p${currentPlayer}`);
});
//mouse move player indicator 
arrows.addEventListener('mousemove', (e)=> {
    e.target.classList.toggle('hover', `p${currentPlayer}`);
});
//mouse out to remove player indicator
arrows.addEventListener('mouseout', (e)=> {
    e.target.classList.remove('hover', 'p1', 'p2');
});

//Function to check for win
const checkForWin = ()=>{
    function win(cells) {
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer
  
      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < height &&
          x >= 0 &&
          x < width &&
          board[y][x] === currentPlayer
      );
    };
  
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // get "check list" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
  
        // find winner (only checking each win-possibility as needed)
        if (win(horiz) || win(vert) || win(diagDR) || win(diagDL)) {
          return true;
        };
      };
    };
};


{/* <div>
<button id="reset" onclick="resetBoard()">Reset Game</button>
</div> */}
// const resetBoard = () => {

// }

makeBoard();
