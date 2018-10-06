"use strict";
exports.__esModule = true;
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
    return Game;
}());
exports.Game = Game;
var a = new Game();
a.banWord("lolx");
a.banWord("a");
console.log(a.banned);
console.log(a.banCheck("i'm a little bitcho"));
