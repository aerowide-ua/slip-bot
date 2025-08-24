import {rand} from '../extras.js'
import { EmbedBuilder, AttachmentBuilder } from 'discord.js'

export default {
  name: 'thunder', description: 'rrrrrrrrrrrrrrrr', options: [],
// --------------------------------------------------------------------------------------------//
  async run(ctx) {
    const send = (msg) => ctx.type === 'slash' ? ctx.interaction.reply(msg) : ctx.message.reply(msg);

    const image = new AttachmentBuilder(`commands/media/images/thundrr.jpg`, {name: 't.png'})
    const embed = new EmbedBuilder().setImage(`attachment://t.png`)

    send({embeds: [embed], files: [image]});
  }
};