export default {
  name: 'echo',
  description: 'hi hello',

  slashData: {
    name: 'echo',
    description: 'Repeats your message.',
    options: [
      {
        name: 'text',
        description: 'What should I repeat?',
        type: 3, // STRING
        required: true
      }
    ]
  },

  async run(ctx) {
    if (ctx.type === 'text') {
      const content = ctx.args.join(' ');
      if (!content) return ctx.message.reply('i need text cro');
      await ctx.message.channel.send(content);
    }

    if (ctx.type === 'slash') {
      // Slash command context
      const content = ctx.interaction.options.getString('text');
      await ctx.interaction.reply(content);
    }
  }
};