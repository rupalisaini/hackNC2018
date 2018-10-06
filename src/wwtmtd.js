"use strict";
exports.__esModule = true;
var Discord = require("discord.js");
var client = new Discord.Client();
var config = require("./config");
var game_1 = require("./game");
var player_1 = require("./player");
var prefix = 'tator';
var games = new Map();
client.on('ready', function () {
    console.log("Logged in as " + client.user.tag + "!");
});
client.on('message', function (message) {
    if (message.author == client.user)
        return;
    var exec = new RegExp('^' + prefix + ' (.*)$').exec(message.content);
    var channel = message.channel;
    var game = games.get(channel.id);
    // check for and handle commands
    if (exec != null)
        handleCommand(exec[1].trim(), message, game);
    else if (game && game.state == game_1.Game.State.PLAYING) {
        var player = game.getPlayer(message.author.id);
        var bannedWord = game.banCheck(message.content);
        console.log(player, bannedWord, player.name);
        if (bannedWord && player && player.name == 'Contestant') {
            channel.send("You used the banned phrase \"" + bannedWord + "\"!");
            channel.send(message.member.nickname + " has been executed!");
            game.removePlayer(message.author.id);
        }
    }
    console.log(message.content);
});
function handleCommand(input, message, game) {
    var inputArr = input.split(' ');
    var command = inputArr.shift();
    var arg = inputArr.join(' ');
    // check to make sure game exists
    if (game == null) {
        if (command == 'start') {
            var a = new game_1.Game();
            games.set(message.channel.id, a);
            message.channel.send('Started game.');
            var b = new player_1.Player("The Supreme Dictator", message.author.id);
            a.addPlayer(b);
            message.channel.send("Welcome Supreme Leader.");
        }
        else
            message.channel.send('There\'s no game running in this channel.');
        return;
    }
    // if game exists...
    var player = game.getPlayer(message.author.id);
    switch (command) {
        case 'ban':
            if (game.state == game_1.Game.State.SETUP) {
                message.channel.send('The dictator must start the game first.');
            }
            else if (player && player.name == 'The Supreme Dictator') {
                game.banWord(arg);
                message.channel.send('Banned word: ' + arg);
            }
            else
                message.channel.send('Only the dictator can issue bans.');
            break;
        case 'start':
            message.channel.send('Game already exists in this channel.');
            break;
        case 'join':
            if (game.state == game_1.Game.State.PLAYING) {
                message.channel.send('The game has already started!');
            }
            else if (game.getPlayer(message.author.id) !== null) {
                message.channel.send("You can't join the game twice!!!!!!");
                break;
            }
            else if (game.players.length < 9) {
                var b = new player_1.Player("Contestant", message.author.id);
                game.addPlayer(b);
                message.channel.send("Welcome, peasant.");
            }
            else {
                message.channel.send("Stahp");
            }
            break;
        case 'leave':
            if (game.state == game_1.Game.State.PLAYING) {
                message.channel.send('The game has already started!');
            }
            else if (game.getPlayer(message.author.id) === null) {
                message.channel.send("You can't leave the game if you're not in it!!!!!");
                break;
            }
            else {
                game.removePlayer(message.author.id);
                message.channel.send("toodle");
            }
            break;
        case 'change':
            var newID = /<@(\d*)>/.exec(arg);
            if (game.getPlayer(message.author.id).name === "Contestant") {
                message.channel.send('How dare you disrespect our Supreme Leader.');
            }
            else if (game.state == game_1.Game.State.PLAYING) {
                message.channel.send('The game has already started!');
            }
            else if (game.getPlayer(newID[1]).name !== "The Supreme Dictator") {
                game.getPlayer(newID[1]).name = "The Supreme Dictator";
                game.getPlayer(message.author.id).name = "Contestant";
                var newUser = void 0;
                var promise = client.fetchUser(newID[1]);
                promise.then(function (u) { return message.channel.send("All hail our new Supreme Leader, " + u.username); });
            }
            else if (game.getPlayer(newID[1]).name === "The Supreme Dictator") {
                message.channel.send("You're already the Supreme Leader. All hail the Supreme Leader.");
            }
            break;
        case 'ready':
            if (game.state == game_1.Game.State.PLAYING) {
                message.channel.send('The game has already started!');
            }
            else if (player && player.name == 'The Supreme Dictator') {
                game.startRound();
                message.channel.send('Welcome to Who Wants to Marry the Dictator! (starting round...)');
            }
            else
                message.channel.send('Only the dictator can start the game.');
            break;
        case 'exit':
            if (game.exitConfirm) {
                games["delete"](message.channel.id);
                message.channel.send('Game exited.');
            }
            else {
                game.exitConfirm = true;
                message.channel.send("Sure you want to exit the game? Type `" + prefix + " exit` again to confirm or `" + prefix + " cancel` to cancel.");
            }
            break;
        case 'cancel':
            if (game.exitConfirm) {
                game.exitConfirm = false;
                message.channel.send('Game will continue.');
            }
            else
                message.channel.send('There\'s nothing to cancel right now.');
            break;
        default:
    }
}
;
client.login(config.token);
