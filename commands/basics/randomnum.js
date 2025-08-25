import {randn} from '../../extras/extras.js'

export default {
  name: 'number', description: 'randommdm',
  slashData: {
    name: 'number', description: 'yea',
    options: [{
        name: 'num', description: 'number here cro',
        type: 4, required: true
    }]},
// --------------------------------------------------------------------------------------------//
  async run(ctx) {
    const content = ctx.type === 'text' ? ctx.args.join(' ') : ctx.interaction.options.getString('text')
    if (!content || content > 10**7) return ctx.message.reply('number cro');

    await ctx.message.channel.send({ content:`yro'ue number cro: ${randn(content)}`, allowedMentions: { parse: [] }} );
  }
}
