import { EmbedBuilder } from 'discord.js'
import { gdrank, gdIcons } from '../../extras/important/strings.js'
import { getUserInfo } from '../../extras/gd/getUser.js'
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
        const data = await getUserInfo(username)
        let spread = {name: "", value: ""}
        if (data.cSpread) {
        const cSpread = (data.cSpread).split(",")
        const pSpread = (data.pSpread).split(",")
        const dSpread = (data.dSpread).split(",")
        spread = {
                name: "",
                value: `
                ${"-".repeat(48)}
                \`Classic: ${cSpread[0]} | ${cSpread[1]} | ${cSpread[2]} | ${cSpread[3]} | ${cSpread[4]} | ${cSpread[5]} || ${cSpread[6]} | ${cSpread[7]}\`
                \`Platformer: ${pSpread[0]} | ${pSpread[1]} | ${pSpread[2]} | ${pSpread[3]} | ${pSpread[4]} | ${pSpread[5]} | ${pSpread[6]}\`
                \`Demons: [ ${dSpread[0]} | ${dSpread[1]} | ${dSpread[2]} | ${dSpread[3]} | ${dSpread[4]} ]\`
                \`[ ${dSpread[5]} | ${dSpread[6]} | ${dSpread[7]} | ${dSpread[8]} | ${dSpread[9]} ] [ ${dSpread[10]} | ${dSpread[11]} ]\`
                `
            }
        }
        // embebd,,,
        const embed = new EmbedBuilder()
            .setColor("#89c0ff")
            .setTitle(`${gdIcons[7]} ${data.name}'s profile`)
            .addFields({ // ------------------------ STATS COLUMN
                name: `${gdIcons[9]} STATS`,
                value: `
                ${"-".repeat(24)}
                ${gdrank(data.lb)} **${data.lb != 0 ? data.lb : "Not in leaderboard"}** 
                ${gdIcons[0]} **Stars:** ${data.stars}
                ${gdIcons[1]} **Diamonds:** ${data.diamonds}
                ${gdIcons[2]} **Coins:** ${data.coins}
                ${gdIcons[3]} **User Coins:** ${data.userCoins}
                ${gdIcons[4]} **Demons:** ${data.demons}
                ${gdIcons[5]} **Moons:** ${data.moons}
                ${gdIcons[6]} **BP:** ${data.bp}
                `.trim(), 
                inline: true
            },{ // ------------------  MISC COLUMN
                name: `${gdIcons[10]} MISC`,
                value: `
                ${"-".repeat(24)}
                ${gdIcons[11]} **Icons:** 
                \`${data.cube} / ${data.ship} / ${data.ball}\`
                \`${data.ufo} / ${data.wave} / ${data.robot}\`
                \`${data.spider} / ${data.swing} / ${data.jetpack}\`
                ${gdIcons[19]} **Colors:**
                Primary: \`${data.color1}\`
                Secondary: \`${data.color2}\`
                Glow: ${data.glow ? `\`${data.colorG}\`` : gdIcons[20]}
                `,
                inline: true
            },{ // ETC.
                name: "",
                value: `
                ${"-".repeat(48)}
                ${gdIcons[22]} Xitter: ${data.xitter ? `[${data.xitter}](https://twitter.com/${data.xitter})` : gdIcons[20]}
                ${gdIcons[21]} Youtube: ${data.youtube ? `[gog](https://youtube.com/channel/${data.youtube})` : gdIcons[20]}
                ${gdIcons[23]} Twitch: ${data.youtube ? `[gog](https://twitch.tv/${data.twitch})` : gdIcons[20]}
                `
            }, spread
        )
            .setFooter({text: `pID: ${data.pID} | aID: ${data.aID} | :3`})
        
        // finally
        send({embeds: [embed]});
    }
    catch (err) { 
        send((err.message).includes("500") ? "`User not found or robtop servers are xd`" : `aero fucked up lmao ${err.message}`)
        console.log(err)
}}}