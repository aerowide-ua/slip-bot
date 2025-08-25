export default {
  name: 'explode', description: ':boom:',
  options: [{
        name: 'text', description: 'text here cro',
        type: 3, required: true
  }],
  // --------------------------------------------------------------------------------------------//
  async run(ctx) {
    const content = ctx.type === 'text' ? ctx.args.join(' ') : ctx.interaction.options.getString('text')
    if (!content || content.length > 128) return ctx.message.reply('yeaaa so like umm no');

    await ctx.message.channel.send({ content:`:boom::boom::boom:${content}:boom::boom::boom:`, allowedMentions: { parse: [] }} );

  }
}