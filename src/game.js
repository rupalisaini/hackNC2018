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
        this.roundCounter = 1;
        this.round = null;
        this.dictator = null;
    }
    Game.prototype.startRound = function () {
        this.state = Game.State.PLAYING;
        this.round = new round_1.Round();
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
        for (var j = 0; j < this.players.length; j++) {
            if (this.players[i].status === player_1.Player.Status.ALIVE) {
                i++;
            }
        }
        return i;
    };
    return Game;
}());
exports.Game = Game;
// let a: Game = new Game();
// a.banWord("lolx");
// a.banWord("a");
// console.log(a.banned);
// console.log(a.banCheck("i'm a little bitcho"));
// a.addPlayer(new Player("bitch", "bitch"));
// a.addPlayer(new Player("darvin","bitcho"));
// a.addPlayer(new Player("damn","damn"));
// a.removePlayer("bitcho");
// console.log(a.players[0].id);
// console.log(a.players[1].id);
(function (Game) {
    var State;
    (function (State) {
        State[State["SETUP"] = 0] = "SETUP";
        State[State["PLAYING"] = 1] = "PLAYING";
    })(State = Game.State || (Game.State = {}));
})(Game = exports.Game || (exports.Game = {}));
exports.Game = Game;
