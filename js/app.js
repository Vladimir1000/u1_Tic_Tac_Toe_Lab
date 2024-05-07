/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];



/*---------------------------- Variables (state) ----------------------------*/

let board;
let turn;
let winner;
let tie;



/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.getElementById('message');
const resetBtnEl = document.getElementById('reset');



/*-------------------------------- Functions --------------------------------*/

function init() {
  board = ['', '', '', '', '', '', '', '', ''];
  turn = 'X';
  winner = false;
  tie = false;
  render();
};

init();

function render() {
  updateBoard();
  updateMessage();
};

function updateBoard() {
  board.forEach((value, index) => {
    const square = squareEls[index];
    square.innerHTML = value;
  });
}


function updateMessage() {
  if (!winner && !tie) {
    messageEl.textContent = `Player ${turn}'s turn`;
  } else if (!winner && tie) {
    messageEl.textContent = "It's a tie!";
  } else {
    messageEl.textContent = `Player ${winner} wins!`;
  }
}

function handleClick(event) {
  const squareIndex = parseInt(event.target.id);
  placePiece(squareIndex);
  checkForWinner();
  checkForTie();
  switchPlayerTurn();
  render();
  checkForGameEnd();
}


function placePiece(index) {
  board[index] = turn;
}

// 6.2 - checkForWinner()
function checkForWinner() {
  // Iterate through each winning combination
  for (let i = 0; i < winningCombos.length; i++) {
    const [a, b, c] = winningCombos[i];
    // Check if the first position is not an empty string and if it matches the value in the second and third positions
    if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
      // If all conditions are met, set the winner and return
      winner = board[a];
      return;
    }
  }
}

// Function to check if the game has ended
function checkForGameEnd() {


  // If someone wins or the game is tie end game
  if (winner || tie) {

    // Call a function to end the game
    // endGame();
  }
}

// function endGame() {
//   // Disable all squares
//   squareEls.forEach(square => {
//     square.removeEventListener('click', handleClick);
//   });
// }



// 6.3 - checkForTie()
function checkForTie() {
  // Check if there is a winner
  if (winner) return;

  // Check if there are any empty squares left
  tie = !board.some(square => square === '');

  // If there are no empty squares left and there is no winner, it's a tie
}



// 6.4 - switchPlayerTurn()
function switchPlayerTurn() {
  // If there is a winner, return
  if (winner) return;

  // Switch the turn
  if (turn === 'X') {
    turn = 'O';
  } else {
    turn = 'X';
  }

}


function resetGame() {
  init();
}



/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach(square => square.addEventListener('click', handleClick));


resetBtnEl.addEventListener('click', resetGame);

