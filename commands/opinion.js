import {rand} from '../extras.js'

export default {
  name: 'opinion',
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
        "nuke cherryteam"
    ]
    send(rand(responses));
  }
};