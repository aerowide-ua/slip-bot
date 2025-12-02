import { EmbedBuilder } from 'discord.js'

import { randn, rand } from '../../extras/extras.js'

import icons from '../../extras/data/icons.json' with { type: 'json' };

import {COOLDOWN} from '../../systems/cooldown.js'
import {GET, INC, SET} from '../../systems/getdb.js'
import {GETXP, EXP_MULT, progressBar, LEVELS} from '../../systems/xpgain.js'
import { ACH, SET_ACH } from '../../systems/achievements.js'

export default {
  name: 'job', description: 'j',

  async run(ctx) {
    const user = ctx.type === 'text' ? ctx.message.author : ctx.interaction.user
    const send = (msg) => ctx.type === 'slash' ? ctx.interaction.reply(msg) : ctx.message.reply(msg);

    const cooldown = COOLDOWN(user.id, 'job', 7)
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

    const ACHlength = Object.keys(ACH).length
    INC('users', 'jobs', user.id)
    
    let achievements = row.achievements.split(":")
    if (row.achievements == '' || achievements.length == 1) { 
        const emptyACH = '0' + ':0'.repeat(ACHlength - 1)
        SET('users', 'achievements', user.id, emptyACH)
        achievements = row.achievements.split(":")
    }
    const uPats = await GET('users', 0, user.id).jobs
    const achNumber = uPats >= 2500 ? 7 : uPats >= 500 ? 6 : uPats >= 250 ? 5 : uPats >= 100 ? 4 : uPats >= 50 ? 3 : uPats >= 10 ? 2 : uPats >= 1 ? 1 : 0
    
    if (achNumber > 0) { SET_ACH(user.id, 9, achNumber)}

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