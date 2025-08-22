import { Client, GatewayIntentBits, Events } from 'discord.js';
import 'dotenv/config';
import { PREFIX, commands } from './commands.js';

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent ]});

client.once(Events.ClientReady, (c) => { console.log(`Logged in as ${c.user.tag}`); });

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot || !message.content.startsWith(PREFIX)) return;

  const [name, ...args] = message.content.slice(PREFIX.length).trim().split(/\s+/);
  const cmd = commands[name.toLowerCase()];
  if (!cmd) return;

  try {
    await cmd.run({ type: 'text', message, args });
  } catch (err) {
    console.error(err);
    await message.reply('Something went wrong.');
  }});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const cmd = commands[interaction.commandName];
  if (!cmd) return;

  try {
    await cmd.run({ type: 'slash', interaction });
  } catch (err) {
    console.error(err);
    if (interaction.deferred || interaction.replied) {
      await interaction.editReply('Something went wrong.');
    } else {
      await interaction.reply({ content: 'Something went wrong.', ephemeral: true });
    }
  }
});

client.login(process.env.TOKEN);
