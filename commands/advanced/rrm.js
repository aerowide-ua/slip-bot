import {rand, randn} from '../../extras/extras.js'
import { gdIcons } from '../../extras/important/strings.js'
import { EmbedBuilder } from 'discord.js'

import icons from '../../extras/data/icons.json' with { type: 'json' };

import {COOLDOWN} from '../../systems/cooldown.js'
import {GET, SET, INC} from '../../systems/getdb.js'
import {GETXP} from '../../systems/xpgain.js'
import { EXP_MULT } from '../../systems/xpgain.js'; 

export default {
  name: 'rrm', description: 'why not', options: [],
  options: [{
        name: 'bet', description: 'number here cro',
        type: 4, required: true
  }],

// --------------------------------------------------------------------------------------------//
  async run(ctx) {
    const send = (msg) => ctx.type === 'slash' ? ctx.interaction.reply(msg) : ctx.message.reply(msg);
    let content = ctx.type === 'text' ? Number(ctx.args.join(' ')) : ctx.interaction.options.getInteger('bet');
    content = Math.floor(content)
    if (!content || content > 10**10 || content < 0) return send('bet cro');

    const user = ctx.type === 'text' ? ctx.message.author : ctx.interaction.user
    const cooldown = COOLDOWN(user.id, 'rrm', 5)
    if (cooldown) return send(`⏳ ure on **${cooldown}** second cooldown cro.`)

    let row = GET('users', 0, user.id)
    if (row.stickyNotes < content) return send(`u need ${icons.stickyNote} ${content-row.stickyNotes} more cro.`)
    INC('users', 'stickyNotes', user.id, -content)

    const emoj = [ 20, 0, 36, 37, 38, 39 ]
    const ratings = () => Math.floor(Math.random() * 6)
    const xpgain = Math.max(randn(3*EXP_MULT[row.level])+1, Math.ceil(EXP_MULT[row.level]/2))
    const g1 = ratings()
    const g2 = ratings()
    const g3 = ratings()

    const result = g1==g2 || g1==g3 ? g1 : g2==g3 ? g2 : Math.min(g1,g2,g3)
    const msgs = [
        "ow",
        "i meannnnn",
        "featured ...! so boss rushy",
        "so epic",
        'leg',
        'MITIKKKKKKKKKKKKKKKK'
    ]
    const payouts = [0, content*1, content*1.25, content*1.75, content*2.5, content*5]
    const payout = g1+g2+g3==15 ? content*16 : Math.floor(payouts[result])

    INC('users', 'stickyNotes', user.id, payout)
    SET('users', 'stickyNotes', user.id, GET('users', 0, user.id).stickyNotes)
    let exp = GETXP(user.id, xpgain)
    if (exp) send({embeds: [exp]})

    const embed = new EmbedBuilder()
        .setTitle("ROBTOP RATING MACHINE")
        .setDescription(`${gdIcons[emoj[g1]]} - ${gdIcons[emoj[g2]]} - ${gdIcons[emoj[g3]]}`)
        .addFields(
            {name: '', value: `${msgs[result]} -> ${gdIcons[emoj[result]]}`}
        )
        .setFooter({ text: `you got ${payout} sticky notes  /  +${xpgain}XP  /  slip gambling and co.`})

    send({embeds: [embed]});
  }
};