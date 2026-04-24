import { EmbedBuilder } from 'discord.js'
import db from '../../db.js'

export default {
  name: 'myreminders', description: 'see ur active reminders',
  options: [],

  async run(ctx) {
    const user = ctx.type === 'text' ? ctx.message.author : ctx.interaction.user
    const send = (msg) => ctx.type === 'slash' ? ctx.interaction.reply(msg) : ctx.message.reply(msg);

    const reminders = db.prepare(`
      SELECT * FROM reminders 
      WHERE userId = ? AND status = 'pending'
      ORDER BY dueTime ASC
    `).all(user.id);

    if (reminders.length === 0) {
      return send('no reminders set cro :3');
    }

    const reminderList = reminders.map((r, i) => {
      const timeLeft = r.dueTime - Date.now();
      const hours = Math.floor(timeLeft / 3600000);
      const minutes = Math.floor((timeLeft % 3600000) / 60000);
      const seconds = Math.floor((timeLeft % 60000) / 1000);
      
      return `**${i + 1}.** \`${r.text}\` - ${hours}h ${minutes}m ${seconds}s left`;
    }).join('\n');

    const embed = new EmbedBuilder()
      .setColor("#89c0ff")
      .setTitle(`YOU'RE REMINDERS`)
      .setDescription(reminderList)
      .setFooter({text: `${reminders.length} active reindeer ${reminders.length !== 1 ? 's' : ''}`})

    send({embeds: [embed]});
  }
}
