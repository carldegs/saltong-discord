import { EmbedBuilder, Colors, EmbedData, APIEmbed } from 'discord.js';

class ErrorEmbedBuilder extends EmbedBuilder {
  constructor(embedData: EmbedData | APIEmbed);
  constructor(message?: string, title?: string);
  constructor(
    messageOrEmbedData:
      | EmbedData
      | APIEmbed
      | string = 'A server error occured. Try again later',
    title = 'Error!'
  ) {
    const isEmbedData = typeof messageOrEmbedData !== 'string';

    if (isEmbedData) {
      super({
        color: Colors.Red,
        title,
        ...messageOrEmbedData,
      });
    } else {
      super({
        color: Colors.Red,
        title,
        description: messageOrEmbedData,
      });
    }
  }
}

export default ErrorEmbedBuilder;
