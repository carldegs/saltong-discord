import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from 'discord.js';

export class Command {
  constructor(
    public data:
      | Partial<SlashCommandBuilder>
      | SlashCommandSubcommandBuilder
      | SlashCommandSubcommandsOnlyBuilder,
    public execute: (interaction: ChatInputCommandInteraction) => void
  ) {}

  // public execute(interaction: ChatInputCommandInteraction) {
  //   try {
  //     this._execute(interaction);
  //   } catch (err) {
  //     interaction.reply(err?.message);
  //   }
  // }
}
