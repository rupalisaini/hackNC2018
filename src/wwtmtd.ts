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

    // check for and handle commands
    if (exec != null)
        handleCommand(exec[1].trim(), message, game);

    // then check for banned words
    else if (game && game.state == Game.State.PLAYING) {
        let player: Player = game.getPlayer(message.author.id);

        if (player && player.status == Player.Status.ALIVE && player.name == 'Contestant') {
            let bannedWord: string = game.banCheck(message.content);

            if (bannedWord) {
                channel.send(`You used the banned phrase "${bannedWord}"!`);
                channel.send(`<@${message.author.id}> has been executed!`);
                player.status = Player.Status.DEAD;
                checkEnd(channel);
            }
        }
    }

    console.log(message.content);
});

function checkEnd (channel: Discord.TextChannel): void {
    let game = games.get(channel.id);
    let howManyAlive = game.howManyAlive();

    if (howManyAlive < 2)
        channel.send('error: less than two players left');

    if (howManyAlive == 2) {
        let contestant: Player;
        if (game.players[0].name == 'Contestant')
            contestant = game.players[0];
        else
            contestant = game.players[1];

        channel.send(`Congratulations, ${contestant.id}! You won the game and you get to marry the dictator!`);
        game.state = Game.State.SETUP;
        for (let player of game.players)
            player.status = Player.Status.ALIVE;
    }
}

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
            a.dictator = b;
            a.addPlayer(b);
            message.channel.send("Welcome Supreme Leader.");
        }
        else message.channel.send('There\'s no game running in this channel.');
        return;
    }

    // if game exists...
    let player: Player = game.getPlayer(message.author.id);

    switch (command) {
        case 'ban':
            if (game.state == Game.State.SETUP) {
                message.channel.send('The dictator must start the game first.');
            }
            else if (player && player.name == 'The Supreme Dictator') {
                game.banWord(arg);
                message.channel.send('Banned word: ' + arg);
            }
            else message.channel.send('Only the dictator can issue bans.');
            break;

        case 'start':
            message.channel.send('Game already exists in this channel.');
            break;

        case 'join':
            if (game.state == Game.State.PLAYING) {
                  message.channel.send('The game has already started!');
            } else if (game.getPlayer(message.author.id) !== null){
                message.channel.send("You can't join the game twice!!!!!!");
                break;
            } else if (game.players.length < 9){
                let b: Player = new Player("Contestant", message.author.id);
                game.addPlayer(b);
                message.channel.send("Welcome, peasant.");
                message.author.send("hello");
            } else {
                message.channel.send("Stahp");
            }
            break;

        case 'leave':
            if (game.state == Game.State.PLAYING)
                message.channel.send('The game has already started!');

            else if (game.getPlayer(message.author.id) === null)
                message.channel.send("You can't leave the game if you're not in it!!!!!");

            else {
                game.removePlayer(message.author.id);
                message.channel.send("toodle");c
            }
            break;

        case 'change':
            let newID: RegExpExecArray = /<@(\d*)>/.exec(arg);
            if (game.getPlayer(message.author.id).name === "Contestant"){
                message.channel.send('How dare you disrespect our Supreme Leader.');                
            } else if (game.state == Game.State.PLAYING) {
                message.channel.send('The game has already started!');
            } else if (game.getPlayer(newID[1]).name !== "The Supreme Dictator"){
                game.getPlayer(newID[1]).name = "The Supreme Dictator";
                game.getPlayer(message.author.id).name = "Contestant";
                game.dictator = game.getPlayer(newID[1]);
                let newUser: Discord.User;
                let promise: Promise<Discord.User> = client.fetchUser(newID[1]);
                promise.then(u => message.channel.send("All hail our new Supreme Leader, " + "<@" + newID[1] +">"));

            } else if (game.getPlayer(newID[1]).name === "The Supreme Dictator"){
                message.channel.send("You're already the Supreme Leader. All hail the Supreme Leader.");                
            } 
            break;

        case 'ready':
            if (game.state == Game.State.PLAYING)
                message.channel.send('The game has already started!');
        
            else if (!player || player.name == 'Contestant')
                message.channel.send('Only the dictator can start the game.');
        
            else if (game.players.length < 3)
                message.channel.send('You need at least three players (one dictator and two contestants) to play.');
            
            else {
                game.startRound();
                message.channel.send('Welcome to Who Wants to Marry the Dictator! (starting round...)');
            }
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