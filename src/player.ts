import {Game} from './game';

export class Player {
    name: string = "";
    id: string = "";
    game: Game;
    bio: string = "";
    status: Status;
    static bios: string[] = [
        "You're a humble factory worker with ten loving children who are also factory workers. Your greatest defining feature is the giant wart on your nose.",
        "bio2", "bio3", "bio4"];


    constructor(b: string, id: string){
        this.name = b;
        this.id = id;
        this.status = Status.ALIVE;
        this.bio = Player.bios[Math.floor(Math.random() * 3)];
    }
}

export namespace Player {
    export enum Status {
        DEAD, 
        ALIVE
    };
}