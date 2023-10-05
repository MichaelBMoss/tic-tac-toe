//variables to be manipulated

const gameData = {
    tl: 'blank',
    tm: 'blank',
    tr: 'blank',
    ml: 'blank',
    mm: 'blank',
    mr: 'blank',
    bl: 'blank',
    bm: 'blank',
    br: 'blank',
}

let turn;
let turnCount;

//variables that represent elements

let winner = document.getElementById('winner');
let gameBoardEl = document.getElementById('gameboard');
let instructions = document.getElementById('instructions');

//functions

//initialize the app

function initialize() {
    for (let property in gameData) {
        gameData[property] = 'blank';
    };
    turn = 'X'
    turnCount = 0;
    write(winner, '')
    gameBoardEl.classList.add('pointer');
    let gameSquares = document.querySelectorAll('.game-square');
    for (let gameSquare of gameSquares) {
        gameSquare.innerText = '';
    };
    write(instructions, 'X goes first. Click a square to begin!')
    turnCount = 0;
};

//general shortcut functions. For dryness.

function write(location, content) {
    location.innerText = content;
};

function closeBoard() {
    for (let property in gameData) {
        gameData[property] = 'closed';
    };
};

//handle user interaction

//clicks on the board

gameBoardEl.addEventListener('click', function(getGameBoardInfo) {
    //get the square that was clicked on
    let clickedSquare = getGameBoardInfo.target;
    //user can only interact with empty squares
    //If the clicked square is empty, proceed
    let clickedSquareId = clickedSquare.id;
    if (gameData[clickedSquareId] == 'blank') {
        runGame(clickedSquare);
    };
});

function runGame(clickedSquare) {
    write(clickedSquare, turn);
    updateGameData(clickedSquare);
    evaluateBoard();
};    

//update board data to be able to evaluate for win or tie
function updateGameData(clickedSquare) {
    let clickedSquareId = clickedSquare.id;
    gameData[clickedSquareId] = turn;
};

function evaluateBoard() {
    if (
      (gameData.tl === turn && gameData.tm === turn && gameData.tr === turn) ||
      (gameData.ml === turn && gameData.mm === turn && gameData.mr === turn) ||
      (gameData.bl === turn && gameData.bm === turn && gameData.br === turn) ||
      (gameData.tl === turn && gameData.ml === turn && gameData.bl === turn) ||
      (gameData.tm === turn && gameData.mm === turn && gameData.bm === turn) ||
      (gameData.tr === turn && gameData.mr === turn && gameData.br === turn) ||
      (gameData.tl === turn && gameData.mm === turn && gameData.br === turn) ||
      (gameData.tr === turn && gameData.mm === turn && gameData.bl === turn)
    ) {
      win();
      return;
    }
    nextTurn(); 
    tie();
}

function tie() {
    if (turnCount == 9) {
        closeBoard();
        write(winner, "Cat's Game!") 
    };
};  
  
function nextTurn() {
    if (turn === 'X') {
        turn = 'O';
    } else if (turn === 'O') {
        turn = 'X';
    }    
   write(instructions, `It's ${turn}'s turn`);
    turnCount++;
}

function win() {
    closeBoard();
    write(winner, `${turn} Wins!`)
    gameBoardEl.classList.remove('pointer');
};

//start over button rets by intializing
document.getElementById("start-over").onclick = function() {
    initialize();
};

initialize();
