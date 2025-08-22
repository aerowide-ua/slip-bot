import { REST, Routes } from 'discord.js';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';

const slashCommands = [];

async function loadCommands(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      await loadCommands(fullPath);
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

(async () => {
  try {
    console.log(`Deploying ${slashCommands.length} slash commands...`);
    await rest.put(
      Routes.applicationGuildCommands(process.env.APP, process.env.GUILD),
      { body: slashCommands }
    );
    console.log('✓ Successfully registered slash commands');
  } catch (error) {
    console.error(error);
  }
})();

