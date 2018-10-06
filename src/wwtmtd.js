"use strict";
exports.__esModule = true;
var Discord = require("discord.js");
var client = new Discord.Client();
var config = require("./config");
var game_1 = require("./game");
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
        handleCommand(exec[1].trim(), channel, game);
    else if (game) {
        if (game.banCheck(message.content))
            channel.send('BITCH');
    }
    console.log(message.content);
});
function handleCommand(input, channel, game) {
    var inputArr = input.split(' ');
    var command = inputArr.shift();
    var arg = inputArr.join(' ');
    // check to make sure game exists
    if (game == null) {
        if (command == 'start') {
            games.set(channel.id, new game_1.Game());
            channel.send('Started game.');
        }
        else
            channel.send('There\'s no game running in this channel.');
        return;
    }
    // if game exists...
    switch (command) {
        case 'ban':
            game.banWord(arg);
            channel.send('Banned word: ' + arg);
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
        case 'cancel':
            break;
        default:
    }
}
;
client.login(config.token);
