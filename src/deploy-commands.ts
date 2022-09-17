import { REST, Routes } from 'discord.js';
import 'dotenv/config';

import { getCommandsJSON } from './commands/getCommands';
import config from './config';

const deployCommands = async () => {
  const commands = getCommandsJSON();

  const rest = new REST({ version: '10' }).setToken(config.token);

  await rest.put(Routes.applicationCommands(config.appId), {
    body: commands,
  });

  console.log('Successfully registered application commands.');
};

deployCommands();
