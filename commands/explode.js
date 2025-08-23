export default {
  name: 'explode',
  description: ':boom:',

  slashData: {
    name: 'explode',
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
      if (!content || content.length > 67) return ctx.message.reply('yeaaa so like umm no');
      await ctx.message.channel.send({ content:`:boom::boom::boom:${content}:boom::boom::boom:`, allowedMentions: { parse: [] }} );
    }

    if (ctx.type === 'slash') {
      // Slash command context
      const content = ctx.interaction.options.getString('text');
      await ctx.interaction.reply({ content:`:boom::boom::boom:${content}:boom::boom::boom:`, allowedMentions: { parse: [] }} );
    }
  }
};