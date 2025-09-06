import { EmbedBuilder } from 'discord.js'
import db from '../db.js'
import { GET, SET, INC } from './getdb.js'

export const LEVELS = [
    0, 25, 50, 100, 200, // 1-5
    350, 800, 1500, 2500, 4000, // 6-10
    7500, 11111, 15000, 22500, 30000, // 11-15
    72727, 100000, 150000, 200000, 250000, // 16-20 
    333333, 555555, 777777, 999999, 1234567 // 21-25
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
    50, 75, 125, 200, 300, 
    700, 1000, 1500, 3000, 5000, 
    7500, 11111, 18181, 23232, 32323
]

export const REPUTATION = [
    'Topatropolis Visitor', 'Topatropolis Newbie I', 'Topatropolis Newbie II', 'Topatropolis Newbie III', 'Topatropolis Citizen I',
    'Topatropolis Citizen II', 'Topatropolis Citizen III', 'Topatropolis Resident I', 'Topatropolis Resident II', 'Topatropolis Resident III',
    'Topatropolis Expert I', 'Topatropolis Expert II', 'Topatropolis Expert III', 'Topatropolis Expert IV', 'Topatropolis Expert V',
    'Topatropolis Council Member I', 'Topatropolis Council Member II', 'Topatropolis Council Member III', 'Topatropolis City Guard I', 'Topatropolis City Guard II',
    'Topatropolis City Guard III', 'Topatropolis Authority I', 'Topatropolis Authority II', 'Topatropolis Authority III', 'Topatropolis Governor'
]






export function GETXP(id, gain) {
    const level = GET('users', 0, id).level
    if (GET('users', 0, id).XP + gain >= LEVELS[level]) { 
        INC('users', 'level', id, 1)
        SET('users', 'XP', id, 0)
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
    }
}

export const progressBar = (current, total, size=10) => {
        const progress = Math.round(size * (current / total));
        const emptyProgress = size - progress;
        const progressText = '|'.repeat(progress);
        const emptyProgressText = ' '.repeat(emptyProgress);
        return `\`[${progressText}${emptyProgressText}]\` (${current}/${total})`;
}