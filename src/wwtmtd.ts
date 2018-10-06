import * as Discord from 'discord.js';
const client = new Discord.Client();
import * as config from './config';
import { Game } from './game';

const prefix = 'tator';
let games: Map<string, Game> = new Map<string, Game>();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    if (message.author == client.user)
        return;

    let exec: RegExpExecArray = new RegExp('^' + prefix + ' (.*)$').exec(message.content);
    let channel: Discord.TextChannel = message.channel as Discord.TextChannel;
    let game = games.get(channel.id);

    // check for commands
    if (exec != null)
        handleCommand(exec[1].trim(), channel, game);

    // then check for banned words
    else if (game && game.players.some(p => p.id == message.author.id)) {
        if (game.banCheck(message.content))
            channel.send('BITCH');
    }

    console.log(message.content);
});

function handleCommand (input: string, channel: Discord.TextChannel, game: Game): void {
    let inputArr: string[] = input.split(' ');
    let command: string = inputArr.shift();
    let arg: string = inputArr.join(' ');

    // check to make sure game exists

    if (game == null) {
        if (command == 'start') {
            games.set(channel.id, new Game())
            channel.send('Started game.');
        }
        else channel.send('There\'s no game running in this channel.');
        return;
    }

    // if game exists...

    switch (command) {
        case 'ban':
            game.banWord(arg);
            channel.send('Banned phrase: ' + arg);
            break;

        case 'start':
            channel.send('Game already exists in this channel.');
            break;

        case 'join':
            break;
        case 'leave':
            break;
        case 'change':
            break;
        case 'ready':
            break;

        case 'exit':
            if (game.exitConfirm) {
                games.delete(channel.id);
                channel.send('Game exited.');
            }
            else {
                game.exitConfirm = true;
                channel.send(`Sure you want to exit the game? Type \`${prefix} exit\` again to confirm or \`${prefix} cancel\` to cancel.`);
            }
            break;

        case 'cancel':
            if (game.exitConfirm) {
                game.exitConfirm = false;
                channel.send('Game will continue.');
            }
            else channel.send('There\'s nothing to cancel right now.');
            break;

        default:
    }
};

client.login(config.token);