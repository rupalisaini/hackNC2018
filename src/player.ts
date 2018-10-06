import {Game} from './game';

enum Status {
    DEAD, 
    ALIVE
};

export class Player {
    name: string = "";
    id: string = "";
    game: Game;
    bio: string = "";
    status: Status;
    static bios: string[] = ["bio1", "bio2", "bio3", "bio4"];


    constructor(b: string, id: string){
        this.name = b;
        this.id = id;
        this.status = Status.ALIVE;
        this.bio = Player.bios[Math.floor(Math.random() * 3)];
    }
}