// audio tag
const audio = document.getElementById("audio");

// Definir la función para reproducir el audio
function playAudio() {
    audio.play().then(() => {
        console.log("Audio is playing");
    }).catch(error => {
        console.error("Error playing audio:", error);
    });

    // Eliminar el event listener después del primer clic
    document.removeEventListener("click", playAudio);
}

// Añadir el event listener para hacer clic en cualquier parte de la página
document.addEventListener("click", playAudio);

// Reproducción en cadena de las siguientes pistas
audio.addEventListener("ended", playNext);

function playNext() {
    if (audio.src.includes("bb-lean-interlude.mp3")) {
        audio.src = "audios/drake.mp3";
        audio.play();
    } else if (audio.src.includes("drake.mp3")) {
        audio.src = "audios/trabis.mp3";
        audio.play();
        audio.removeEventListener("ended", playNext); // Opcional si no hay más audios
    }
}

// vairables
let board = ["", "", "", "", "", "", "", "", ""];
let playerTurn = "X"; // X goes first
let isGameActive = true; // game is active
let startTime = null; // start time
let timerInterval; // timer interval

// combinations for winning
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cells = document.querySelectorAll(".cell");
const statusDisplay = document.getElementById("status");
const resetBtn = document.getElementById("reset-btn");
const bestTimesList = document.getElementById("best-times");

resetGame();
displayBestTimes();

// cell click event listener
cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const index = cell.getAttribute("data-index");
        if (isGameActive && board[index] === "") {
            handlePlayerMove(index);
        }
    });
});

// reset button event listener
resetBtn.addEventListener("click", resetGame);

// handle player's move
function handlePlayerMove(index) {
    playerTurn = "X";
    board[index] = playerTurn;
    renderBoard();
    if (startTime === null) {
        startTime = new Date();
        timerInterval = setInterval(updateTimer, 1);
    }
    if (checkWin()) {
        endGame("Player");
    } else if (board.includes("")) {
        handleComputerMove();
    } else {
        endGame("Draw");
    }
}

// handle computer's random move
function handleComputerMove() {
    let availableIndexes = board
        .map((cell, index) => (cell === "" ? index : null))
        .filter(index => index !== null);
    let randomIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
    board[randomIndex] = "O";
    playerTurn = "O";
    renderBoard();
    if (checkWin()) {
        endGame("Computer");
    } else if (!board.includes("")) {
        endGame("Draw");
    }
}

// render the board
function renderBoard() {
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
    });
}

// check if there's a winner
function checkWin() {
    return winningCombinations.some(combination =>
        combination.every(index => board[index] === playerTurn)
    );
}

// end the game
function endGame(winner) {
    isGameActive = false;
    clearInterval(timerInterval);
    if (winner === "Player") {
        statusDisplay.textContent = "You win!";
        const timeElapsed = ((new Date() - startTime) / 1000).toFixed(3);
        saveBestTime(timeElapsed);
    } else if (winner === "Computer") {
        statusDisplay.textContent = "Computer wins!";
    } else {
        statusDisplay.textContent = "It's a draw!";
    }
    displayBestTimes();
}

// save the best time to localStorage
function saveBestTime(time) {
    let playerName = prompt("Winna, ur name here:");
    if (playerName) {
        let bestTimes = JSON.parse(localStorage.getItem("bestTimes")) || [];
        bestTimes.push({ name: playerName, time });
        bestTimes.sort((a, b) => a.time - b.time);
        bestTimes = bestTimes.slice(0, 10); //top 10
        localStorage.setItem("bestTimes", JSON.stringify(bestTimes));
    }
}

// liar of the best times
function displayBestTimes() {
    const bestTimes = JSON.parse(localStorage.getItem("bestTimes")) || [];
    bestTimesList.innerHTML = bestTimes
        .map(entry => `<li>${entry.name} - ${entry.time}s</li>`)
        .join("");
}

// reset the game
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    playerTurn = "X";
    isGameActive = true;
    startTime = null;
    clearInterval(timerInterval);
    statusDisplay.textContent = "Player's Turn";
    renderBoard();
}

// update the timer
function updateTimer() {
    // time
    const timeElapsed = ((new Date() - startTime) / 1000).toFixed(3);
    statusDisplay.textContent = `Player's Turn - Time: ${timeElapsed}s`;
}