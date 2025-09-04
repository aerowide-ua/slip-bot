import {rand} from '../../extras/extras.js'
import { gdIcons } from '../../extras/important/strings.js'
import { EmbedBuilder } from 'discord.js'

export default {
  name: 'rrm', description: 'why not', options: [],
// --------------------------------------------------------------------------------------------//
  async run(ctx) {
    const send = (msg) => ctx.type === 'slash' ? ctx.interaction.reply(msg) : ctx.message.reply(msg);

    const emoj = [ 20, 0, 36, 37, 38, 39 ]
    const ratings = () => Math.floor(Math.random() * 6)

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

    const embed = new EmbedBuilder()
        .setTitle("ROBTOP RATING MACHINE")
        .setDescription(`${gdIcons[emoj[g1]]} - ${gdIcons[emoj[g2]]} - ${gdIcons[emoj[g3]]}`)
        .addFields(
            {name: '', value: msgs[result]}
        )
        .setFooter({ text: `slip gambling and co.`})

    send({embeds: [embed]});
  }
};