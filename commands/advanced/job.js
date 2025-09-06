import { EmbedBuilder } from 'discord.js'

import { randn, rand } from '../../extras/extras.js'

import icons from '../../extras/data/icons.json' with { type: 'json' };

import {COOLDOWN} from '../../systems/cooldown.js'
import {GET, INC} from '../../systems/getdb.js'
import {GETXP, EXP_MULT, progressBar, LEVELS} from '../../systems/xpgain.js'

export default {
  name: 'job', description: 'j',

  async run(ctx) {
    const user = ctx.type === 'text' ? ctx.message.author : ctx.interaction.user
    const send = (msg) => ctx.type === 'slash' ? ctx.interaction.reply(msg) : ctx.message.reply(msg);

    const cooldown = COOLDOWN(user.id, 'job', 12)
    if (cooldown) return send(`⏳ ure on **${cooldown}** second cooldown cro.`)
    const row = GET('users', 0, user.id)
    const currLVL = row.level, currEXP = row.XP


    const exp = EXP_MULT[currLVL]*2 + randn(Math.ceil(3*EXP_MULT[currLVL]))
    const getxp = GETXP(user.id, exp)
    if (getxp) send({embeds: [getxp]})

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
        'illuminati confirmer',
        'mocha fanart ambassador'

    ]

    // embebd,,,
    const embed = new EmbedBuilder()
            .setColor("#89c0ff")
            .setTitle(`J*B`)
            .addFields({
                name: `${icons.moneyBag} __${user.username}__ worked as a ${rand(jobs)} and earned __${exp} reputation!!__`,
                value: ``
            })
            .setFooter({text: `${currEXP+exp}/${LEVELS[currLVL]} REP  /  :3`})
        // finally
    send({embeds: [embed]});
}}