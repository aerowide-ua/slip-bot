import { EmbedBuilder } from 'discord.js'
import { gdrank, gdIcons, gdAssets, robSongs } from '../../extras/important/strings.js'
import { getLevels } from '../../extras/gd/getLevel.js'
import axios from 'axios'
import sharp from 'sharp'

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
    let input = await ctx.type === 'text' ? ctx.args.join(' ') : ctx.interaction.options.getString('text');
    let page = 0
    let param = null
    if (input.includes("%")) {
        const splitInput = input.split("%")
        input = splitInput[0]
        page = splitInput[1] != '' ? Number(splitInput[1])-1 : 0
        param = splitInput[2] ? splitInput[2] : param
    }
    const msg = { content: content, allowedMentions: { parse: [] }}
    const cRating = (data) => {
            return (data.epic == '3') ? 5 : (data.epic == '2') ? 4 : 
            (data.epic == '1') ? 3 : (data.featureScore != '0') ? 2 : (data.stars != '0') ? 1 : 0 }

    const cDifficulty = (data) => {
        if (data.stars == '10') {
            return (data.demonDiff == '3') ? 7 : (data.demonDiff == '4') ? 8 : (data.demonDiff == '0') ? 9 :
            (data.demonDiff == '5') ? 10 : 11 } 
        else { 
            return data.stars == '1' ? 1 : data.stars == '2' ? 2 : data.stars == '3' ? 3 :
            data.stars == '4' || data.stars ==  '5' ? 4 : data.stars == '6' || data.stars ==  '7' ? 5 : 
            data.stars == '8' || data.stars ==  '9' ? 6 : 0 }}

    const cLength = (num) => {
        return num=='0' ? 'Tiny' : num=='1' ? 'Short' : num=='2' ? 'Medium' : num=='3' ? 'Long' : 'XL' }

    const decodeRobert64 = (str) => {
        return atob(str.replace(/-/g, '+').replace(/_/g, '/')); }

    function findCreator(obj, id) {
        try { return obj[String(id)] != undefined ? obj[String(id)] : '-' } 
        catch (err) { return '-' } }

    function findSong(obj, id, oID) {
        try{
            let l = id != '0' ? obj[String(id)] : robSongs[String(oID)]
            return l != undefined ? l : robSongs["0"] 
        } catch (err) {
            return robSongs["0"]
        }
    }
    /*
    ok so if we have page 0 -> page 0, 1
    page 1 -> page 2, 3
    page 2 -> page 4, 5
    page 3 -> page 6, 7
    */

    try { 
        // get the data yum yum
        const part = (page%2) + 1
        const truePage = page%2==0 ? page/2 : (page-1)/2
        const data = await getLevels(input, truePage, param)
        const levels = data[0]
        const creators = data[1]
        const songs = data[2]
        const totalOnPage = Math.ceil(Number(data[3])/5)
        let embed
        if (!isNaN(Number(input))) {
            const level = levels[0]
            const creator = findCreator(creators, level.pID)
            const song = findSong(songs, level.songID, level.oID)
            const coin = Number(level.verifiedCoins) ? gdIcons[3] : gdIcons[44]
            let embed = new EmbedBuilder()
                .setColor("#89c0ff")
                .setTitle(`${gdIcons[9]} you're level sir (gender-neutral)`)
                .addFields({ 
                    name: `${gdIcons[6]} **${level.name}** by ${creator[0]} | ${level.stars != '0' ? `${gdIcons[0]} ${level.stars} | ` : ``}${cDifficulty(level) > 0 ? gdIcons[24+cDifficulty(level)] : gdIcons[42]} ${cRating(level) > 0 ? gdIcons[34+cRating(level)] : ``}`,
                    value: `
                    ${gdIcons[45]} __${song[0]} by ${song[1]} | \`${level.songID != '0' ? level.songID : Number(level.oID)+1}\`__
                    \`${level.desc != '' ? decodeRobert64(level.desc) : 'No description'}\`
                    ${gdIcons[41]} \`${level.downloads}\`
                    ${gdIcons[40]} \`${level.likes}\`
                    ${gdIcons[43]} \`${cLength(level.length)}\`
                    ${Number(level.coins) ? coin.repeat(Number(level.coins)) : ``}
                    `
            })
            .setFooter({text: `:3`})
            send({embeds: [embed]});

        } else {
            let limit = Math.min(part==1 ? 5 : 10, levels.length)
            let embed = new EmbedBuilder()
            .setColor("#89c0ff")
            .setTitle(`${gdIcons[6]} LEVELS!!!!!!!!`)
            for (let i=part==1 ? 0 : 5;i < limit;i++) {
                let level = await levels[i]
                let creator = findCreator(creators, level.pID) 
                let song = findSong(songs, level.songID, level.oID)
                let length = cLength(level.length)
                
                embed.addFields({
                    name: `\`${(i+1)+(10*truePage)}:\` ${gdIcons[47]} **${level.name}** by **${creator}** | \`${level.lID}\``,
                    value: `${gdIcons[45]} ${song[0]} by ${song[1]} \`${level.songID != '0' ? level.songID : Number(level.oID)+1}\` | \`${length}\`
                    ${gdIcons[41]} \`${level.downloads}\` ${gdIcons[40]} \`${level.likes}\``
                })
            }
            send({embeds: [embed.setFooter({text: `Page ${page+1}/${totalOnPage} | :3 gdlevel [query]%(page)%(param) | :3`})]});
        }
    }
    catch (err) { 
        send((err.message).includes("500") ? "`Level not found or robtop servers are xd`" :
        (err.message).includes("Cannot read properties of undefined") ? `no level like that blehhhhhh` : `aero fucked up lmao ${err.message}`)
        console.log(err)
}}}