import { Client, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';

import { getCommandsCollection } from './commands/getCommands';
import config from './config';

const main = async () => {
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });

  client.once('ready', () => {
    console.log('Ready!', new Date());
  });

  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const commands = getCommandsCollection();

    const command = commands.get(interaction.commandName);

    if (!command) {
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    }
  });

  client.login(config.token);
};

try {
  main();
} catch (err) {
  console.error(err);
}
