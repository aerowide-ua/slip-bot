import { EmbedBuilder } from 'discord.js'
import { gdrank, gdIcons } from './extras/important/strings.js'
import { getLevelInfo } from '../../extras/gd/getLevel.js'
import axios from 'axios'

export default {
  name: 'gdlevel', description: 'gd lvele (waow)',
  options: [{
        name: 'text', description: 'text here cro',
        type: 3, required: true
  }],

  async run(ctx) {
    // some vars
    const send = (msg) => ctx.type === 'slash' ? ctx.interaction.reply(msg) : ctx.message.reply(msg);
    const content = (msg) => ctx.message.channel.send(msg)
    const input = ctx.type === 'text' ? ctx.args.join(' ') : ctx.interaction.options.getString('text');
    const msg = { content: content, allowedMentions: { parse: [] }}

    try { 
        // get the data yum yum
        const data = await getLevelInfo(input)

        // embebd,,,
        const embed = new EmbedBuilder()
            .setColor("#89c0ff")
            .setTitle(`${gdIcons[7]}`)
            .addFields({ // ------------------------ STATS COLUMN
                name: `${gdIcons[9]} STATS`,
                value: `
                ${"-".repeat(24)}
                `, 
                inline: true
            }
        )
            .setFooter(`:3`)
        
        // finally
        send({embeds: [embed]});
    }
    catch (err) { 
        send((err.message).includes("500") ? "`Level not found or robtop servers are xd`" : `aero fucked up lmao ${err.message}`)
        console.log(err)
}}}