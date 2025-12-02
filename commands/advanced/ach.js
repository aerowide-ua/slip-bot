import { EmbedBuilder } from 'discord.js'
import {GET, SET} from '../../systems/getdb.js'
import {LEVELS, REPUTATION, progressBar, REP_BADGE} from '../../systems/xpgain.js'
import { ACH, ACH_DISPLAY } from '../../systems/achievements.js'

import icons from '../../extras/data/icons.json' with { type: 'json' };

export default {
  name: 'ach', description: 'achevments (waow)',
  options: [{
        name: 'text', description: 'texxxxxt',
        type: 3, required: false
  }],

  async run(ctx) {
    let user = ctx.type === 'text' ? ctx.message.author : ctx.interaction.user
    const send = (msg) => ctx.type === 'slash' ? ctx.interaction.reply(msg) : ctx.message.reply(msg);
    const content = ctx.type === 'text' ? ctx.args.join(' ') : ctx.interaction.options.getString('text');
    // const guildID = ctx.guildId
    // const guild = await ctx.client.guilds.cache.get(guildID)
    let row;
    if (content) {
        let mention = content.match(/<@!?(\d+)>/)
        if (!mention) { mention = [0, content] }
        row = GET('users', 0, mention[1])
        user = await ctx.client.users.fetch(mention[1])
    } else {
        row = GET('users', 0, user.id)
    }
    const ACHlength = Object.keys(ACH).length
    const achievements = row.achievements.split(":")

    if (row.achievements == '' || achievements.length == 1) { 
        const emptyACH = '0' + ':0'.repeat(ACHlength - 1)
        SET('users', 'achievements', user.id, emptyACH)
    }
    
    

    let completed = 0
    for (let a in achievements) { if (a!="0") {completed++} }

    let display = ''
    let ach = ''

    for (let i=0; i<ACHlength; i++) {
        try {if (achievements[i] != "0") {
            ach = typeof ACH_DISPLAY[i] == "object" ? ACH_DISPLAY[i][Number(achievements[i])-1] : ACH_DISPLAY
            display += `${ach[3]} **${ach[0]}** - ${ach[1]}\n`
        }} catch (e) {
            if (e.message in 'Cannot read properties of undefined') {
                const emptyACH = '0' + ':0'.repeat(ACHlength - 1)
                SET('users', 'achievements', user.id, emptyACH)
                ach = typeof ACH_DISPLAY[i] == "object" ? ACH_DISPLAY[i][Number(achievements[i])-1] : ACH_DISPLAY
                display += `${ach[3]} **${ach[0]}** - ${ach[1]}\n`
            }
        }
    }

    const embed = new EmbedBuilder()
            .setColor("#89c0ff")
            .setTitle(`${icons.profile} ${user.username}'s achievements`)
            .addFields({
                name: `Achievement progress`,
                value: `
                ${progressBar(completed, ACHlength)}

                ${display}
                `
            })
            .setFooter({text: `:3`})
        // finally
    send({embeds: [embed]});
}}