export default {
  name: 'bored', description: 'd', options: [],
// --------------------------------------------------------------------------------------------//
  async run(ctx) {
    const send = (msg) => ctx.type === 'slash' ? ctx.interaction.reply(msg) : ctx.message.reply(msg);
    const random = (num) => Math.floor(Math.random()*num)
    const response = random(20) != 16 ? `${'a'.repeat(random(13))}ame` : 'https://www.boredbutton.com/'
    send(response);
  }
};
