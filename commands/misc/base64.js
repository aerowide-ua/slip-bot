import { EmbedBuilder } from 'discord.js'

export default {
  name: 'b64', description: 'lol',
  options: [{
        name: 'text', description: 'text here cro',
        type: 3, required: true
  }],
// --------------------------------------------------------------------------------------------//

  async run(ctx) {
    const send = (msg) => ctx.type === 'slash' ? ctx.interaction.reply(msg) : ctx.message.channel.send(msg);
    const content = ctx.type === 'text' ? ctx.args.join(' ') : ctx.interaction.options.getString('text');

    // check if empty or your talking too long
    if (!content || content.length > 255) return ctx.message.reply('yeaaa so like umm no\n-# empty message or over 255 symbols');
    let dec = '', enc = '';
    try { dec = atob(content); } catch { dec = ':x:'; }
    try { enc = btoa(content); } catch { enc = ':x:'; }


    const embed = new EmbedBuilder()
                .setColor("#89c0ff")
                .setTitle(`:nerd: bass 64`)
                .addFields({
                    name: `${content}`,
                    value: `:arrow_up: Decoded: ${dec}\n:arrow_down: Encoded: ${enc}`
                })
                .setFooter({text: `:3`})
    // evil message-sending shenanigans
    await send({embeds: [embed]});   
  }
}