import { SlashCommandBuilder } from 'discord.js';

import ErrorEmbedBuilder from '../embeds/ErrorEmbedBuilder';
import connectMongo from '../lib/connectMongo';
import '../lib/constants';
import { getModeFromWord } from '../lib/saltong';
import { SaltongMode } from '../lib/types';
import UserDataModel from '../models/UserData';
import { Command } from './Command';

const data = new SlashCommandBuilder()
  .setName('play')
  .setDescription('Play a game of Saltong')
  .addStringOption((option) =>
    option
      .setName('word')
      .setDescription(
        'Your guess for the word of the day. Saltong Mini has 4 letters, Saltong has 5, and Saltong Max has 7'
      )
      .setRequired(true)
      .setMinLength(4)
      .setMaxLength(7)
  );

const play = new Command(data, async (res) => {
  const word = res.options.getString('word')?.toLowerCase().replace(' ', '');

  let mode: SaltongMode;
  try {
    mode = getModeFromWord(word);
  } catch (err) {
    await res.reply({ embeds: [new ErrorEmbedBuilder(err?.message)] });
    return;
  }
  const userId = res.user.id;
  const currDate = new Date().getTime();

  await connectMongo();

  let userData = await UserDataModel.findOne({ mode, userId });

  if (!userData) {
    userData = await UserDataModel.create({
      mode,
      userId,
    });

    userData.resetGame(currDate);
  }

  const embeds = await userData.play(word, currDate);
  console.log({ embeds });
  await userData.save();

  await res.reply({ embeds });
});

export default play;
