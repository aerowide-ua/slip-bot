import { EmbedBuilder } from 'discord.js'
import {icons} from '../../extras/important/strings.js'
import { randn, rand } from '../../extras/extras.js'
import {COOLDOWN} from '../../systems/cooldown.js'
import {GET, INC} from '../../systems/getdb.js'
import {GETXP} from '../../systems/xpgain.js'

export default {
  name: 'job', description: 'j',

  async run(ctx) {
    const user = ctx.type === 'text' ? ctx.message.author : ctx.interaction.user
    const send = (msg) => ctx.type === 'slash' ? ctx.interaction.reply(msg) : ctx.message.reply(msg);
    const payout = randn(10)+1
    const xpgain = randn(3)+1

    const cooldown = COOLDOWN(user.id, 'job', 10)
    if (cooldown) return send(`⏳ ure on **${cooldown}** second cooldown cro.`);

    let row = GET('users', 0, user.id)
    GETXP(user.id, xpgain)
    INC('users', 'stickyNotes', user.id, xpgain)

    const jobs = [
        'slip inc. fuckarounder and findouter',
        'slipling sitter',
        'wee wee factory janitor',
        'gentleman\'s barber shop hair cutter',
        'mocha hair brusher',
        'revengeseeker',
        'gambler',
        'topalini pasta chef',
        'topatropolis pigeon walker',
        'boss rusher',
        'boss rusher 2',
        'professional boredomer',
        'topa 24/7 market worker',
        'galofuf reminder',
        'slip fanart professional',
        'slip inc. assistant developer',
        'cherryteam nuker',
        'alvaro flinger',
        'towerverse explorer',
        'and everer',
        'base64 translator',
        'regex helper',
        'x rank tetrio player',
        'collab inviter',
        'dark world opener',
        'professional meower',
        'one and only 24 karat slipling owner',
        'full-time petter',
        'full-time belly rubber',
        'alpie babysitter',
        'regex maintenance worker',
        'professional [BIG  SHOT ]',
        'art channel expert',
        'topatropolis saver',
        'professional stop sign',
        'gd player',
        'wurfi maid dress tailor',
        'blip dust sweeper',
        'wee wee hammer',
        'random sidewalk tile CEO',
        'jane removing expert',
        'professional soundboard',
        'mocha\'s personal catnip dosator',
        'catnip sorter & taste tester',
        'akerae tomato thrower',
        'illuminati confirmer'

    ]

    // embebd,,,
    const embed = new EmbedBuilder()
            .setColor("#89c0ff")
            .setTitle(`J*B`)
            .addFields({
                name: `${icons.moneyBag} __${user.username}__ worked as a ${rand(jobs)} and earned __${payout} sticky notes!__`,
                value: ``
            })
            .setFooter({text: `Balance: ${row.stickyNotes + payout}  /  +${xpgain} XP  /  :3`})
        // finally
    send({embeds: [embed]});
}}