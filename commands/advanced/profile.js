import { EmbedBuilder } from 'discord.js'
import {GET} from '../../systems/getdb.js'
import {LEVELS, REPUTATION, progressBar} from '../../systems/xpgain.js'

import icons from '../../extras/data/icons.json' with { type: 'json' };

export default {
  name: 'profile', description: 'gd profile (waow)',
  options: [{
        name: 'text', description: 'time, text',
        type: 3, required: false
  }],

  async run(ctx) {
    let user = ctx.type === 'text' ? ctx.message.author : ctx.interaction.user
    const send = (msg) => ctx.type === 'slash' ? ctx.interaction.reply(msg) : ctx.message.reply(msg);
    const content = ctx.type === 'text' ? ctx.args.join(' ') : ctx.interaction.options.getString('text');
    let row;
    if (content) {
        const mention = content.match(/<@!?(\d+)>/)
        console.log(mention)
        row = GET('users', 0, mention[1])
        user = await ctx.client.users.fetch(mention[1])
    } else {
        row = GET('users', 0, user.id)
    }
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