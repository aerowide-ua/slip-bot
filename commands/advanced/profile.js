import { EmbedBuilder } from 'discord.js'
import {GET} from '../../systems/getdb.js'
import {LEVELS, REPUTATION, progressBar} from '../../systems/xpgain.js'

import icons from '../../extras/data/icons.json' with { type: 'json' };

export default {
  name: 'profile', description: 'gd profile (waow)',

  async run(ctx) {
    const user = ctx.type === 'text' ? ctx.message.author : ctx.interaction.user
    const send = (msg) => ctx.type === 'slash' ? ctx.interaction.reply(msg) : ctx.message.reply(msg);
    const row = GET('users', 0, user.id)
    const xp = row.XP
    const xpNeed = LEVELS[row.level]

    


    
    const embed = new EmbedBuilder()
            .setColor("#89c0ff")
            .setTitle(`${icons.profile} ${user.username}'s profile`)
            .addFields({
                name: `:sparkles: **${REPUTATION[row.level]}** `,
                value: `
                ${progressBar(xp, xpNeed)}

                ${icons.pat} **Pats:** ${row.pats}

                `
            })
            .setFooter({text: `:3`})
        // finally
    send({embeds: [embed]});
}}