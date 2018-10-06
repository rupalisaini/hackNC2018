"use strict";
exports.__esModule = true;
var Discord = require("discord.js");
var client = new Discord.Client();
var config = require("./config");
var prefix = 'tator';
var games;
client.on('ready', function () {
    console.log("Logged in as " + client.user.tag + "!");
});
client.on('message', function (message) {
    var exec = new RegExp('^' + prefix + ' (.*)$').exec(message.content);
    if (exec != null)
        handleCommand(exec[1].trim());
    console.log(message.content);
});
function handleCommand(input) {
    var args = input.split(' ');
    var command = args.shift();
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
}
;
client.login(config.token);
