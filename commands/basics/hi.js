import {rand} from '../../extras.js'

export default {
  name: 'hi', description: 'yea', options: [],
// --------------------------------------------------------------------------------------------//
  async run(ctx) {
    const send = (msg) => ctx.type === 'slash' ? ctx.interaction.reply(msg) : ctx.message.reply(msg);

    const responses = [
        "helloooooo",
        "bored",
        ":3",
        "gm",
        "hiiiiiiiiiiiiiiiiiiii",
        "lazy",
    ]
    
    send(rand(responses));
  }
};