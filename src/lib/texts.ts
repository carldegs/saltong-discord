import { spoiler } from 'discord.js';

import { MAX_TURNS, WORD_LENGTH } from './constants';
import { LetterData, SaltongMode, WordInHint } from './types';
import { titleCase } from './utils';

export const getGameModeFullName = (mode: SaltongMode) =>
  `Saltong${mode !== 'main' ? ` ${titleCase(mode)}` : ''}`;

export const getGameTitle = (mode: SaltongMode, gameId: string | number) =>
  `${getGameModeFullName(mode)} #${gameId}`;

export const getGameRoundText = (mode: SaltongMode, numTurns: number) =>
  `Round ${numTurns}/${MAX_TURNS[mode]}`;

export const printRow = (
  wordLength: number,
  word: LetterData[] = [],
  options?: Partial<{ printWord: WordInHint }>
) => {
  const { printWord = 'hide' } = options || {};
  const wordStr = word.map(([letter]) => letter).join('');

  if (word?.length) {
    let printedWord = '';

    switch (printWord) {
      case 'show':
        printedWord = wordStr.toUpperCase();
        break;
      case 'spoiler':
        printedWord = spoiler(wordStr.toUpperCase());
        break;
      case 'hide':
      default:
        printedWord = '';
    }

    return `${word
      .map(([, status]) => {
        switch (status) {
          case 'correct':
            return '🟩';
          case 'wrong':
            return '⬜';
          case 'wrongSpot':
            return '🟨';
        }
      })
      .join(' ')} ${printedWord}`;
  }

  if (wordLength) {
    return [...new Array(wordLength)].map(() => '⬜').join(' ');
  }

  return '';
};

export const printBoard = (mode: SaltongMode, words: LetterData[][]) => {
  const maxTurns = MAX_TURNS[mode];
  const wordLen = WORD_LENGTH[mode];

  const rows = [...new Array(maxTurns)]
    .map((_, i) => (i < words.length ? words[i] : []))
    .map((word) => printRow(wordLen, word, { printWord: 'show' }));

  return rows.join('\n\n');
};
