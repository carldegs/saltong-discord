import { index, modelOptions, prop } from '@typegoose/typegoose';

import type { WordInHint } from '../lib/types';

@modelOptions({ schemaOptions: { collection: 'guildSettings' } })
@index({ guildId: 1 }, { unique: true })
export class userData {
  @prop({ default: false })
  public ephemeralHints: boolean;
  // Hint Replies will only show to the user who called the bot.

  @prop({ default: 'hide' })
  public hideGuessedWordInHints: WordInHint;
  // When the hint reply is visible to everyone, the guessed word in a spoiler tag is hidden

  @prop({ default: false })
  public ephemeralEndGameMessage: boolean;
  // Hide to other users that you've won (or lost) this round.
}
