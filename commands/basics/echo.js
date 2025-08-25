export default {
  name: 'r', description: 'epeat',
  slashData: {
    name: 'repeat', description: 'yea',
    options: [{
        name: 'text', description: 'text here cro',
        type: 3, required: true
    }]},

// --------------------------------------------------------------------------------------------//

  async run(ctx) {
    const send = (msg) => ctx.type === 'slash' ? ctx.interaction.reply(msg) : ctx.message.channel.send(msg);
    const content = ctx.type === 'text' ? ctx.args.join(' ') : ctx.interaction.options.getString('text');
    const msg = { content: content, allowedMentions: { parse: [] }}

    // check if empty or your talking too long
    if (!content || content.length > 255) return ctx.message.reply('yeaaa so like umm no\n-# empty message or over 255 symbols');
    
    // evil message-sending shenanigans
    if (ctx.type === 'text') {
      const client = ctx.message.client
      const channel = await client.channels.fetch('1409118589205741588')
      await channel.send({content: `"${content}" via ${ctx.message.author}`, allowedMentions: { parse: [] }})
      ctx.message.delete()
    } 
    await send(msg)   
  }
}
