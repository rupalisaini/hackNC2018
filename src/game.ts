import {Player} from './player';
import {Round} from './round';
import * as Discord from 'discord.js';

export class Game {
    
    banned: string[] = [];
    players: Player[] = [];
    exitConfirm: boolean = false;
    state: Game.State = Game.State.SETUP;
    roundCounter: number = 0;
    round: Round = null;
    dictator: Player = null;
    channel: Discord.TextChannel = null;

    constructor(){
    }

    startRound(channel: Discord.TextChannel): void {
        this.state = Game.State.PLAYING;
        this.channel = channel;        
        this.round = new Round(channel, this);
        this.roundCounter++;
    }

    endRound(){
        this.round = null;
        this.state = Game.State.ELIMINATING;
        this.channel.send("The round has ended. Please submit your elimination.")
    }

    banWord(a: string): void {
        this.banned.push(a);
    }

    banCheck(a: string): string {
        let bannedWord: string = null;

        for (let i: number = 0; i < this.banned.length; i++){
            let r = new RegExp(this.banned[i], "i");
            if (r.exec(a)) {
                bannedWord = this.banned[i];
                break;
            }
        }

        return bannedWord;
    }

    addPlayer(b: Player): void {
        this.players.push(b);
    }

    getPlayer(b: string): Player {
        for (let i: number = 0; i < this.players.length; i++){
            if (this.players[i].id === b){
                return this.players[i];
            }
        }
        return null;
    }

    removePlayer(id: string): void {
        let a: Player = this.getPlayer(id);
        for (let i: number = 0; i < this.players.length; i++){
            if (this.players[i] === a){
                this.players.splice(i, 1);
            }
        }
    }

    howManyAlive(){
        let i: number = 0;
        let count: Player[] = this.players.filter(p => p.status === Player.Status.ALIVE);
        return count.length;
    }

}

export namespace Game {
    export enum State {
        SETUP,
        PLAYING,
        ELIMINATING
    }
}
