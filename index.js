const readline = require('readline');

const validOptions = ['rock', 'paper', 'scissors'];
const playAgainOptions = ['y','n'];
const stats = {"Win":0,"Lose":0,"Tie":0,"UserScore": 0};

const rl = readline.createInterface({
  input: process.stdin, // Similar to Request in Node
  output: process.stdout // Similar to response in Node
}).on('line', userChoise);

const rockPaperScissors = () =>
{
  console.log(`Please choose one of the following:
    Rock
    Paper
    Scissors\n\t\t`);
};

function userChoise(input)
{
  const userResponse = input.trim().toLowerCase();

  if(validOptions.includes(userResponse))
  {
    const computerChoice = generateChoice();

    if(userResponse == computerChoice)
    {
      console.log('There was a tie');
      stats.Tie +=1;  
      console.log(`Player chose: ${userResponse}
                   Computer chose: ${computerChoice}`);  
      rockPaperScissors();
    }
    else if (
          // User winning conditions
          (userResponse === 'rock' && computerChoice === 'scissors') ||
          (userResponse === 'scissors' && computerChoice === 'paper') ||
          (userResponse === 'paper' && computerChoice === 'rock')
        ) 
    {
      console.log('Player won');
      stats.Win +=1;
      stats.UserScore+=5;  
      console.log(`Player chose: ${userResponse}
      Computer chose: ${computerChoice}`);    
      playAgain();
    }
    else
    {
      console.log('Player Lose');
      console.log(`Player chose: ${userResponse}
      Computer chose: ${computerChoice}`); 
      stats.Lose+=1;
      playAgain();
    }
  }
  else{
    console.log(`Please enter correct choice`);
    rockPaperScissors();
  }
    
};

const playAgain = () => 
{
  rl.question(`Would you like to continue : [Y/N]?`,
  userAnswer => 
  {
    const userInput = userAnswer.trim().toLowerCase();
    if(playAgainOptions.includes(userAnswer))
    {
      if(userInput == "y")
      {
        rockPaperScissors();
      }
      else{
        report();
        rl.close();
      }
    }
    else{
      console.log(`please choose correct option by writing Yes and No`);
      playAgain();
    }
  });
};

const generateChoice = () => 
{
  const index = Math.floor(Math.random() * Math.floor(3));
  return validOptions[index];
};

const report = () =>
{
  process.stdout.write(`\nPlayer ScoreCard: Win:${stats.Win}
                  Lose:${stats.Lose}
                  Tie:${stats.Tie}
                  Score:${stats.UserScore}`);
};

rockPaperScissors();
