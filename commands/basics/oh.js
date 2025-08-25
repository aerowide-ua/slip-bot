import { EmbedBuilder, AttachmentBuilder } from 'discord.js'

export default {
  name: 'oh',
  description: 'oh',
  options: [],
// --------------------------------------------------------------------------------------------//
  async run(ctx) {
    const send = (msg) => ctx.type === 'slash' ? ctx.interaction.reply(msg) : ctx.message.reply(msg);

    const image = new AttachmentBuilder(`~/../media/images/misc/oh.png`, {name: 'oh.png'})
    const embed = new EmbedBuilder()
    .setImage(`attachment://oh.png`)

    send({embeds: [embed], files: [image]});
  }
};