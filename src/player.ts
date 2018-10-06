enum Status {
    DEAD, 
    ALIVE
};

export class Player {
    name: string = "";
    game: Game;
    bio: string = "";
    status: Status;
    static bios: string[] = ["bio1", "bio2", "bio3", "bio4"];


    constructor(b: string){
        this.name = b;
        this.status = Status.ALIVE;
        this.bio = Player.bios[Math.floor(Math.random() * 3)];
    }
}