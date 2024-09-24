const readline = require("readline");

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const array = [];

// Create an array with numbers 1 to 100
let i = 1;
while (array.length < 100) {
  array.push(i++);
}

// Define the number of attempts based on difficulty level
const attemptMap = {
  easy: 10,
  medium: 5,
  hard: 3,
};

let difficulty;
const target = Math.floor(Math.random() * 100) + 1; // Random target between 1 and 100

r1.question(
  "Enter your choice (1 for easy, 2 for medium, 3 for hard): ",
  (choice) => {
    switch (parseInt(choice)) {
      case 1:
        difficulty = attemptMap.easy;
        break;
      case 2:
        difficulty = attemptMap.medium;
        break;
      default:
        difficulty = attemptMap.hard;
        break;
    }

    let guess;
    let attemptsLeft = difficulty;

    const binarySearch = (left, right) => {
      if (left > right) {
        console.log("The number is not found in the range.");
        return false;
      }

      const mid = Math.floor((left + right) / 2);

      if (array[mid] === target) {
        console.log(`Found! The target number is ${target}.`);
        return true;
      } else if (array[mid] < target) {
        return binarySearch(mid + 1, right);
      } else {
        return binarySearch(left, mid - 1);
      }
    };

    const askGuess = () => {
      r1.question("Enter your guess: ", (guessInput) => {
        guess = parseInt(guessInput);

        if (guess === target) {
          console.log(`Congratulations! You guessed the number ${target}.`);
          r1.close();
          return;
        } else {
          attemptsLeft--;
          console.log(guess < target ? "Higher!" : "Lower!");

          if (attemptsLeft > 0) {
            console.log(`Attempts left: ${attemptsLeft}`);
            askGuess(); // Recursive call for next guess
          } else {
            console.log(`Out of attempts! The target was ${target}.`);
            r1.close();
          }
        }
      });
    };

    console.log(`You have chosen ${difficulty} attempts to guess the number.`);
    askGuess(); // Start asking for guesses
  }
);
