import { EmbedBuilder, Client } from 'discord.js'
import {GET, SET} from '../../systems/getdb.js'
import db from '../../db.js'

import icons from '../../extras/data/icons.json' with { type: 'json' };

export default {
  name: 'reminder', description: 'yaya',
  options: [{
        name: 'time', description: 'the time before the inevitable slip dm hits (ts probably breaks at months)',
        type: 3, required: true
  },
    {
        name: 'comment', description: 'the reminder itelf',
        type: 3, required: true
  }],

  async run(ctx) {
    const user = ctx.type === 'text' ? ctx.message.author : ctx.interaction.user
    const send = (msg) => ctx.type === 'slash' ? ctx.interaction.reply(msg) : ctx.message.reply(msg);
    const content = ctx.type === 'text' ? ctx.args.join(' ') : [ctx.interaction.options.getString('time'), ctx.interaction.options.getString('comment')];

    if (!content) return send('no reminder text cro\n-# use `:3 reminder <time> <text>`')
    if (content.length > 255) return send('reminder text too long cro\n-# max 255 symbols')

    const units = {
        s: '1', m: '60', h: '3600', d: '86400', w: '604800', M: '2419200', y: '31557600'
    }
    const time = content.split(' ')[0]
    const regex = /(\d+)([yMwdhms])/g;
    let match;
    let realTime = 0
    while ((match = regex.exec(time)) !== null) {
        const value = parseInt(match[1], 10);
        const unit = match[2];
        if (!units[unit]) return send('invalid time unit cro\n-# use s/m/h/d/w/m/y');
        if (isNaN(value) || value <= 0) return send('invalid time cro\n-# use a number before the time unit');
        realTime += value * parseInt(units[unit], 10);
    }

    const text = content.split(' ').slice(1).join(' ')
    
    const reminder = db.prepare(`INSERT INTO reminders (userId, text, dueTime) VALUES (?, ?, ?)`).run(user.id, text, Date.now() + realTime * 1000)
    SET('users', 'reminders', user.id, GET('users', 0, user.id).reminders + `:${reminder.lastInsertRowid}`)
    const embed = new EmbedBuilder()
            .setColor("#89c0ff")
            .setTitle(`REMINDER SETdlkfjsfg!!`)
            .addFields({
                name: ``,
                value: `
                alr cro sending reminder \`${text}\` in \`${time}\` :3
                `
            })
            .setFooter({text: `:3`})
        // finally
    send({embeds: [embed]});
}}