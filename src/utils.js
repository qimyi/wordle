const selectWord = (wordList) => {
  return wordList[Math.floor(Math.random() * wordList.length)];
}

const toCharCountMap = (word) => {
  const charCountMap = {};
  word.split('').forEach((c, i) => {
    charCountMap[c] ? charCountMap[c]++ : charCountMap[c] = 1
  });
  return charCountMap;
}


const scorePosition = (answer, guess) => {
  return answer.split('').map((c, i) => (guess[i] === c ? 1 : 0))
}

const scoreExist = (answer, guess, positionScore) => {
  const answerCharMap = toCharCountMap(answer);
  positionScore.forEach((s, i) => {
   if (s === 1) {
     answerCharMap[answer[i]]--
   }
  })
  return guess.split('').map((gc, i) => {
    if (positionScore[i] === 1) {
      // only check where position score is 0
      return 0
    }
    if (answerCharMap[gc] > 0) {
      answerCharMap[gc]--
      return 1
    }
    return 0
  })
}

const printGreen = (s) => {
  return '\x1b[32m' + s
}

const printYellow = (s) => {
  return '\x1b[33m' + s
}

const printWhite = (s) => {
  return '\x1b[37m' + s
}

const printResult = (guess, positionScore, existenceScore) => {

  const resultStringArray = guess.toUpperCase().split('')
    .map((gc, i) => {
      if (positionScore[i] === 1) {
        return printGreen(gc)
      } else if (existenceScore[i] === 1) {
        return printYellow(gc)
      }
      return printWhite(gc)
    })

  const resultString = resultStringArray.join('')

  console.log(resultString); //eslint-disable-line
  return resultString
}

module.exports = {
  selectWord,
  toCharCountMap,
  scorePosition,
  scoreExist,
  printGreen,
  printYellow,
  printResult
}
