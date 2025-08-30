import {rand} from '../../extras/extras.js'
import { EmbedBuilder } from 'discord.js'

export default {
  name: 'pat', description: 'color three', options: [],
// --------------------------------------------------------------------------------------------//
  async run(ctx) {
    const send = (msg) => ctx.type === 'slash' ? ctx.interaction.reply(msg) : ctx.message.reply(msg);
    const msgs = [
        "hell yea",
        "more tbh",
        "now THIS is peak",
        "yuh",
        "sooooo epic",
    ]

    const embed = new EmbedBuilder().setImage(`https://media.discordapp.net/attachments/1409538338670776370/1410720052109643847/catpetterz.png`).setTitle(rand(msgs)).setFooter({ text: `awesome slip art by avxiell`})

    send({embeds: [embed]});
  }
};