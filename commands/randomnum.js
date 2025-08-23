import {randn} from '../extras.js'

export default {
  name: 'number',
  description: 'randommdm',

  slashData: {
    name: 'number',
    description: 'yea',
    options: [
      {
        name: 'num',
        description: 'number here cro',
        type: 4, // STRING
        required: true
      }
    ]
  },

  async run(ctx) {
    if (ctx.type === 'text') {
      const content = ctx.args.join(' ');
      if (!content || content > 10**6) return ctx.message.reply('number cro');
      await ctx.message.channel.send({ content:`yro'ue number cro: ${randn(content)}`, allowedMentions: { parse: [] }} );
    }

    if (ctx.type === 'slash') {
      // Slash command context
      const content = ctx.interaction.options.getInteger('num');
      await ctx.interaction.reply({ content: `yro'ue number cro: ${randn(content)}`, allowedMentions: { parse: [] }} );
    }
  }
};