import { SaltongMode } from './types';

export const MAX_TURNS: Record<SaltongMode, number> = {
  main: 6,
  mini: 5,
  max: 8,
};

export const WORD_LENGTH: Record<SaltongMode, number> = {
  main: 5,
  max: 7,
  mini: 4,
};

export const WIN_GIFS = ['https://tenor.com/bI0lf.gif'];
export const LOSE_GIFS = [
  'https://i.ytimg.com/vi/ilqAM2Wml2g/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD8CBgm9Y8HXlqEXzSe7Zx5Z3LPOg',
];
