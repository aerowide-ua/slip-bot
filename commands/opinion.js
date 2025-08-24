import {rand} from '../extras.js'

export default {
  name: 'q',
  description: 'b',
  options: [],
  async run(ctx) {
    const send = (msg) => ctx.type === 'slash'
      ? ctx.interaction.reply(msg)
      : ctx.message.reply(msg);

    const responses = [
        "i agre",
        "booooooring",
        ":3",
        "i blame robtop",
        "meow",
        "mraw",
        "meowowowow",
        "yes yes yes maybe perchance",
        "purr",
        "do you ever feel",
        "like a plastic bag",
        "skjgalrhkgergj;lekthg",
        "nuke cherryteam",
        "lazy",
        "lazyyyy",
        "lazyyyyyyyyy",
        "laaaaazyyyyyyyyyy",
        "what no",
        "gog",
        "gogogogogogog",
        "i mean sure whatever",
        "nuh uh",
        "bored",
        "truth nuke",
        "yeagh",
        "naw",
        "mrow (disapproving)",
        "no",
        "ask galo",
        "maybe ask galo",
        "idk lol",
        "throws alvaro at you",
        "https://media.discordapp.net/attachments/777652753274503209/1255784665562873978/f84ef8743b2dec20.gif",
        "https://media.discordapp.net/attachments/1257260830219702386/1316772168079507496/twitter_1866991196440236117.gif",
        "https://media.discordapp.net/attachments/1325809511474139157/1361095416480927974/twitter_1910946284233449891-ezgif.com-optimize.gif",
        "https://media.discordapp.net/attachments/1257260830219702386/1371543072583979205/twitter_1920350058119131444-ezgif.com-optimize.gif",
        "https://tenor.com/view/cat-gif-12619705825376795407",
        "https://media.discordapp.net/attachments/1194114118551085108/1333826358828204195/togif.gif",
        "https://media.discordapp.net/attachments/1257260830219702386/1342901109206814793/image1.gif",
        "https://tenor.com/view/cat-cat-glare-still-cat-still-gif-9009712384077510927"

    ]
    const res = ctx.args.join(" ")
    if (res.includes("do you ever feel")) { send("like a plastic bag") } 
    else if (res.includes("cherry team") || res.includes("cherryteam")) { send("nuke cherryteam") } 
    else{ send(rand(responses)); }
  }
};