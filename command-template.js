/* export default {
  name: 'command', description: 'desc',

  slashData: {
    name: 'command', description: 'desc',
    options: [{
        name: 'text', description: 'text here',
        type: 3, required: true
    }]},

  async run(ctx) {
    const send = (msg) => ctx.type === 'slash' ? ctx.interaction.reply(msg) : ctx.message.reply(msg);
    const message = (msg) => ctx.message.channel.send(msg)
    const content = ctx.type === 'text' ? ctx.args.join(' ') : ctx.interaction.options.getString('text');
    const msg = { content: content, allowedMentions: { parse: [] }}
    
    await send(msg)
  }
} */