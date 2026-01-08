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

const ARTWORK_CHANNEL = '1257267472625832046';
const COOL_PEOPLE = new Set([
  '409711012267425792', // ts so me
  '1310685893660639245', // yurinator 3000
  '787557122362834945', // galofuck
  '584814499563831305', // boss rush 3 free download
  '1385976742358941756', // burger
  '842000448025657346', // doe deer
  '1170741328930406423', // weeb
  '702270843148959815', // gd thumbnail olympics 727x gold
]);
const MITIKKKK = '<:MITIK:1458896136944222258>';

// ----------------------
const MITIK_CERTIFIED = new Set([
  '1458903299456499816',
]);


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

// MITIK react in artwork
client.on(Events.MessageCreate, async (message) => {
  try {
    if (message.author.bot) return;
    if (message.channel.id !== ARTWORK_CHANNEL) return;
    let member = message.member;
    if (!member && message.guild) {
      try { member = await message.guild.members.fetch(message.author.id); } catch (e) { /* ignore */ }
    }
    const hasRole = !!member && member.roles && member.roles.cache && [...member.roles.cache.values()].some(r => MITIK_CERTIFIED.has(r.id));
    if (!COOL_PEOPLE.has(message.author.id) && !hasRole) return;
    if (!message.attachments || message.attachments.size === 0) return;

    const hasImage = [...message.attachments.values()].some(att => {
      const ct = att.contentType;
      if (ct && ct.startsWith('image')) return true;
      const name = att.name || att.url || '';
      return /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(name);
    });
    if (!hasImage) return;

    await message.react(MITIKKKK);
  } catch (err) { console.error('oughhhh', err); }
});

client.login(process.env.TOKEN);

