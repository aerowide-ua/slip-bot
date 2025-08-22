import { ApplicationCommandOptionType } from 'discord.js';

// asked chatgpt to make the boilerplate award
export const PREFIX = ':33';

/**
 * Each command defines:
 * - description
 * - optional slash "options"
 * - run(ctx) where ctx is either:
 *   { type: 'slash', interaction }  or  { type: 'text', message, args }
 */
export const commands = {

  echo: {
    description: 'my talking slip',
    options: [
      {
        name: 'text',
        description: 'my talking slip 2025 free',
        type: ApplicationCommandOptionType.String,
        required: true
      }
    ],






    async run(ctx) {
      const text =
        ctx.type === 'slash'
          ? ctx.interaction.options.getString('text', true)
          : ctx.args.join(' ');
      if (!text) {
        const reply = 'i need text cro `:33echo h`';
        return ctx.type === 'slash'
          ? ctx.interaction.reply(reply)
          : ctx.message.reply(reply);
      }
      return ctx.type === 'slash'
        ? ctx.interaction.reply(text)
        : ctx.message.reply(text);
    }}};

export function toSlashJSON() {
  return Object.entries(commands).map(([name, def]) => ({
    name,
    description: def.description,
    options: def.options ?? []
  }));
}
