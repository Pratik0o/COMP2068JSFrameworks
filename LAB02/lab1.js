// Import the prompt library
const prompt = require('prompt');

// Start the prompt
prompt.start();

// Ask the user for their choice
prompt.get(['userSelection'], function (err, result) {
    if (err) {
        console.log(err);
        return;
    }

    // Store user input and make it uppercase for consistency
    let userSelection = result.userSelection.toUpperCase();

    // Generate computer choice using Math.random
    let randomNum = Math.random();
    let computerSelection = "";

    if (randomNum <= 0.34) {
        computerSelection = "PAPER";
    } else if (randomNum <= 0.67) {
        computerSelection = "SCISSORS";
    } else {
        computerSelection = "ROCK";
    }

    // Show both choices
    console.log("User chose: " + userSelection);
    console.log("Computer chose: " + computerSelection);

    // Determine winner
    if (userSelection === computerSelection) {
        console.log("It's a tie!");
    } else if (
        (userSelection === "ROCK" && computerSelection === "SCISSORS") ||
        (userSelection === "PAPER" && computerSelection === "ROCK") ||
        (userSelection === "SCISSORS" && computerSelection === "PAPER")
    ) {
        console.log("User Wins!");
    } else {
        console.log("Computer Wins!");
    }
});
