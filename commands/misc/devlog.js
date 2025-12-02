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
                    name: `update 0.8.88`,
                    value: 
                    '- added ACHIEVEMENTS\n'+
                    '- added coinflip lol\`\n'+
                    '- big fixes big everything\n'+
                    '- more tweaks :boom:\n'+
                    '- even more mischief otw,,,,,,\n'
                    

                })
                .setFooter({text: `:3`})
    // evil message-sending shenanigans
    await send({embeds: [embed]});   
  }
}