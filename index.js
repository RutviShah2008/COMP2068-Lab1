const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin, // Similar to Request in Node
  output: process.stdout // Similar to response in Node
});
const validOptions = ['rock', 'paper', 'scissors'];

const generateChoice = () => {
  const index = Math.floor(Math.random() * Math.floor(3));
  return validOptions[index];
};

// Convert ReadLine.Question into a promise
const question = str => new Promise(resolve => rl.question(str, resolve));

// Keep asking for user choice until it is valid
const getUserChoice = async () => {
  let currentChoice = null;
  const ourQuestion = `Please choose one of the following:
  Rock
  Paper
  Scissors
  `;

  while (!validOptions.includes(currentChoice)) {
    currentChoice = await question(ourQuestion);
  }

  return currentChoice;
};

// Call our ASYNC function and then return their choice
getUserChoice().then(choice => {
  // Generate computer choice
  const computer = generateChoice();

  // Winning Conditions
  // First is Tie
  if (choice === computer) {
    console.log('There was a tie');
  } else if (
    // User winning conditions
    (choice === 'rock' && computer === 'scissors') ||
    (choice === 'scissors' && computer === 'paper') ||
    (choice === 'paper' && computer === 'rock')
  ) {
    console.log('Player won');
  } else {
    
    // Else computer won
    console.log('Computer won');
  }

  console.log(`Player chose: ${choice}
        Computer chose: ${computer}`);
});