import { APIEmbed, EmbedBuilder, EmbedData } from 'discord.js';

import { getGameTitle, getGameRoundText, printBoard } from '../lib/texts';
import { Game, LetterData } from '../lib/types';
import { UserData } from '../models/UserData';

class PlayEmbedBuilder extends EmbedBuilder {
  constructor(
    user: UserData,
    gameData: Game,
    solvedWordList: LetterData[][],
    embedData: EmbedData | APIEmbed
  ) {
    super({
      title: getGameTitle(user.mode, gameData.gameId),
      ...embedData,
      description: `${getGameRoundText(
        user.mode,
        user.currentGameTurns
      )}\n\n${printBoard(user.mode, solvedWordList)}\n${
        embedData.description ?? ''
      }`,
    });
  }
}

export default PlayEmbedBuilder;
