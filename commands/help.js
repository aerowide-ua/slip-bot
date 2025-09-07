
import { EmbedBuilder } from 'discord.js'

export default {
  name: 'help', description: 'yeaaaaa',
  options: [],

  async run(ctx) {
    const send = (msg) => ctx.type === 'slash' ? ctx.interaction.reply(msg) : ctx.message.reply(msg);
  // --------------------------------------------------------------------------------------------//
    // yea its not even that interesting lmao
    const embed = new EmbedBuilder()
            .setColor("#8989ff")
            .setTitle("help")
            .setDescription("slip commands!! (prefix is ``:3``)")
            .addFields({name: "BASIC", 
                value: "``help`` - this\n``ping`` - pong\n``hi`` - hello"+
                "\n``r [text]`` - my talking slip\n``pat`` - please do\n``cf`` - coineflip"+
                "\n``number [numbr]`` - random\n``q (text)`` - opinions\n``explode [text]`` - :boom:\n``oh`` - oh\n``thunder`` - :zap:\n``bored`` - bored"
            , inline: true},
            {name: "GD + MISC", 
                value: "``gdprofile [user/id]`` - pro fail\n``gdlevel [name/id]`` - levelezzzz :3"+
                "\n``math [math]`` - :nerd:\n``meow`` - :3\n``slip`` - yaaaaaay\n``pukeko`` - DAAAAMMMMNNN\n``rrm`` - ROBTOP RATING MACHINE"+
                "\n``b64 [text]`` - base64 thing \n``devlog`` - news lol"
            , inline: true},
            {name: "SWAG", 
                value: "``profile`` - ure profile\n``job`` - crazy and evers\n``reminder [time] [text]`` - reminderrrr\n``ach`` - achievnment"
            , inline: true}
          
          
          
          )
            .setFooter({text: "slip technologies corp 2025-2025"})

    send({embeds: [embed]});
  }
};