export default {
  name: 'ping',
  description: 'bong',
  options: [],
  async run(ctx) {
    const send = (msg) => ctx.type === 'slash'
      ? ctx.interaction.reply(msg)
      : ctx.message.reply(msg);

    send(`wha huh`);
  }
};
