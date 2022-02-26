const fs = require('fs');

const wordList = fs.readFileSync('sgb-words.txt', 'utf8').split('\n');
const wordSet = new Set(wordList);
// console.log(wordList)

console.time('finding from Array');

const result = wordList.find((w) => (w === 'apple'));
console.log(result);

console.timeEnd('finding from Array');



console.time('finding from Set');

const resultSet = wordSet.has('apple');
console.log(resultSet);

console.timeEnd('finding from Set');
