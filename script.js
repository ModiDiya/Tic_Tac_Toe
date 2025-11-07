let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const popup = document.getElementById("popup");
const winnerText = document.getElementById("winner-text");
const winnerIcon = document.getElementById("winner-icon"); // Added icon element

const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// Handle Cell Click
cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const index = cell.getAttribute("data-index");
        if (board[index] === "" && gameActive) {
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;
            checkWinner();
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusText.textContent = `Player ${currentPlayer}'s Turn`;
        }
    });
});

// Check for Winner
function checkWinner() {
    for (let combo of winningCombos) {
        let [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            showPopup(`Player ${board[a]} Wins! 🏆`);
            return;
        }
    }
    if (!board.includes("")) {
        gameActive = false;
        showPopup("It's a Draw! 🤝");
    }
}

// Show Winner Popup with Icon
function showPopup(message) {
    winnerText.innerHTML = message;
    popup.style.display = "block";
}

// Close Popup and Restart Game
function closePopup() {
    popup.style.display = "none";
    restartGame();
}

// Restart Game
function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.textContent = "");
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Player X's Turn";
}
