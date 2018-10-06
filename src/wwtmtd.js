"use strict";
exports.__esModule = true;
var Discord = require("discord.js");
var client = new Discord.Client();
var config = require("./config");
client.on('ready', function () {
    console.log("Logged in as " + client.user.tag + "!");
});
client.login(config.token);
