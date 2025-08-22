import { REST, Routes } from 'discord.js';
import 'dotenv/config';
import { toSlashJSON } from './commands.js';

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
const body = toSlashJSON();

(async () => {
  await rest.put(
    Routes.applicationGuildCommands(process.env.APP, process.env.GUILD),
    { body }
  );
  console.log(`✓ Registered ${body.length} guild slash commands`);
})();
