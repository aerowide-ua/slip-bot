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

    const embed = new EmbedBuilder().setImage(`https://media.discordapp.net/attachments/1257260830219702386/1411371946070904832/Screenshot_2025-08-30-11-27-39-081_jp.ne.ibis.ibispaintx.app-edit.jpg`).setTitle(rand(msgs)).setFooter({ text: `awesome slip art by avxiell`})

    send({embeds: [embed]});
  }
};