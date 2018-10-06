import * as Discord from 'discord.js';
const client = new Discord.Client();
import * as config from './config';

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(config.token);