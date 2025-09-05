import fs from "fs";
import path from "path";
import {rand} from '../../extras/extras.js'
import {slips} from '../../extras/important/slips.js'
import { EmbedBuilder, AttachmentBuilder } from 'discord.js'

export default {
  name: 'slip', description: 'yea', options: [],
// --------------------------------------------------------------------------------------------//
  async run(ctx) {
    const send = (msg) => ctx.type === 'slash' ? ctx.interaction.reply(msg) : ctx.message.reply(msg);
    const slipPath = await path.resolve('./media/images/slips/')
    const files = fs.readdirSync(slipPath)
    const randimage = rand(files)
    const image = new AttachmentBuilder(`~/../media/images/slips/${randimage}`, {name: 'slipppppp.png'})
    
    const embed = new EmbedBuilder()
    .setTitle("slip")
    .setImage(`attachment://slipppppp.png`)
    .setFooter({text: `by ${randimage.slice(0, -7)}`})

    send({embeds: [embed], files: [image]});
  }
};