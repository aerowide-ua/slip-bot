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
                    name: `update 0.8.00`,
                    value: 
                    '- removerd economy :tada:\n'+
                    '- primitive reminders !!! \`:3 remind [time] (text)\`\n'+
                    '- reputation system! 25 levels in total\n'+
                    '- big fixes and tweaks :boom:\n'+
                    '- more mischief otw,,,,,,\n'+
                    

                })
                .setFooter({text: `:3`})
    // evil message-sending shenanigans
    await send({embeds: [embed]});   
  }
}