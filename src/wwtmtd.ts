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

async function getPlayerList(channel: Discord.TextChannel): Promise<string> {
    let game = games.get(channel.id);

    let dictator: string = '';
    let contestants: string[] = [];

    for (let player of game.players) {
        let user: Discord.User;
        let member: Discord.GuildMember;

        await client.fetchUser(player.id).then(u => user = u);
        await channel.guild.fetchMember(user).then(g => member = g);
        
        if (player.name == 'Contestant')
            contestants.push(`• ${member.nickname || user.username}`);
        else
            dictator = `Supreme Leader: ${member.nickname || user.username}`;
    }

    if (contestants.length == 0)
        return dictator + '\r\nContestants: None';

    return dictator + '\r\nContestants:\r\n' + contestants.join('\r\n');
}

function checkEnd (channel: Discord.TextChannel): void {
    let game = games.get(channel.id);
    let howManyAlive = game.howManyAlive();

    if (howManyAlive < 2)
        channel.send('error: less than two players left');

    else if (howManyAlive == 2) {
        let contestant: Player;
        if (game.players[0].name == 'Contestant')
            contestant = game.players[0];
        else
            contestant = game.players[1];

        channel.send(`Congratulations, ${contestant.id}! You won the game and you get to marry the Supreme Leader!`);
        game.state = Game.State.SETUP;
        for (let player of game.players)
            player.status = Player.Status.ALIVE;
    }

    else getPlayerList(channel as Discord.TextChannel).then(m => channel.send(m));
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
            message.channel.send('Started game. Welcome, Supreme Leader.');

            let b: Player = new Player("The Supreme Leader", message.author.id);
            a.dictator = b;
            a.addPlayer(b);
            getPlayerList(message.channel as Discord.TextChannel).then(m => message.channel.send(m));
        }
        else message.channel.send('There\'s no game running in this channel.');
        return;
    }

    // if game exists...
    let player: Player = game.getPlayer(message.author.id);

    switch (command) {
        case 'ban':
            if (game.state == Game.State.SETUP) {
                message.channel.send('The Supreme Leader must start the game first.');
            }
            else if (player && player.name == 'The Supreme Leader') {
                game.banWord(arg);
                message.channel.send('Banned word: ' + arg);
            }
            else message.channel.send('Only the Supreme Leader can issue bans.');
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
                getPlayerList(message.channel as Discord.TextChannel).then(m => message.channel.send(m));
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
                message.channel.send("toodle");
                getPlayerList(message.channel as Discord.TextChannel).then(m => message.channel.send(m));
            }
            break;

        case 'change':
            let newID: RegExpExecArray = /<@(\d*)>/.exec(arg);
            if (game.getPlayer(message.author.id).name === "Contestant"){
                message.channel.send('How dare you disrespect our Supreme Leader.');                
            } else if (game.state == Game.State.PLAYING) {
                message.channel.send('The game has already started!');
            } else if (game.getPlayer(newID[1]).name !== "The Supreme Leader"){
                game.getPlayer(newID[1]).name = "The Supreme Leader";
                game.getPlayer(message.author.id).name = "Contestant";
                game.dictator = game.getPlayer(newID[1]);

                message.channel.send("All hail our new Supreme Leader, " + "<@" + newID[1] +">");
                getPlayerList(message.channel as Discord.TextChannel).then(m => message.channel.send(m));

            } else if (game.getPlayer(newID[1]).name === "The Supreme Leader"){
                message.channel.send("You're already the Supreme Leader. All hail the Supreme Leader.");                
            } 
            break;

        case 'ready':
            if (game.state == Game.State.PLAYING)
                message.channel.send('The game has already started!');
        
            else if (!player || player.name == 'Contestant')
                message.channel.send('Only the Supreme Leader can start the game.');
        
            else if (game.players.length < 3)
                message.channel.send('You need at least three players (one Supreme Leader and two contestants) to play.');
            
            else {
                game.startRound();
                message.channel.send('Welcome to Who Wants to Marry the Dictator! (starting round...)');
            }
            break;

        case 'exit':
            if (player.name == 'Contestant')
                message.channel.send('Only the Supreme Leader can exit the game.');

            else if (game.exitConfirm) {
                games.delete(message.channel.id);
                message.channel.send('Game exited.');
            }
            else {
                game.exitConfirm = true;
                message.channel.send(`Sure you want to exit the game? Type \`${prefix} exit\` again to confirm or \`${prefix} cancel\` to cancel.`);
            }
            break;

        case 'cancel':
            if (!game.exitConfirm)
                message.channel.send('There\'s nothing to cancel right now.');
            
            else if (player.name == 'Contestant')
                message.channel.send('Only the Supreme Leader can exit the game.');

            else {
                game.exitConfirm = false;
                message.channel.send('Game will continue.');
            }
            break;

        default:
    }
};

client.login(config.token);