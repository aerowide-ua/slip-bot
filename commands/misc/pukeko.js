import {rand} from '../../extras/extras.js'
import {pukekos} from '../../extras/important/pukekos.js'

export default {
  name: 'pukeko', description: 'yea', options: [],

// --------------------------------------------------------------------------------------------//

  async run(ctx) {
    const send = (msg) => ctx.type === 'slash' ? ctx.interaction.reply(msg) : ctx.message.reply(msg);
    let randimage = rand(pukekos)
    while (rand(pukekos) == '') { randimage = rand(pukekos) }
    send(randimage);
  }
};