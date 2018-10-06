"use strict";
exports.__esModule = true;
var Status;
(function (Status) {
    Status[Status["DEAD"] = 0] = "DEAD";
    Status[Status["ALIVE"] = 1] = "ALIVE";
})(Status || (Status = {}));
;
var Player = /** @class */ (function () {
    function Player(b, id) {
        this.name = "";
        this.id = "";
        this.bio = "";
        this.name = b;
        this.id = id;
        this.status = Status.ALIVE;
        this.bio = Player.bios[Math.floor(Math.random() * 3)];
    }
    Player.bios = ["bio1", "bio2", "bio3", "bio4"];
    return Player;
}());
exports.Player = Player;