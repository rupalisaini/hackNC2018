"use strict";
exports.__esModule = true;
var Round = /** @class */ (function () {
    function Round(channel, game) {
        this.game = null;
        this.channel = null;
        this.channel = channel;
        this.game = game;
        setTimeout(function () {
            channel.send("This round has ended. Please submit your elimination, Supreme Leader.");
            game.endRound();
        }, 30000);
    }
    return Round;
}());
exports.Round = Round;
