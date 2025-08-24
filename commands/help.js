
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
            .setDescription("commands here prob (prefix is ``:3``")
            .addFields({name: "silly", 
                value: "``help`` - this\n``ping`` - pong\n``hi`` - bored"+
                "\n``repeat [text]`` - self-explainatory\n``slip`` - slip!\n``math [math]`` - :nerd:\n``meow`` - meowww (in vc)"+
                "\n``number [numbr]`` - random\n``q (text)`` - yeagh\n``explode [text]`` - :boom:\n``oh`` - oh"
            })
            .setFooter({text: "slip technologies corp 2025-2025"})
    send({embeds: [embed]});
  }
};