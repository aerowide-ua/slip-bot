import {randn} from '../../extras/extras.js'

export default {
  name: 'number', description: 'randommdm',
  options: [{
        name: 'num', description: 'number here cro',
        type: 4, required: true
  }],
// --------------------------------------------------------------------------------------------//
  async run(ctx) {
    const content = ctx.type === 'text' ? Number(ctx.args.join(' ')) : ctx.interaction.options.getInteger('num');
    if (!content || content > 10**7) return ctx.message.reply('number cro');

    await ctx.message.channel.send({ content:`yro'ue number cro: ${randn(content)+1}`, allowedMentions: { parse: [] }} );
  }
}
