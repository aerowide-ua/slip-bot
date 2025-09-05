import { EmbedBuilder } from 'discord.js'

export default {
  name: 'devlog', description: 'lol',

// --------------------------------------------------------------------------------------------//

  async run(ctx) {
    const send = (msg) => ctx.type === 'slash' ? ctx.interaction.reply(msg) : ctx.message.channel.send(msg);

    
    const embed = new EmbedBuilder()
                .setColor("#89c0ff")
                .setTitle(`dev log!!!!!`)
                .addFields({
                    name: `update 0.7.27.1`,
                    value: 
                    '- base64 thingy \`:3 b64\`\n'+
                    '- more pukekos\n'+
                    '- very basic \`:3 profile\` command\n'+
                    '- we added unfairly paid work to slip 3 am do not try at hom \`:3 job\`\n'+
                    '- \`:3 pat\` now has a counter!!\n'+
                    '- overall just added a database for silly\n'+
                    '- bug fixes\n'+
                    '- this command\n'+
                    '- MOAR slips \`(.1)\`'

                })
                .setFooter({text: `:3`})
    // evil message-sending shenanigans
    await send({embeds: [embed]});   
  }
}