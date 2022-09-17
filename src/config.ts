const { DISCORD_TOKEN, DISCORD_APP_ID, DISCORD_PUBLIC_KEY, DISCORD_GUILD_ID } =
  process.env;

const config = {
  token: DISCORD_TOKEN as string,
  appId: DISCORD_APP_ID as string,
  publicKey: DISCORD_PUBLIC_KEY as string,
  guildId: DISCORD_GUILD_ID as string,
};

export default config;
