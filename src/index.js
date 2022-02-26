const readline = require('readline');
const fs = require('fs');

const {
  selectWord,
  scorePosition,
  scoreExist,
  printResult,
  printGreen,
  printYellow,
  printWhite,
  printRed
} = require('./utils');


const wordList = fs.readFileSync('./sgb-words.txt', 'utf8').split('\n');
const wordSet = new Set(wordList);

console.clear()
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let trial = 0;

const charCodeA = 'A'.charCodeAt();
const ATOZ = Object.fromEntries(Array.from({length:26}, (v, i) => ([String.fromCharCode(charCodeA+i), 0])));

const updateKeyboard = (guessLC, positionScore, existenceScore) => {
  const guessUpperCaseArr = guessLC.toUpperCase().split('');
  guessUpperCaseArr.forEach((gc, i) => {
    if (positionScore[i] === 1 && ATOZ[gc] !== 2) {
      ATOZ[gc] = 2
    }
    if (existenceScore[i] === 1 && ATOZ[gc] < 2) {
      ATOZ[gc] = 1
    }
    if (existenceScore[i] === 0 && positionScore[i] === 0 && ATOZ[gc] <= 0) {
      ATOZ[gc] = -1
    }
  })
}

const printKeyboard = () => {
  const keyboardStringArray = Object.keys(ATOZ).map(char => {
    const flag = ATOZ[char]
    if (flag === -1) return printRed(char)
    if (flag === 0) return printWhite(char)
    if (flag === 1) return printYellow(char)
    if (flag === 2) return printGreen(char)
  })
  keyboardStringArray.push('\x1b[0m');
  const keyboardString = keyboardStringArray.join('')
  console.log(keyboardString); //eslint-disable-line
}

const answer = selectWord(wordList)
const guesses = Array.from({length:5}, (x) => (Array.from({length:5}, (y) => ('⎽'))).join(''))
printKeyboard();
guesses.forEach(g => console.log(g))

rl.on('line', guess => {

  if (guess.length !== 5) {
    console.log('Guesses must be 5 characters long'); //eslint-disable-line
    return
  }
  const guessLC = guess.toLowerCase();

  if (!wordSet.has(guessLC)) {
    console.log('Word is not valid'); //eslint-disable-line
    return
  }

  const positionScore = scorePosition(answer, guessLC)
  const existenceScore = scoreExist(answer, guessLC, positionScore)
  guesses[trial] = printResult(guess, positionScore, existenceScore)

  updateKeyboard(guessLC, positionScore, existenceScore)

  console.clear();
  printKeyboard();
  guesses.forEach(g => console.log(g))

  if (!positionScore.some(sc => (sc === 0))) {
    console.log('\x1b[32mWell Done!', '\x1b[37m '); //eslint-disable-line
    rl.close();
  }

  trial++;
  if (trial === 10) {
    console.log('\x1b[31mGame Over!'); //eslint-disable-line
    console.log('\x1b[40m\x1b[0mAnswer is:\x1b[32m', answer.toUpperCase(), '\x1b[37m '); //eslint-disable-line
    rl.close();
  }
})
