import { SaltongMode, LetterStatus, LetterData } from './types';

export const getModeFromWord = (word: string): SaltongMode => {
  if (!/^[a-zA-Z]+$/.test(word)) {
    throw new Error('Invalid word. Use only letters.');
  }

  switch (word.length) {
    case 4:
      return 'mini';
    case 5:
      return 'main';
    case 7:
      return 'max';
  }

  throw new Error(
    'Invalid word. Must be 4 letters for Saltong Mini, 5 for Saltong, and 7 for Saltong Max'
  );
};

export const solveWord = (word: string, solution: string): LetterData[] => {
  const splitAnswer = word.toLowerCase().split('');

  let result: LetterData[] = splitAnswer.map((letter) => [
    letter,
    'wrong' as LetterStatus,
  ]);

  let checklist = solution
    .toLowerCase()
    .split('')
    .map((letter) => [letter, false]);

  result = result.map(([rLetter, rStatus], i) => {
    if (rLetter === checklist[i][0] && !checklist[i][1]) {
      checklist = Object.assign([], checklist, {
        [i]: [checklist[i], true],
      });
      return [rLetter, 'correct'];
    }

    return [rLetter, rStatus];
  });

  result = result.map(([rLetter, rStatus]) => {
    if (rStatus !== 'correct') {
      const matchIdx = checklist.findIndex(
        ([cLetter, cUsed]) => !cUsed && cLetter === rLetter
      );

      if (matchIdx >= 0) {
        checklist = Object.assign([], checklist, {
          [matchIdx]: [checklist[matchIdx], true],
        });
        return [rLetter, 'wrongSpot'];
      }
    }

    return [rLetter, rStatus];
  });

  return result;
};
