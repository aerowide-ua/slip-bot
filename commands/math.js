import { evaluate, format } from 'mathjs';

export default {
  name: 'math',
  description: 'hi hello',

  slashData: {
    name: 'math',
    description: 'yea',
    options: [
      {
        name: 'text',
        description: 'text here cro',
        type: 3, // STRING
        required: true
      }
    ]
  },
  async run(ctx) {
    if (ctx.type === 'text') {
        const content = ctx.args.join(' ');
        try { 
            const thing = format(evaluate(content), {precision: 15}).toString().slice(0, 100);
            await ctx.message.channel.send({ content:`\`${thing}\` :nerd:`, allowedMentions: { parse: [] }} );
        }
        catch (err) { ctx.message.channel.send(`errrrrm \`${err.message.slice(0, 67)}\` :nerd::nerd::nerd:`)}
        
        

    }

    if (ctx.type === 'slash') {
        const content = ctx.interaction.options.getString('text');
        try {
            const thing = format(evaluate(content), {precision: 15}).toString().slice(0, 100);
            await ctx.interaction.reply({ content:`\`${thing}\` :nerd:`, allowedMentions: { parse: [] }} );
        }
        catch (err) { ctx.message.channel.send(`errrrrm \`${err.message.slice(0, 67)}\` :nerd::nerd::nerd:`)}
        
        
    }
  }
}