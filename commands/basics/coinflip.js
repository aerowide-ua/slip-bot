import {randn} from '../../extras/extras.js'

export default {
  name: 'cf', description: 'coinflip',

// --------------------------------------------------------------------------------------------//
  async run(ctx) {
    await ctx.message.channel.send({ content:`${randn(2) == 0 ? "heads" : "tails"} cro`});
  }
}
