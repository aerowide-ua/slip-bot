import { EmbedBuilder } from 'discord.js'
import { gdrank, gdi, sp, hexc } from '../../extras.js'
import axios from 'axios'

export default {
  name: 'gdprofile', description: 'gd profile (waow)',
  options: [{
        name: 'text', description: 'text here cro',
        type: 3, required: true
  }],

  async run(ctx) {
    // some vars
    const send = (msg) => ctx.type === 'slash' ? ctx.interaction.reply(msg) : ctx.message.reply(msg);
    const content = (msg) => ctx.message.channel.send(msg)
    const username = ctx.type === 'text' ? ctx.args.join(' ') : ctx.interaction.options.getString('text');
    const msg = { content: content, allowedMentions: { parse: [] }}

    try { 
        // get the data yum yum
        const response = await axios.get(`https://gdbrowser.com/api/profile/${encodeURIComponent(username)}`) 
        const data = response.data

        // embebd,,,
        const embed = new EmbedBuilder()
            .setColor("#89c0ff")
            .setTitle(`${gdi[7]} ${data.username}'s profile`)
            .addFields({ // ------------------------ STATS COLUMN
                name: `${gdi[9]} STATS`,
                value: `
                ${"-".repeat(24)}
                ${gdrank(data.rank)} **${data.rank != 0 ? data.rank : "None"}** 
                ${gdi[0]} **Stars:** ${data.stars}
                ${gdi[1]} **Diamonds:** ${data.diamonds}
                ${gdi[2]} **Coins:** ${data.coins}
                ${gdi[3]} **User Coins:** ${data.userCoins}
                ${gdi[4]} **Demons:** ${data.demons}
                ${gdi[5]} **Moons:** ${data.moons}
                ${gdi[6]} **BP:** ${data.cp}
                `.trim(), 
                inline: true
            },{ // ------------------  MISC COLUMN
                name: `${gdi[10]} MISC`,
                value: `
                ${"-".repeat(24)}
                ${gdi[11]} **Icons:** 
                \`${data.icon}${sp(data.icon, 4)}/ ${data.ship}${sp(data.ship, 4)}/ ${data.ball}${sp(data.ball, 4)}\`
                \`${data.ufo}${sp(data.ufo, 4)}/ ${data.wave}${sp(data.wave, 4)}/ ${data.robot}${sp(data.robot, 4)}\`
                \`${data.spider}${sp(data.spider, 4)}/ ${data.swing}${sp(data.swing, 4)}/ ${data.jetpack}${sp(data.jetpack, 4)}\`
                ${gdi[19]} **Colors:**
                Primary: \`${hexc(data.col1RGB.r, data.col1RGB.g, data.col1RGB.b)}\`
                Secondary: \`${hexc(data.col2RGB.r, data.col2RGB.g, data.col2RGB.b)}\`
                Glow: \`${data.glow ? hexc(data.colGRGB.r, data.colGRGB.g, data.colGRGB.b) : gdi[20]}\`
                `,
                inline: true
            },{ // ETC.
                name: "",
                value: `
                ${"-".repeat(48)}
                ${gdi[22]} Xitter: ${data.twitter ? `[${data.twitter}](https://twitter.com/${data.twitter})` : gdi[20]}
                ${gdi[21]} Youtube: ${data.youtube ? `[gog](https://youtube.com/channel/${data.youtube})` : gdi[20]}
                `
            })
            .setFooter({text: `pID: ${data.playerID} | aID: ${data.accountID} | :3`})
        
        // finally
        send({embeds: [embed]});
    }
    catch (err) { send("aero fucked up lmao" + err.message)
}}}