import { REST, Routes } from 'discord.js';
import 'dotenv/config';
import { toSlashJSON } from './commands.js';
import fs from 'fs';
import path from 'path';

const slashCommands = [];

async function loadCommands(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      loadCommands(fullPath);
    } else if (file.endsWith('.js')) {
      const cmd = (await import(fullPath)).default;
      slashCommands.push({
        name: cmd.name,
        description: cmd.description,
        options: cmd.options || []
      });
    }
  }
}

await loadCommands(path.resolve('./commands'));

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
const body = toSlashJSON();

(async () => {
  await rest.put(
    Routes.applicationGuildCommands(process.env.APP, process.env.GUILD),
    { body }
  );
  console.log(`✓ Registered ${body.length} guild slash commands`);
})();
