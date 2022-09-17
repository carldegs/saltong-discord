import { Collection } from 'discord.js';

import { Command } from './Command';
import commands from './index';

export const getCommandsCollection = () => {
  const commandsCollection = new Collection<string, Command>();

  commands.forEach((command) => {
    commandsCollection.set(command.data.name, command);
  });

  return commandsCollection;
};

export const getCommandsJSON = () => {
  return commands.map((command) => command.data.toJSON());
};
