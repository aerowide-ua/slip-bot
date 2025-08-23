export default {
  name: 'repeat',
  description: 'hi hello',

  slashData: {
    name: 'repeat',
    description: 'yea',
    options: [
      {
        name: 'text',
        description: 'text here cro',
        type: 3, // STRING
        required: true
      }
    ]
  },

  async run(ctx) {
    if (ctx.type === 'text') {
      const content = ctx.args.join(' ');
      if (!content || content.length > 255) return ctx.message.reply('yeaaa so like umm no');
      await ctx.message.channel.send({ content:content, allowedMentions: { parse: [] }} );
    }

    if (ctx.type === 'slash') {
      // Slash command context
      const content = ctx.interaction.options.getString('text');
      await ctx.interaction.reply({ content: content, allowedMentions: { parse: [] }} );
    }
  }
};