"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var Discord = require("discord.js");
exports.client = new Discord.Client();
var config = require("./config");
var game_1 = require("./game");
var player_1 = require("./player");
var _ = require("underscore");
var prefix = 'tator';
var games = new Map();
exports.client.on('ready', function () {
    console.log("Logged in as " + exports.client.user.tag + "!");
});
exports.client.on('message', function (message) {
    if (message.author == exports.client.user)
        return;
    var exec = new RegExp('^' + prefix + ' (.*)$').exec(message.content);
    var channel = message.channel;
    var game = games.get(channel.id);
    // check for and handle commands
    if (exec != null)
        handleCommand(exec[1].trim(), message, game);
    // then check for banned words
    else if (game && game.state == game_1.Game.State.PLAYING) {
        var player = game.getPlayer(message.author.id);
        if (player && player.status == player_1.Player.Status.ALIVE && player.name == 'Contestant') {
            var bannedWord = game.banCheck(message.content);
            if (bannedWord) {
                player.status = player_1.Player.Status.DEAD;
                channel.send("You used the banned phrase \"" + bannedWord + "\".\r\n<@" + message.author.id + "> has been executed!");
                checkEnd(channel);
            }
        }
    }
    console.log(message.content);
});
function getPlayerList(channel) {
    return __awaiter(this, void 0, void 0, function () {
        var game, dictator, contestants, _loop_1, _i, _a, player;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    game = games.get(channel.id);
                    dictator = '';
                    contestants = [];
                    _loop_1 = function (player) {
                        var user, member;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (player.status == player_1.Player.Status.DEAD)
                                        return [2 /*return*/, "continue"];
                                    return [4 /*yield*/, exports.client.fetchUser(player.id).then(function (u) { return user = u; })];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, channel.guild.fetchMember(user).then(function (g) { return member = g; })];
                                case 2:
                                    _a.sent();
                                    if (player.name == 'Contestant')
                                        contestants.push("\u2022 " + (member.nickname || user.username));
                                    else
                                        dictator = "Supreme Leader: " + (member.nickname || user.username);
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, _a = game.players;
                    _b.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    player = _a[_i];
                    return [5 /*yield**/, _loop_1(player)];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    if (contestants.length == 0)
                        return [2 /*return*/, dictator + '\r\nContestants: None'];
                    return [2 /*return*/, dictator + '\r\nContestants:\r\n' + contestants.join('\r\n')];
            }
        });
    });
}
function sendBios(channel) {
    return __awaiter(this, void 0, void 0, function () {
        var game, numContestants, bios, _loop_2, _i, _a, player;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    game = games.get(channel.id);
                    numContestants = game.players.length - 1;
                    bios = _.sample(player_1.Player.bios, numContestants);
                    _loop_2 = function (player) {
                        var user_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(player.name === "Contestant")) return [3 /*break*/, 2];
                                    return [4 /*yield*/, exports.client.fetchUser(player.id).then(function (u) { return user_1 = u; })];
                                case 1:
                                    _a.sent();
                                    user_1.send(bios.pop());
                                    _a.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, _a = game.players;
                    _b.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    player = _a[_i];
                    return [5 /*yield**/, _loop_2(player)];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function checkEnd(channel) {
    var game = games.get(channel.id);
    var howManyAlive = game.howManyAlive();
    if (howManyAlive < 2)
        channel.send('error: less than two players left');
    else if (howManyAlive == 2) {
        var contestant = void 0;
        if (game.players[0].name == 'Contestant')
            contestant = game.players[0];
        else
            contestant = game.players[1];
        channel.send("Congratulations, <@" + contestant.id + ">! You won the game and you get to marry the Supreme Leader!");
        game.state = game_1.Game.State.SETUP;
        for (var _i = 0, _a = game.players; _i < _a.length; _i++) {
            var player = _a[_i];
            player.status = player_1.Player.Status.ALIVE;
        }
    }
    else
        getPlayerList(channel).then(function (m) { return channel.send(m); });
}
function handleCommand(input, message, game) {
    var inputArr = input.split(' ');
    var command = inputArr.shift();
    var arg = inputArr.join(' ');
    // check to make sure game exists
    if (game == null) {
        if (command == 'start') {
            var a = new game_1.Game();
            games.set(message.channel.id, a);
            message.channel.send('Started game. Welcome, Supreme Leader.');
            var b = new player_1.Player("The Supreme Leader", message.author.id);
            a.dictator = b;
            a.addPlayer(b);
            getPlayerList(message.channel).then(function (m) { return message.channel.send(m); });
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
                message.channel.send('The Supreme Leader must start the game first.');
            }
            else if (player && player.name == 'The Supreme Leader') {
                game.banWord(arg);
                message.channel.send('Banned word: ' + arg);
            }
            else
                message.channel.send('Only the Supreme Leader can issue bans.');
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
                getPlayerList(message.channel).then(function (m) { return message.channel.send(m); });
            }
            else {
                message.channel.send("Stahp");
            }
            break;
        case 'leave':
            if (game.state == game_1.Game.State.PLAYING)
                message.channel.send('The game has already started!');
            else if (game.getPlayer(message.author.id) === null)
                message.channel.send("You can't leave the game if you're not in it!!!!!");
            else {
                game.removePlayer(message.author.id);
                message.channel.send("toodle");
                getPlayerList(message.channel).then(function (m) { return message.channel.send(m); });
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
            else if (game.getPlayer(newID[1]).name !== "The Supreme Leader") {
                game.getPlayer(newID[1]).name = "The Supreme Leader";
                game.getPlayer(message.author.id).name = "Contestant";
                game.dictator = game.getPlayer(newID[1]);
                message.channel.send("All hail our new Supreme Leader, " + "<@" + newID[1] + ">");
                getPlayerList(message.channel).then(function (m) { return message.channel.send(m); });
            }
            else if (game.getPlayer(newID[1]).name === "The Supreme Leader") {
                message.channel.send("You're already the Supreme Leader. All hail the Supreme Leader.");
            }
            break;
        case 'ready':
            if (game.state == game_1.Game.State.PLAYING)
                message.channel.send('The game has already started!');
            else if (!player || player.name == 'Contestant')
                message.channel.send('Only the Supreme Leader can start the game.');
            else if (game.players.length < 3)
                message.channel.send('You need at least three players (one Supreme Leader and two contestants) to play.');
            else {
                game.startRound(message.channel);
                message.channel.send('Welcome to Who Wants to Marry the Dictator! (starting round...)');
                sendBios(message.channel);
            }
            break;
        case 'eliminate':
            var newID2 = /<@(\d*)>/.exec(arg);
            if (player.name !== "The Supreme Leader") {
                message.channel.send("A contestant cannot eliminate another contestant!!!!!!!");
            }
            else if (game.state == game_1.Game.State.PLAYING || game.state == game_1.Game.State.SETUP) {
                message.channel.send('You cannot eliminate someone during the right now!');
            }
            else if (game.state === game_1.Game.State.ELIMINATING) {
                game.getPlayer(newID2[1]).status = player_1.Player.Status.DEAD;
                message.channel.send("Player <@" + newID2[1] + "> has been eliminated from the game. The new round starts now:");
                game.startRound(message.channel);
            }
            break;
        case 'exit':
            if (player.name == 'Contestant')
                message.channel.send('Only the Supreme Leader can exit the game.');
            else if (game.exitConfirm) {
                games["delete"](message.channel.id);
                message.channel.send('Game exited.');
            }
            else {
                game.exitConfirm = true;
                message.channel.send("Sure you want to exit the game? Type `" + prefix + " exit` again to confirm or `" + prefix + " cancel` to cancel.");
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
}
;
exports.client.login(config.token);
