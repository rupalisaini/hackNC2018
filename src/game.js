"use strict";
exports.__esModule = true;
var player_1 = require("./player");
var Game = /** @class */ (function () {
    function Game() {
        this.banned = [];
        this.players = [];
        this.exitConfirm = false;
    }
    Game.prototype.banWord = function (a) {
        this.banned.push(a);
    };
    Game.prototype.banCheck = function (a) {
        var n = -1;
        for (var i = 0; i < this.banned.length; i++) {
            if (n === -1) {
                var r = new RegExp(this.banned[i], "i");
                n = a.search(r);
            }
        }
        return n !== -1;
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
    return Game;
}());
exports.Game = Game;
var a = new Game();
a.banWord("lolx");
a.banWord("a");
console.log(a.banned);
console.log(a.banCheck("i'm a little bitcho"));
a.addPlayer(new player_1.Player("bitch", "bitch"));
a.addPlayer(new player_1.Player("darvin", "bitcho"));
a.addPlayer(new player_1.Player("damn", "damn"));
a.removePlayer("bitcho");
console.log(a.players[0].id);
console.log(a.players[1].id);
