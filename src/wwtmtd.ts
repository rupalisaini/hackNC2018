import * as Discord from 'discord.js';
const client = new Discord.Client();
import * as config from './config';
import { Game } from './game';

const prefix = 'tator';
let games: Map<number, Game>;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    let exec: RegExpExecArray = new RegExp('^' + prefix + ' (.*)$').exec(message.content);
    if (exec != null)
        handleCommand(exec[1].trim());
    console.log(message.content);
});

function handleCommand (input: string): void {
    let args: string[] = input.split(' ');
    let command: string = args.shift();
    console.log('handling command: ' + command);

    switch (command) {
        case 'start':
            break;
        case 'join':
            break;
        case 'leave':
            break;
        case 'change':
            break;
        case 'ready':
            break;
        case 'cancel':
            break;
        default:
    }
};

client.login(config.token);