import { Client, GatewayIntentBits, Events, ActivityType } from 'discord.js';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import express from "express"
import db from './db.js'
import { EmbedBuilder } from 'discord.js'
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
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates 
  ]
});

// --- Configure these ---
// Replace with the channel ID to watch
const IMAGE_WATCH_CHANNEL_ID = '1408531606129348621';
// Replace with an array of user IDs that should trigger the reaction
const IMAGE_TRIGGER_USER_IDS = new Set(['409711012267425792']);
// Emoji to react with (Unicode or custom like '<:name:id>')
const IMAGE_REACTION_EMOJI = '<:MITIK:1458896136944222258>';
// ----------------------


client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot || !message.content.startsWith(PREFIX)) return;

  const [name, ...args] = message.content.slice(PREFIX.length).trim().split(/\s+/);
  const cmd = commandsMap.get(name.toLowerCase())
  if (!cmd) return;

  try { await cmd.run({ type: 'text', message, args, client }); } 
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

  try { await cmd.run({ type: 'text', message, args, client }); } 
  catch (err) {
    console.error(err);
    await message.reply('ough.');
}});

setInterval(async () => {
  const now = Date.now()
  const dueReminders = db.prepare(`
    SELECT * FROM reminders 
    WHERE status='pending' AND dueTime <= ?
  `).all(now);

  for (const reminder of dueReminders) {
    try {
      const user = await client.users.fetch(reminder.userId);
      if (user) { await user.send(`reminderrrrrr \`${reminder.text}\``);}
      db.prepare(`UPDATE reminders SET status='done' WHERE id=?`).run(reminder.id);
    } catch (err) { console.error(`Failed to send reminder to ${reminder.userId}:`, err);}
  }
}, 10 * 1000); 

client.once(Events.ClientReady, (c) => {
  console.log(`slip initiated: ${c.user.tag}`);
  client.user.setActivity('Jane Remover', { type: ActivityType.Listening})
});

// React with an emoji when certain users post images in a specific channel
client.on(Events.MessageCreate, async (message) => {
  try {
    if (message.author.bot) return;
    if (message.channel.id !== IMAGE_WATCH_CHANNEL_ID) return;
    if (!IMAGE_TRIGGER_USER_IDS.has(message.author.id)) return;
    if (!message.attachments || message.attachments.size === 0) return;

    const hasImage = [...message.attachments.values()].some(att => {
      const ct = att.contentType;
      if (ct && ct.startsWith('image')) return true;
      const name = att.name || att.url || '';
      return /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(name);
    });
    if (!hasImage) return;

    await message.react(IMAGE_REACTION_EMOJI);
  } catch (err) { console.error('oughhhh', err); }
});

client.login(process.env.TOKEN);

