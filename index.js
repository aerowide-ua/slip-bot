import { Client, GatewayIntentBits, Events } from 'discord.js';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';

const PREFIX = ':33';
const commandsMap = new Map();

// Recursively load commands from folder
async function loadCommands(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      await loadCommands(fullPath);
    } else if (file.endsWith('.js')) {
      const cmd = (await import(fullPath)).default;
      commandsMap.set(cmd.name, cmd);
    }
  }
}

// Load commands dynamically
await loadCommands(path.resolve('./commands'));

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once(Events.ClientReady, (c) => {
  console.log(`✅ Logged in as ${c.user.tag}`);
});

// Handle text commands
client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot || !message.content.startsWith(PREFIX)) return;

  const [name, ...args] = message.content.slice(PREFIX.length).trim().split(/\s+/);
  const cmd = commandsMap.get(name.toLowerCase());
  if (!cmd) return;

  try {
    await cmd.run({ type: 'text', message, args });
  } catch (err) {
    console.error(err);
    await message.reply('Something went wrong.');
  }
});

// Handle slash commands
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const cmd = commandsMap.get(interaction.commandName);
  if (!cmd) return;

  try {
    await cmd.run({ type: 'slash', interaction });
  } catch (err) {
    console.error(err);
    if (interaction.deferred || interaction.replied) {
      await interaction.editReply('ough.');
    } else {
      await interaction.reply({ content: 'ough.', ephemeral: true });
    }
  }
});

client.login(process.env.TOKEN);

