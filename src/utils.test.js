const { selectWord, toCharCountMap, scorePosition, scoreExist, printResult } = require('./utils');

describe('utils', () => {
  it('should pick a random word from an array of words', () => {
    const wordList = [
      'which',
      'there',
      'their',
      'about',
      'would',
      'these',
      'other',
      'words',
      'could',
      'write',
    ]
    const selectedWord = selectWord(wordList)
    expect(wordList.find(w => (w === selectedWord))).toBeDefined()
  });

  it('should return a map of characters and number of times it appeared ', () => {
    const word1 = 'apple';
    const word2 = 'brown';

    expect(toCharCountMap(word1)).toEqual({'a': 1, 'p': 2, 'l': 1, 'e': 1})
    expect(toCharCountMap(word2)).toEqual({'b': 1, 'r': 1, 'o': 1, 'w': 1, 'n': 1})

  });


  it('should score by position, 1 for correct and 0 otherwise', () => {
    const givenWord = 'crown'

    expect(scorePosition(givenWord, 'crown')).toEqual([1, 1, 1, 1, 1]);
    expect(scorePosition(givenWord, 'brown')).toEqual([0, 1, 1, 1, 1]);
    expect(scorePosition(givenWord, 'paper')).toEqual([0, 0, 0, 0, 0]);
    expect(scorePosition(givenWord, 'known')).toEqual([0, 0, 1, 1, 1]);
  });

  it('should score by existence, 1 for exist and 0 otherwise', () => {

    expect(scoreExist('apple', 'amber', [1, 0, 0, 0, 0])).toEqual([0, 0, 0, 1, 0]);
    expect(scoreExist('crown', 'known', [0, 0, 1, 1, 1])).toEqual([0, 0, 0, 0, 0]);
    expect(scoreExist('known', 'crown', [0, 0, 1, 1, 1])).toEqual([0, 0, 0, 0, 0]);
  });

  it('should print result with colour code', () => {
    expect(printResult('amber', [1, 0, 0, 0, 0], [0, 0, 0, 1, 0]))
      .toBe('\x1b[32mA\x1b[37mM\x1b[37mB\x1b[33mE\x1b[37mR')
  });
});
