import {
  bold,
  italic,
  strikethrough,
  underscore,
  spoiler,
  quote,
  blockQuote,
  inlineCode,
  codeBlock,
  InteractionReplyOptions,
  APIEmbed,
  JSONEncodable,
  EmbedBuilder,
  hyperlink,
} from 'discord.js';

const formatters = {
  bold,
  italic,
  strikethrough,
  underscore,
  spoiler,
  quote,
  blockQuote,
  inlineCode,
  codeBlock,
};

type Embed = APIEmbed | JSONEncodable<APIEmbed>;
export class ReplyMessage {
  private embeds: Embed[];
  private _options: InteractionReplyOptions;

  constructor(private message = '') {
    this.embeds = [];
  }

  public updateOptions(value: InteractionReplyOptions) {
    this._options = {
      ...this._options,
      ...value,
    };
  }

  public formatString(msg: string, format?: keyof typeof formatters) {
    if (format && formatters?.[format]) {
      return (formatters[format] as any)(msg);
    }
    return msg;
  }

  public add(
    msg = '',
    format?: keyof typeof formatters,
    joiner = !this.message?.length ? '' : ' '
  ) {
    msg = this.formatString(msg, format);
    this.message = [this.message, msg].join(joiner);
    return this;
  }

  public addLine(msg = '', format?: keyof typeof formatters) {
    return this.add(msg, format, !this.message?.length ? '' : '\n');
  }

  public addHyperlink(
    content: string,
    url: string,
    appendToCurrentLine = false
  ) {
    return this.add(
      hyperlink(content, url),
      undefined,
      appendToCurrentLine ? ' ' : '\n'
    );
  }

  public addEmbed(embed = new EmbedBuilder()) {
    this.embeds = [...this.embeds, embed];
  }

  public updateLastEmbed(embed: Embed) {
    if (!this.embeds[this.embeds.length - 1]) {
      console.error('No embed initialized');
      return;
    }

    this.embeds[this.embeds.length - 1] = embed;
  }

  public addImageEmbed(url: string) {
    this.addEmbed(new EmbedBuilder().setImage(url));
  }

  public printMessage() {
    return this.message;
  }

  public send(options?: InteractionReplyOptions): InteractionReplyOptions {
    return {
      content: this.message,
      embeds: this.embeds,
      ...this._options,
      ...options,
    };
  }
}
