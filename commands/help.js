import {rand} from '../extras.js'
import { EmbedBuilder } from 'discord.js'

export default {
  name: 'help',
  description: 'yeaaaaa',
  options: [],
  async run(ctx) {
    const send = (msg) => ctx.type === 'slash'
      ? ctx.interaction.reply(msg)
      : ctx.message.reply(msg);
    const embed = new EmbedBuilder()
            .setColor("#8989ff")
            .setTitle("help")
            .setDescription("commands here prob")
            .addFields({name: "silly", 
                value: "``:33 help`` - this\n``:33 ping`` - pong\n``:33 hi`` - bored"+
                "\n``:33 repeat [text]`` - self-explainatory\n``:33 slip`` - slip!\n``:33 math [math]`` - :nerd:"
            })
            .setFooter({text: "slip technologies corp 2025-2025"})
    send({embeds: [embed]});
  }
};