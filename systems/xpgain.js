import { EmbedBuilder } from 'discord.js'
import db from '../db.js'
import { GET, SET, INC } from './getdb.js'
import { SET_ACH } from './achievements.js'

export const LEVELS = [
    0, 25, 50, 100, 200, // 1-5
    350, 800, 1500, 2500, 4000, // 6-10
    7500, 11111, 15000, 22500, 30000, // 11-15
    72727, 100000, 150000, 200000, 250000, // 16-20 
    333333, 555555, 777777, 999999, 1234567, 1 // 21-25
]

export const REPUTATION = [
    '', 
    'Topatropolis Visitor', 'Topatropolis Newbie I', 'Topatropolis Newbie II', 'Topatropolis Newbie III', 'Topatropolis Citizen I',
    'Topatropolis Citizen II', 'Topatropolis Citizen III', 'Topatropolis Resident I', 'Topatropolis Resident II', 'Topatropolis Resident III',
    'Topatropolis Expert I', 'Topatropolis Expert II', 'Topatropolis Expert III', 'Topatropolis Expert IV', 'Topatropolis Expert V',
    'Topatropolis Council Member I', 'Topatropolis Council Member II', 'Topatropolis Council Member III', 'Topatropolis City Guard I', 'Topatropolis City Guard II',
    'Topatropolis City Guard III', 'Topatropolis Authority I', 'Topatropolis Authority II', 'Topatropolis Authority III', 'Topatropolis Governor'
]

export const JOB_MULT = [
    1, 1, 1.5, 3, 5,
    7.5, 12.5, 20, 30, 40, 
    60, 80, 100, 150, 250, 
    300, 375, 450, 550, 600, 
    650, 750, 825, 900, 1250
]

export const EXP_MULT = [
    1, 1.5, 2, 4, 6,
    9, 12, 15, 20, 25, 
    50, 75, 100, 125, 150, 
    200, 250, 300, 350, 400, 
    500, 600, 700, 850, 1000, 0
]


export const REP_BADGE = [
    '', '<:visit:1414297516215898233>', '<:n1:1414226919867678875>', '<:n2:1414226941678190665>', '<:n3:1414226995830591528>',
    '<:cit1:1414227028877639688>', '<:cit2:1414227165926395995>', '<:cit3:1414227197656432682>', '', '', 
    '', '', '', '', '', 
    '', '', '', '', '', 
    '', '', '', '', '', '', 
]






export function GETXP(id, gain) {
    const level = GET('users', 0, id).level
    const achNumber = level >= 24 ? 7 : level >= 21 ? 6 : level >= 18 ? 5 : level >= 15 ? 4 : level >= 10 ? 3 : level >= 4 ? 2 : level >= 1 ? 1 : 0
    if (GET('users', 0, id).XP + gain >= LEVELS[level]) { 
        INC('users', 'level', id, 1)
        SET('users', 'XP', id, 0)
        if (achNumber > 0) { SET_ACH(id, 8, achNumber)}
        return new EmbedBuilder()
            .setColor("#89c0ff")
            .setTitle(`REPUTATION UP!!!`)
            .addFields({
                name: `your'e now \`${REPUTATION[level]}\`!!!!!!!!!!!!`,
                value: ``
            })
            .setFooter({text: `:3`})
    } else {
        INC('users', 'XP', id, gain)
        if (achNumber > 0) { SET_ACH(id, 8, achNumber)}
    }
}

export const progressBar = (current, total, size=10) => {
        const progress = Math.round(size * (current / total));
        const emptyProgress = size - progress;
        const progressText = '|'.repeat(progress < size+1 ? progress : size);
        const emptyProgressText = ' '.repeat(emptyProgress > 0 ? emptyProgress : 0);
        return `\`[${progressText}${emptyProgressText}]\` (${Math.floor((current/total)*100)}%)`;
}