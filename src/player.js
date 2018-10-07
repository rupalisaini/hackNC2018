"use strict";
exports.__esModule = true;
var Player = /** @class */ (function () {
    function Player(b, id) {
        this.name = "";
        this.id = "";
        this.bio = "";
        this.name = b;
        this.id = id;
        this.status = Player.Status.ALIVE;
        this.bio = Player.bios[Math.floor(Math.random() * 3)];
    }
    Player.bios = [
        "You're a humble factory worker with ten loving children, who are also factory workers. Your greatest defining feature is the giant wart on your nose.",
        "You're a goose herder in the main city of the kingdom. Traffic keeps killing your geese and you're very poor and don't want to declare bankruptcy for the 15th time this year. Marrying the dictator is your best bet for a better life.",
        "You're a spy from the Russian intelligence whose only motive is to get intel on the Supreme Dictator. Marrying him would get you a lot of dirt on him (probably). If you succeed in your ", "bio4"
    ];
    return Player;
}());
exports.Player = Player;
(function (Player) {
    var Status;
    (function (Status) {
        Status[Status["DEAD"] = 0] = "DEAD";
        Status[Status["ALIVE"] = 1] = "ALIVE";
    })(Status = Player.Status || (Player.Status = {}));
    ;
})(Player = exports.Player || (exports.Player = {}));
exports.Player = Player;
