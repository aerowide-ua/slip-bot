import { evaluate, format } from 'mathjs';

export default {
  name: 'math', description: 'hi hello',
  options: [{
        name: 'text', description: 'text here cro',
        type: 3, required: true
  }],
// --------------------------------------------------------------------------------------------//
  async run(ctx) {
    const send = (msg) => ctx.type === 'slash' ? ctx.interaction.reply(msg) : ctx.message.reply(msg);

    // get the response
    const content = (ctx.type === 'text') ? ctx.args.join(' ') : ctx.interaction.options.getString('text');

    // if user didnt fuck up
    try {
      const thing = format(evaluate(content), {precision: 15}).toString().slice(0, 128); // preprocessing :3
      await send({ content:`\`${thing}\` :nerd:`, allowedMentions: { parse: [] }} ); }

    // if user DID fuck up
    catch (err) { send(`errrrrm \`${err.message.slice(0, 128)}\` :nerd::nerd::nerd:`)} } 
}