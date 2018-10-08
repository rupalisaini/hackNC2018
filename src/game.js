"use strict";
exports.__esModule = true;
var player_1 = require("./player");
var round_1 = require("./round");
var Game = /** @class */ (function () {
    function Game() {
        this.banned = [];
        this.players = [];
        this.exitConfirm = false;
        this.state = Game.State.SETUP;
        this.roundCounter = 0;
        this.round = null;
        this.dictator = null;
        this.channel = null;
    }
    Game.prototype.startRound = function (channel) {
        this.state = Game.State.PLAYING;
        this.channel = channel;
        this.round = new round_1.Round(channel, this);
        this.roundCounter++;
    };
    Game.prototype.endRound = function () {
        this.round = null;
        this.state = Game.State.ELIMINATING;
        this.channel.send("The round has ended. Please submit your elimination.");
    };
    Game.prototype.banWord = function (a) {
        this.banned.push(a);
    };
    Game.prototype.banCheck = function (a) {
        var bannedWord = null;
        for (var i = 0; i < this.banned.length; i++) {
            var r = new RegExp(this.banned[i], "i");
            if (r.exec(a)) {
                bannedWord = this.banned[i];
                break;
            }
        }
        return bannedWord;
    };
    Game.prototype.addPlayer = function (b) {
        this.players.push(b);
    };
    Game.prototype.getPlayer = function (b) {
        for (var i = 0; i < this.players.length; i++) {
            if (this.players[i].id === b) {
                return this.players[i];
            }
        }
        return null;
    };
    Game.prototype.removePlayer = function (id) {
        var a = this.getPlayer(id);
        for (var i = 0; i < this.players.length; i++) {
            if (this.players[i] === a) {
                this.players.splice(i, 1);
            }
        }
    };
    Game.prototype.howManyAlive = function () {
        var i = 0;
        var count = this.players.filter(function (p) { return p.status === player_1.Player.Status.ALIVE; });
        return count.length;
    };
    return Game;
}());
exports.Game = Game;
(function (Game) {
    var State;
    (function (State) {
        State[State["SETUP"] = 0] = "SETUP";
        State[State["PLAYING"] = 1] = "PLAYING";
        State[State["ELIMINATING"] = 2] = "ELIMINATING";
    })(State = Game.State || (Game.State = {}));
})(Game = exports.Game || (exports.Game = {}));
exports.Game = Game;
