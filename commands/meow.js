import { rand } from '../extras.js';
import path from 'path';
import { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } from '@discordjs/voice';

export default {
  name: 'meow',
  description: 'yippee',
  options: [],
  async run(ctx) {
    const send = (msg) => ctx.type === 'slash'
      ? ctx.interaction.reply(msg)
      : ctx.message.reply(msg);

    const guild = ctx.message.guild;
    const meows = ["meow1.mp3", "meow2.mp3", "meow3.mp3", "purr.mp3"];

    await ctx.message.channel.send({ content: 'moew', ephemeral: true });

    let voiceChannel = ctx.type === 'slash' ? ctx.interaction.member.voice.channel : ctx.message.member.voice.channel;
    if (!voiceChannel) voiceChannel = guild.channels.cache.find(c => c.type === 2 && c.joinable);
    if (!voiceChannel) return send('oh');

    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator
    });

    const player = createAudioPlayer();
    await connection.subscribe(player);


    const resource = createAudioResource(path.join(process.cwd(), 'commands', 'media', 'sounds', rand(meows)));
    player.play(resource);

    player.on(AudioPlayerStatus.Idle, () => {
      connection.destroy();
    });
  }
};