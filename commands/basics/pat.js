import {rand} from '../../extras/extras.js'
import { EmbedBuilder } from 'discord.js'
import {GET, INC, SET} from '../../systems/getdb.js'
import { ACH, SET_ACH } from '../../systems/achievements.js'

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

    const ACHlength = Object.keys(ACH).length

    const row = GET('users', 0, user.id)
    let achievements = row.achievements.split(":")
    if (row.achievements == '' || achievements.length == 1) { 
        const emptyACH = '0' + ':0'.repeat(ACHlength - 1)
        SET('users', 'achievements', user.id, emptyACH)
        achievements = row.achievements.split(":")
    }
    const uPats = await GET('users', 0, user.id).pats
    const achNumber = uPats >= 727 ? 5 : uPats >= 100 ? 4 : uPats >= 25 ? 3 : uPats >= 5 ? 2 : uPats >= 1 ? 1 : 0

    INC('users', 'pats', user.id)
    INC('global', 'pats')
    const pats = GET('global', 1)
    if (achNumber > 0) { SET_ACH(user.id, 0, achNumber)}


    const embed = new EmbedBuilder().setImage(`https://media.discordapp.net/attachments/1257260830219702386/1411371946070904832/Screenshot_2025-08-30-11-27-39-081_jp.ne.ibis.ibispaintx.app-edit.jpg`).setTitle(rand(msgs)).setFooter({ text: `awesome slip art by avxiell | total pats: ${pats.pats}`})

    send({embeds: [embed]});
  }
};