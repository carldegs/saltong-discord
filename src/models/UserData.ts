import typegoose from '@typegoose/typegoose';
import { isSameDay } from 'date-fns';
import { EmbedBuilder } from 'discord.js';

import {
  alreadySolvedEmbed,
  outOfTurnsEmbed,
  playIncorrectEmbed,
  playLostEmbed,
  playWonEmbed,
  prevGameEmbed,
} from '../embeds';
import ErrorEmbedBuilder from '../embeds/ErrorEmbedBuilder';
import { getGameData } from '../lib/api';
import { MAX_TURNS } from '../lib/constants';
import { solveWord } from '../lib/saltong';
import { getGameModeFullName } from '../lib/texts';
import type { SaltongMode, Game } from '../lib/types';
import { getPhDate } from '../lib/utils';

const { getModelForClass, index, modelOptions, prop } = typegoose;

@modelOptions({ schemaOptions: { collection: 'user' } })
@index({ userId: 1, mode: 1 }, { unique: true })
export class UserData {
  @prop({ required: true })
  public userId: string;

  @prop({ type: String, required: true })
  public mode: SaltongMode;

  @prop({ default: 0 })
  public currentGameDateStarted: number;

  @prop({ default: 0 })
  public currentGameLastPlayDate: number;

  @prop({ default: 0 })
  public currentGameTurns: number;

  @prop({ default: [] })
  public currentGameWords: string[];

  @prop({ default: false })
  public currentGameWon: boolean;

  @prop({ default: 0 })
  public lastDateWon: number;

  @prop({ default: 0 })
  public gamesPlayed: number;

  @prop({ default: 0 })
  public gamesWon: number;

  @prop({ default: 0 })
  public winStreak: number;

  @prop({ default: 0 })
  public longestWinStreak: number;

  public get isLastTurn() {
    return this.currentGameTurns === MAX_TURNS[this.mode];
  }

  public get isFirstTurn() {
    return this.currentGameTurns <= 1;
  }

  public gameModeText(gameId: string | number) {
    return `${getGameModeFullName(this.mode)} #${gameId}`;
  }

  public get roundText() {
    return `Round ${this.currentGameTurns}/${MAX_TURNS[this.mode]}`;
  }

  public isSameGame(currDate = new Date().getTime()) {
    return isSameDay(
      getPhDate(currDate),
      getPhDate(this.currentGameDateStarted)
    );
  }

  public resetGame(currDate = new Date().getTime()) {
    this.currentGameDateStarted = currDate;
    this.currentGameLastPlayDate = currDate;
    this.currentGameTurns = 0;
    this.currentGameWon = false;
    this.currentGameWords = [];
  }

  public gameLost() {
    this.currentGameWon = false;
    this.gamesPlayed++;
    this.winStreak = 0;
  }

  public gameWon() {
    this.currentGameWon = true;
    this.lastDateWon = this.currentGameDateStarted;
    this.gamesPlayed++;
    this.gamesWon++;
    this.winStreak++;
    if (this.longestWinStreak < this.winStreak) {
      this.longestWinStreak = this.winStreak;
    }
  }

  public async play(guessedWord: string, currDate = new Date().getTime()) {
    const embeds: EmbedBuilder[] = [];
    let gameData: Game;

    try {
      gameData = await getGameData(this.mode);
    } catch (err) {
      embeds.push(
        new ErrorEmbedBuilder(
          'Game Data cannot be fetched. Try again in a few minutes.'
        )
      );
      return embeds;
    }

    // PRE-GAME CHECK
    if (!this.currentGameDateStarted) {
      // NEW GAME
      this.resetGame(currDate);
    } else if (!this.isSameGame(currDate)) {
      try {
        const prevGameData = await getGameData(
          this.mode,
          this.currentGameDateStarted
        );
        embeds.push(prevGameEmbed(this.mode, prevGameData));
        this.resetGame(currDate);
      } catch (err) {
        console.error(err);
      }
    }

    // PLAY ROUND
    this.currentGameTurns++;

    if (this.currentGameTurns > MAX_TURNS[this.mode]) {
      embeds.push(outOfTurnsEmbed(this.mode));
      return embeds;
    }

    if (this.currentGameWon) {
      embeds.push(alreadySolvedEmbed(this.mode));
      return embeds;
    }

    this.currentGameWords = [...this.currentGameWords, guessedWord];
    this.currentGameLastPlayDate = currDate;

    const solvedWordList = this.currentGameWords.map((word) =>
      solveWord(word, gameData.word)
    );

    if (guessedWord === gameData.word) {
      this.gameWon();
      embeds.push(playWonEmbed(this, gameData, solvedWordList, currDate));
      return embeds;
    }

    if (guessedWord !== gameData.word && this.isLastTurn) {
      this.gameLost();
      embeds.push(playLostEmbed(this, gameData, solvedWordList));
      return embeds;
    }

    embeds.push(playIncorrectEmbed(this, gameData, solvedWordList));
    return embeds;
  }
}

const UserDataModel = getModelForClass(UserData, {
  schemaOptions: { timestamps: true },
});

export default UserDataModel;
