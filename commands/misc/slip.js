import {rand} from '../../extras/extras.js'
import {slips} from '../../extras/important/slips.js'
import { EmbedBuilder, AttachmentBuilder } from 'discord.js'

export default {
  name: 'slip', description: 'yea', options: [],
// --------------------------------------------------------------------------------------------//
  async run(ctx) {
    const send = (msg) => ctx.type === 'slash' ? ctx.interaction.reply(msg) : ctx.message.reply(msg);
    const randimage = rand(slips)
    const image = new AttachmentBuilder(`~/../media/images/slips/${randimage[0]}`, {name: 'slipppppp.png'})
    
    const embed = new EmbedBuilder()
    .setTitle("slip")
    .setImage(`attachment://slipppppp.png`)
    .setFooter({text: `by ${randimage[1]}`})

    send({embeds: [embed], files: [image]});
  }
};