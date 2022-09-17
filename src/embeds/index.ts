import { Colors, EmbedBuilder, inlineCode } from 'discord.js';

import { MAX_TURNS } from '../lib/constants';
import { getGameModeFullName } from '../lib/texts';
import { Game, LetterData, SaltongMode } from '../lib/types';
import { getDuration } from '../lib/utils';
import { UserData } from '../models/UserData';
import ErrorEmbedBuilder from './ErrorEmbedBuilder';
import PlayEmbedBuilder from './PlayEmbedBuilder';

export const prevGameEmbed = (mode: SaltongMode, prevGameData: Game) =>
  new EmbedBuilder({
    title: `You haven't solved ${getGameModeFullName(mode)} #${
      prevGameData.gameId
    }`,
    fields: [{ name: 'Answer', value: prevGameData.word }],
  });

export const alreadySolvedEmbed = (mode: SaltongMode) =>
  new ErrorEmbedBuilder({
    title: `You've already solved today's ${getGameModeFullName(mode)}`,
    description: 'Why not try the other game modes',
    fields: (['main', 'max', 'mini'] as const)
      .filter((m) => mode !== m)
      .map((m) => ({
        name: getGameModeFullName(m),
        value: inlineCode(`/play {${MAX_TURNS[m]}-letter word}`),
      })),
  });

export const outOfTurnsEmbed = (mode: SaltongMode) =>
  alreadySolvedEmbed(mode).setTitle('Out of turns!');

export const playWonEmbed = (
  user: UserData,
  gameData: Game,
  solvedWordList: LetterData[][],
  currDate = new Date().getTime()
) =>
  new PlayEmbedBuilder(user, gameData, solvedWordList, {
    color: Colors.Green,
    fields: [
      {
        name: 'No. of Turns 🏅',
        value: `${user.currentGameTurns}/${MAX_TURNS[user.mode]}`,
        inline: true,
      },
      {
        name: 'Time to Solve ⏳',
        value: getDuration(user.currentGameDateStarted, currDate),
        inline: true,
      },
    ],
  });

export const playLostEmbed = (
  user: UserData,
  gameData: Game,
  solvedWordList: LetterData[][]
) =>
  new PlayEmbedBuilder(user, gameData, solvedWordList, {
    color: Colors.Red,
  });

export const playIncorrectEmbed = (
  user: UserData,
  gameData: Game,
  solvedWordList: LetterData[][]
) =>
  new PlayEmbedBuilder(user, gameData, solvedWordList, {
    color: Colors.Orange,
  });
