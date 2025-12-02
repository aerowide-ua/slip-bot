import {rand, randn} from '../../extras/extras.js'
import { gdIcons } from '../../extras/important/strings.js'
import { EmbedBuilder } from 'discord.js'

import icons from '../../extras/data/icons.json' with { type: 'json' };

import {COOLDOWN} from '../../systems/cooldown.js'
import {GET, SET, INC} from '../../systems/getdb.js'
import {ACH, SET_ACH} from '../../systems/achievements.js'

export default {
  name: 'rrm', description: 'why not', options: [],

// --------------------------------------------------------------------------------------------//
  async run(ctx) {
    const send = (msg) => ctx.type === 'slash' ? ctx.interaction.reply(msg) : ctx.message.reply(msg);
    
    const user = ctx.type === 'text' ? ctx.message.author : ctx.interaction.user
    const row = GET('users', 0, user.id)
    const achievements = row.achievements.split(":")
    const ACHlength = Object.keys(ACH).length

    if (row.achievements == '' || achievements.length == 1) { 
        const emptyACH = '0' + ':0'.repeat(ACHlength - 1)
        SET('users', 'achievements', user.id, emptyACH)
    }


    // const cooldown = COOLDOWN(user.id, 'rrm', 5)
    // if (cooldown) return send(`⏳ ure on **${cooldown}** second cooldown cro.`)

    const emoj = [ 20, 0, 36, 37, 38, 39 ]
    const ratings = () => Math.floor(Math.random() * 6)
    const g1 = ratings()
    const g2 = ratings()
    const g3 = ratings()
    const allEqual = g1==g2 && g1==g3 && g2==g3

    const result = g1==g2 || g1==g3 ? g1 : g2==g3 ? g2 : Math.min(g1,g2,g3)
    const msgs = [
        "ow",
        "i meannnnn",
        "featured ...! so boss rushy",
        "so epic",
        'leg',
        'MITIKKKKKKKKKKKKKKKK'
    ]

    if (result == 3) { SET_ACH(user.id, 1, 1) }
    if (result == 4) { SET_ACH(user.id, 2, 1) }
    if (result == 5) { SET_ACH(user.id, 3, 1) }
    if ([g1, g2, g3].sort() == [3, 4, 5]) { SET_ACH(user.id, 4, 1) }
    if (allEqual && g1==0) { SET_ACH(user.id, 5, 1) }
    if (allEqual && g1==4) { SET_ACH(user.id, 6, 1) }
    if (allEqual && g1==5) { SET_ACH(user.id, 7, 1) }

    console.log([g1, g2, g3].sort())



    const embed = new EmbedBuilder()
        .setTitle("ROBTOP RATING MACHINE")
        .setDescription(`${gdIcons[emoj[g1]]} - ${gdIcons[emoj[g2]]} - ${gdIcons[emoj[g3]]}`)
        .addFields(
            {name: '', value: `${msgs[result]} -> ${gdIcons[emoj[result]]}`}
        )
        .setFooter({ text: `slip gambling and co.`})

    send({embeds: [embed]});
  }
};