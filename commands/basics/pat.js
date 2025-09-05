import {rand} from '../../extras/extras.js'
import { EmbedBuilder } from 'discord.js'
import {GET, INC} from '../../systems/getdb.js'

export default {
  name: 'pat', description: 'color three', options: [],
// --------------------------------------------------------------------------------------------//
  async run(ctx) {
    const user = ctx.type === 'text' ? ctx.message.author : ctx.interaction.user
    const send = (msg) => ctx.type === 'slash' ? ctx.interaction.reply(msg) : ctx.message.reply(msg);
    const msgs = [
        "hell yea",
        "more tbh",
        "now THIS is peak",
        "yuh",
        "sooooo epic",
    ]
    INC('users', 'pats', user.id)
    INC('global', 'pats')
    const pats = GET('global', 1)


    const embed = new EmbedBuilder().setImage(`https://media.discordapp.net/attachments/1257260830219702386/1411371946070904832/Screenshot_2025-08-30-11-27-39-081_jp.ne.ibis.ibispaintx.app-edit.jpg`).setTitle(rand(msgs)).setFooter({ text: `awesome slip art by avxiell | total pats: ${pats.pats}`})

    send({embeds: [embed]});
  }
};