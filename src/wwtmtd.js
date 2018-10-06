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
    // check for commands
    if (exec != null)
        handleCommand(exec[1].trim(), message, game);
    else if (game && game.players.some(function (p) { return p.id == message.author.id; })) {
        if (game.banCheck(message.content))
            channel.send('BITCH');
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
    switch (command) {
        case 'ban':
            game.banWord(arg);
            message.channel.send('Banned word: ' + arg);
            break;
        case 'start':
            message.channel.send('Game already exists in this channel.');
            break;
        case 'join':
            if (game.players.length < 9) {
                var b = new player_1.Player("Contestent", message.author.id);
                game.addPlayer(b);
                message.channel.send("Welcome, peasant.");
            }
            else {
                message.channel.send("Stahp");
            }
            break;
        case 'leave':
            break;
        case 'change':
            break;
        case 'ready':
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
