import {rand} from '../../extras/extras.js'

export default {
  name: 'q', description: 'b',
  options: [{
        name: 'text', description: 'text here cro',
        type: 3, required: true
  }],
// --------------------------------------------------------------------------------------------//
  async run(ctx) {
    // detect command type n stuff
    const send = (msg) => ctx.type === 'slash' ? ctx.interaction.reply(msg) : ctx.message.reply(msg);
    
    // self explainatory
    const responses = [
        // TEXT
        "i agre", "booooooring", ":3",
        "i blame robtop", "meow", "mraw",
        "meowowowow", "yes yes yes maybe perchance",
        "purr", "do you ever feel", "like a plastic bag",
        "skjgalrhkgergj;lekthg", "nuke cherryteam",
        "lazy", "lazyyyyyyyyy", "mmmmyea", "what no", "gog",
        "gogogogogogog", "i mean sure whatever",
        "nuh uh", "bored", "truth nuke",
        "yeagh", "naw", "mrow (disapproving)",
        "no", "ask galo", "maybe ask galo",
        "idk lol", "throws alvaro at you",
        "prob not", "maaaaybeee", "try asking galo",
        "mhm yea uhuh yup i agree", "what",
        "could you repeat that", "hmmmmm idk",
        "too busy hugging mocha try again later", ":33333333",
        "rubs my chin thoughtfully", "what am i supposed to do with this again",
        "have you tried putting it in rice", "@grok is this true",
        "yayayayaya", "unmusique aoty", "have you tried asking mila",
        "can you pat me first tho", "pat me cro", "pulls out a sharpie and draws you patting me on a sticky note before giving it to you",
        "NO", "NAH", "nopenopenope",

        // GIFS
        "https://media.discordapp.net/attachments/777652753274503209/1255784665562873978/f84ef8743b2dec20.gif",
        "https://media.discordapp.net/attachments/1257260830219702386/1316772168079507496/twitter_1866991196440236117.gif",
        "https://media.discordapp.net/attachments/1325809511474139157/1361095416480927974/twitter_1910946284233449891-ezgif.com-optimize.gif",
        "https://media.discordapp.net/attachments/1257260830219702386/1371543072583979205/twitter_1920350058119131444-ezgif.com-optimize.gif",
        "https://tenor.com/view/cat-gif-12619705825376795407",
        "https://media.discordapp.net/attachments/1194114118551085108/1333826358828204195/togif.gif",
        "https://media.discordapp.net/attachments/1257260830219702386/1342901109206814793/image1.gif",
        "https://tenor.com/view/cat-cat-glare-still-cat-still-gif-9009712384077510927"

    ]

    const cherryteams = [
      'nuke cherryteam', 'explode cherryteam', 'kill cherryteam', 'obliterate cherryteam', 'destroy cherryteam', 'throws alvaro at cherryteam'
    ]

    // get the (usually) stupid question
    const res = ctx.type === 'text' ? ctx.args.join(" ") : ctx.interaction.options.getString('text');
    const has = function (a) { return res.toLowerCase().includes(a) }

    // processing,,,,,
    if ( has("do you ever feel") ) { send("like a plastic bag") } 
    else if ( has("cherry team") || has("cherryteam") ) { send(rand(cherryteams)) } 
    else if ( has("moch") ) { send(":3") }
    else if ( has("two can play")) { send("but two's a crowd")}
    else if ( has("so theres two of me")) { send("im cloning out")}
    else if ( has("two can dance")) { send("get the music loud")}
    else if ( has("you a dead man flexin")) { send("show some :boom: now")}
    else{ send(rand(responses)); }
  }
};