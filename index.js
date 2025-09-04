import { Client, GatewayIntentBits, Events, ActivityType } from 'discord.js';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import express from "express"
const app = express();

app.get("/", (req, res) => {
    res.send("staying alive :P");
});
app.listen(3000, () => console.log("HTTP server running on port 3000"));

const PREFIX = ':3';
const MENTION = '<@1408526120776630413>';
const commandsMap = new Map();


async function loadCommands(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) { await loadCommands(fullPath); } 
    else if (file.endsWith('.js')) {
      const cmd = (await import(fullPath)).default;
      commandsMap.set(cmd.name, cmd);
}}}

await loadCommands(path.resolve('./commands'));

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates 
  ]
});


// Handle text commands
client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot || !message.content.startsWith(PREFIX)) return;

  const [name, ...args] = message.content.slice(PREFIX.length).trim().split(/\s+/);
  const cmd = commandsMap.get(name.toLowerCase())
  if (!cmd) return;

  try { await cmd.run({ type: 'text', message, args }); } 
  catch (err) {
    console.error(err);
    await message.reply('ough.');
}});

// Handle slash commands
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const cmd = commandsMap.get(interaction.commandName);
  if (!cmd) return;

  try { await cmd.run({ type: 'slash', interaction }); } 
  catch (err) {
    console.error(err);
    if (interaction.deferred || interaction.replied) {
      await interaction.editReply('ough.');
    } else { await interaction.reply({ content: 'ough.', ephemeral: true }); }}
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot || !message.mentions.has(client.user)) return;

  const [name, ...args] = message.content.slice(MENTION.length).trim().split(/\s+/);
  const cmd = commandsMap.get('q')
  if (!cmd) return;

  try { await cmd.run({ type: 'text', message, args }); } 
  catch (err) {
    console.error(err);
    await message.reply('ough.');
}});


client.once(Events.ClientReady, (c) => {
  console.log(`slip initiated: ${c.user.tag}`);
  client.user.setActivity('Jane Remover', { type: ActivityType.Listening})
});

client.login(process.env.TOKEN);

