import {Game} from './game';
import * as Discord from 'discord.js';
import client from './wwtmtd';

export class Round {

    game: Game = null;
    channel: Discord.TextChannel = null;  

    constructor(channel: Discord.TextChannel, game: Game){
        this.channel = channel;
        this.game = game;
        setTimeout(() => {
            channel.send("This round has ended. Please submit your elimination, Supreme Leader.");
            game.endRound();
        }, 30000);        
    }

    // end(){
    //     this.channel.send("This round has ended. Please submit your elimination, Supreme Leader.");
    //     this.game.endRound();
    // }

}