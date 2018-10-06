import * as Discord from 'discord.js';
const client = new Discord.Client();
import * as config from './config';
import { Game } from './game';
import { Player } from './player';

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
        handleCommand(exec[1].trim(), message, game);

    // then check for banned words
    else if (game && game.players.some(p => p.id == message.author.id)) {
        if (game.banCheck(message.content))
            channel.send('BITCH');
    }

    console.log(message.content);
});

function handleCommand (input: string, message: Discord.Message, game: Game): void {
    let inputArr: string[] = input.split(' ');
    let command: string = inputArr.shift();
    let arg: string = inputArr.join(' ');

    // check to make sure game exists

    if (game == null) {
        if (command == 'start') {
            let a: Game = new Game();
            games.set(message.channel.id, a);
            message.channel.send('Started game.');
            let b: Player = new Player("The Supreme Dictator", message.author.id);
            a.addPlayer(b);
            message.channel.send("Welcome Supreme Leader.");
        }
        else message.channel.send('There\'s no game running in this channel.');
        return;
    }

    // if game exists...

    switch (command) {
        case 'ban':
            game.banWord(arg);
            message.channel.send('Banned word: ' + arg);
            break;

        case 'start':
            message.channel.send('Game already exists in this channel.');
            break;

        case 'join':
            if (game.getPlayer(message.author.id) !== null){
                message.channel.send("You can't join the game twice!!!!!!");
                break;
            }
            if (game.players.length < 9){
                let b: Player = new Player("Contestent", message.author.id);
                game.addPlayer(b);
                message.channel.send("Welcome, peasant.");
            } else {
                message.channel.send("Stahp");
            }
            break;
        case 'leave':
            if (game.getPlayer(message.author.id) === null){
                message.channel.send("You can't leave the game if you're not in it!!!!!");
                break;
            }
            game.removePlayer(message.author.id);
            message.channel.send("toodle");
            break;
        case 'change':
            break;
        case 'ready':
            break;

        case 'exit':
            if (game.exitConfirm) {
                games.delete(message.channel.id);
                message.channel.send('Game exited.');
            }
            else {
                game.exitConfirm = true;
                message.channel.send(`Sure you want to exit the game? Type \`${prefix} exit\` again to confirm or \`${prefix} cancel\` to cancel.`);
            }
            break;

        case 'cancel':
            if (game.exitConfirm) {
                game.exitConfirm = false;
                message.channel.send('Game will continue.');
            }
            else message.channel.send('There\'s nothing to cancel right now.');
            break;

        default:
    }
};

client.login(config.token);