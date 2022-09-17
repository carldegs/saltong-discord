export interface Game {
  date: string;
  gameId: number;
  word: string;
}

export type SaltongMode = 'mini' | 'max' | 'main';

export type WordInHint = 'show' | 'spoiler' | 'hide';

export type LetterStatus = 'wrong' | 'wrongSpot' | 'correct';

export type LetterData = [string, LetterStatus];
