const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');
const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');

let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = true;
let scoreX = 0;
let scoreO = 0;

function createBoard() {
    boardElement.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        if (cell) {
            cellElement.classList.add('taken');
            cellElement.textContent = cell;
        }
        cellElement.addEventListener('click', () => handleCellClick(index));
        boardElement.appendChild(cellElement);
    });
}

function handleCellClick(index) {
    if (board[index] || !gameActive) return;

    const cells = document.querySelectorAll('.cell');
    const cellElement = cells[index];
    cellElement.style.color = 'black'; // Temporary black color

    board[index] = currentPlayer;
    createBoard();
    checkWinner();

    // Delay color change and glow application
    setTimeout(() => {
        if (currentPlayer === 'X') {
            cellElement.classList.add('x-cell');
        } else {
            cellElement.classList.add('o-cell');
        }
    }, 200);

    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        messageElement.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            messageElement.textContent = `Player ${board[a]} wins!`;

            const cells = document.querySelectorAll('.cell');
            [a, b, c].forEach(index => {
                if (board[a] === 'X') {
                    cells[index].classList.add('x-glow');
                } else {
                    cells[index].classList.add('o-glow');
                }
            });

            if (board[a] === 'X') {
                scoreX++;
                scoreXElement.textContent = scoreX;
            } else {
                scoreO++;
                scoreOElement.textContent = scoreO;
            }
            return;
        }
    }

    if (!board.includes(null)) {
        gameActive = false;
        messageElement.textContent = 'It\'s a draw!';
    }
}

function restartGame() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    gameActive = true;
    messageElement.textContent = 'Player X\'s turn';
    createBoard();
}

function clearScores() {
    scoreX = 0;
    scoreO = 0;
    scoreXElement.textContent = scoreX;
    scoreOElement.textContent = scoreO;
}

createBoard();
messageElement.textContent = 'Player X\'s turn';
