import { EmbedBuilder } from 'discord.js'
import {GET} from '../../systems/getdb.js'
import {icons} from '../../extras/important/strings.js'

export default {
  name: 'profile', description: 'gd profile (waow)',

  async run(ctx) {
    const user = ctx.type === 'text' ? ctx.message.author : ctx.interaction.user
    const send = (msg) => ctx.type === 'slash' ? ctx.interaction.reply(msg) : ctx.message.reply(msg);
    const row = GET('users', 0, user.id)

    // embebd,,,
    const embed = new EmbedBuilder()
            .setColor("#89c0ff")
            .setTitle(`${user.username}'s profile`)
            .addFields({ // ------------------------ STATS COLUMN
                name: ``,
                value: `
                :arrow_up: **Level:** ${row.level} \`(${row.XP}/? XP)\`
                ${icons.stickyNote} **Sticky Notes:** ${row.stickyNotes}
                ${icons.pat} **Pats:** ${row.pats}

                `
            })
            .setFooter({text: `:3`})
        // finally
    send({embeds: [embed]});
}}