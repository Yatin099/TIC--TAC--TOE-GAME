const board = document.getElementById('board');
const resetButton = document.getElementById('reset');
const newGameButton = document.getElementById('new-game');
const resultMessage = document.getElementById('result-message');
const gameResult = document.getElementById('game-result');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];


function createBoard() {
  board.innerHTML = '';
  gameState.forEach((cell, index) => {
    const cellDiv = document.createElement('div');
    cellDiv.classList.add('cell');
    cellDiv.setAttribute('data-index', index);
    cellDiv.textContent = cell;
    cellDiv.addEventListener('click', handleCellClick);
    board.appendChild(cellDiv);
  });
}


function handleCellClick(event) {
  const index = event.target.getAttribute('data-index');
  
  if (gameState[index] !== '' || !gameActive) return;

  gameState[index] = currentPlayer;
  event.target.textContent = currentPlayer;
  checkWinner();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}


function checkWinner() {
  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      gameActive = false;
      displayResult(`${gameState[a]} wins!`);
      return;
    }
  }

  if (!gameState.includes('')) {
    gameActive = false;
    displayResult('It\'s a tie!');
  }
}


function displayResult(message) {
  resultMessage.textContent = message;
  gameResult.style.display = 'block';
}


function resetGame() {
  gameState = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  createBoard();
  gameResult.style.display = 'none';
}


resetButton.addEventListener('click', resetGame);


newGameButton.addEventListener('click', resetGame);

createBoard();
