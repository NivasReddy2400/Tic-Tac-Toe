const statusDisplay = document.querySelector('.game--status');
const restart = document.querySelector('#game--restart');
const cells = document.querySelectorAll('.cell');

let gameActive = true;

let currentPlayer = 'X';

let gameState = ['','','','','','','','','',];

const winningConditions = [
    [0 ,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const winningMessage = () => `player ${currentPlayer} has won!`;
const drawMessage = () => `game ended in draw!`;
const currentPlayerTurn = () =>`It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

function handleCellPlayed(clickedCell,cellIndex){
    gameState[cellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;    
}
function handlePlayerChange(){
    currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
    statusDisplay.innerHTML = currentPlayerTurn();
}
function handleResultValidation(){
    let roundWon = false;
    for(let i = 0; i < winningConditions.length; i++){
        const winningCondition = winningConditions[i];
        let a = gameState[winningCondition[0]];
        let b = gameState[winningCondition[1]];
        let c = gameState[winningCondition[2]];

        if(a == '' || b == '' || c == ''){
            continue;
        }
        if(a == b && b == c){
            roundWon = true;
            break;
        }
    }
    if(roundWon){
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
    let roundDraw = !gameState.includes('');
    if(roundDraw){
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    handlePlayerChange();

}

function handleCellClicK(e){
    const clickedCell = e.target;
    const cellIndex = parseInt(clickedCell.id);
    console.log(gameState[cellIndex]);
   
    if(gameState[cellIndex] !== '' || !gameActive){
        return ;
    }

    handleCellPlayed(clickedCell,cellIndex);
    handleResultValidation();

    
}
function handleRestartGame(){
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['','','','','','','','',''];
    statusDisplay.innerHTML = currentPlayerTurn();
    cells.forEach(cell => cell.innerHTML = '');
}

restart.addEventListener('click',handleRestartGame);
cells.forEach(cell => cell.addEventListener('click',handleCellClicK));