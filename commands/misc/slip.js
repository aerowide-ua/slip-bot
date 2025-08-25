import {rand} from '../../extras.js'
import { EmbedBuilder, AttachmentBuilder } from 'discord.js'

export default {
  name: 'slip', description: 'yea', options: [],
// --------------------------------------------------------------------------------------------//
  async run(ctx) {
    const send = (msg) => ctx.type === 'slash' ? ctx.interaction.reply(msg) : ctx.message.reply(msg);

    const images = [
        ["ralslip.png", "aerowide"], ["ralslip alt.png", "aerowide"], ["revengeseekerz.png", "aerowide"], 
        ["SLIP.png", "aerowide"], ["slipp.png", "aerowide"], ["slipper.png", "aerowide"], 
        ["slippppp.png", "aerowide"], ["yea idk.png", "aerowide"], ["inkmage.jpg", "InkMage"], 
        ["laterescalator.png", "LaterEscalator"], ["lightrailtransit.png", "LightRailTransit"], ["mila.png", "avxiell"], 
        ["toffeesan.png", "ToffeeSan"], ["kervytc.png", "KervyTheCreator"]
    ]

    const randimage = rand(images)
    const image = new AttachmentBuilder(`~/../media/images/${randimage[0]}`, {name: 'slipppppp.png'})
    const embed = new EmbedBuilder()
    .setTitle("slip")
    .setImage(`attachment://slipppppp.png`)
    .setFooter({text: `by ${randimage[1]}`})

    send({embeds: [embed], files: [image]});
  }
};