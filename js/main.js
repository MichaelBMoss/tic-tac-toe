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

let turn = 'X'
let winner = document.getElementById('winner')
let gameBoardEl = document.getElementById('gameboard');
let instructions = document.getElementById('instructions');

gameBoardEl.addEventListener('click', function(gameBoardInfo) {
    let clickedSquare = gameBoardInfo.target;
    handleClick(clickedSquare);
});

function handleClick(clickedSquare) {
    let clickedSquareId = clickedSquare.id;
    if (gameData[clickedSquareId] == 'blank') {
        runGame(clickedSquare);
    };
};

function runGame(clickedSquare) {
    updateDisplay(clickedSquare);
    updateGameData(clickedSquare);
    evaluateBoard();
};    

function updateDisplay(clickedSquare) {
    clickedSquare.innerText = turn;
};

function updateGameData(clickedSquare) {
    let clickedSquareId = clickedSquare.id;
    gameData[clickedSquareId] = turn;
    console.log(gameData);
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
    if (turn === 'X') {
        turn = 'O'
    } else if (turn === 'O') {
        turn = 'X'
    }    
    instructions.innerText = `It's ${turn}'s turn`;
  }
  
function win() {
    console.log('win');
    for (let property in gameData) {
        gameData[property] = 'finished';
    let winnerText = `${turn} Wins!`
        writeWinner(winnerText);
        gameBoardEl.classList.remove('pointer');
    };
}

function writeWinner(winnerSpanContent) {
    winner.innerText = winnerSpanContent;
};


document.getElementById("start-over").onclick = function() {
    for (let property in gameData) {
        gameData[property] = 'blank';
    };
    turn = 'X'
    writeWinner('');
    gameBoardEl.classList.add('pointer');
    let gameSquares = document.querySelectorAll('.game-square');
    console.log(gameSquares)
    for (let gameSquare of gameSquares) {
        gameSquare.innerText = '';
    };
    instructions.innerText = 'X goes first. Click a square to begin!'
};