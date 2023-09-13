let selectedGuess = null;
let numberOfTries = 0;

const guessButtons = document.querySelectorAll(".guess-button");
const confirmButton = document.getElementById("confirmButton");
const tryAgainButton = document.getElementById("tryAgainButton");
const resultMessage = document.getElementById("resultMessage");
const highScoreDisplay = document.getElementById("highScore");
const topScoreElements = [
    document.getElementById("topScore1"),
    document.getElementById("topScore2"),
    document.getElementById("topScore3")
];

// Function to generate a new random number
function generateRandomNumber() {
    return Math.floor(Math.random() * 10) + 1;
}

let randomNumber = generateRandomNumber(); // Initialize random number
let highScore = 0; // Initialize current high score
let highScores = [0, 0, 0]; // Initialize top 3 high scores

// Add event listeners to the guess buttons
guessButtons.forEach(button => {
    button.addEventListener("click", () => {
        guessButtons.forEach(btn => btn.classList.remove("selected"));
        button.classList.add("selected");
        selectedGuess = parseInt(button.textContent);
        confirmButton.disabled = false;
    });
});

// Add event listener to the confirm button
confirmButton.addEventListener("click", () => {
    if (selectedGuess === randomNumber) {
        numberOfTries++;
        resultMessage.textContent = `Congratulations! You guessed the number ${randomNumber} in ${numberOfTries} ${numberOfTries === 1 ? 'try' : 'tries'}.`;
        tryAgainButton.disabled = false; // Enable the Try Again button
        confirmButton.disabled = true; // Disable the Confirm button

        // Update high score
        if (numberOfTries < highScore || highScore === 0) {
            highScore = numberOfTries;
            highScoreDisplay.textContent = highScore;
        }

        // Update and display top high scores
        updateHighScores(numberOfTries);
        displayTopHighScores();
    } else {
        numberOfTries++;
        resultMessage.textContent = `Try again. This is attempt ${numberOfTries}.`;
        tryAgainButton.disabled = false; // Enable the Try Again button
    }
});

// Add event listener to the Try Again button
tryAgainButton.addEventListener("click", () => {
    resetGame();
    resultMessage.textContent = ""; // Clear the result message
    tryAgainButton.disabled = true;
});

// Function to reset the game state
function resetGame() {
    guessButtons.forEach(button => {
        button.classList.remove("selected");
    });
    confirmButton.disabled = true;
    selectedGuess = null;
    numberOfTries = 0; // Reset the attempt number
    randomNumber = generateRandomNumber(); // Generate a new random number
}

// Reset High Score button
const resetHighScoreButton = document.getElementById("resetHighScore");

resetHighScoreButton.addEventListener("click", () => {
    highScore = 0;
    highScoreDisplay.textContent = highScore;
});

// Update high scores
function updateHighScores(score) {
    highScores.push(score);
    highScores.sort((a, b) => b - a); // Sort in descending order
    highScores = highScores.slice(0, 3); // Keep only top 3 scores
}

function displayTopHighScores() {
    for (let i = 0; i < 3; i++) {
        topScoreElements[i].textContent = highScores[i];
    }
}

