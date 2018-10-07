import {Game} from './game';

export class Player {
    name: string = "";
    id: string = "";
    game: Game;
    bio: string = "";
    status: Player.Status;
    static bios: string[] = [
        "You're a humble factory worker with ten loving children, who are also factory workers. Your greatest defining feature is the giant wart on your nose. Your children are tired of working and need a vacation. There are probably other ways to get them a vacation but you're not that smart so you decide to marry the Supreme Leader",
        "You're a goose herder in the main city of the nation. Traffic keeps killing your geese and you're very poor and don't want to declare bankruptcy for the 15th time this year. Marrying the dictator is your best bet for a better life.", 
        "You're a spy from the Russian intelligence whose only motive is to get intel on the Supreme Leader. Marrying them would get you a lot of dirt on them (probably). This is your last mission in the agency because you're probably going to be married to The Supreme Leader forever. Tread wisely.", 
        "You're a dog dressed up as a Beautiful Farmer. Your main task here is not to let on that you're actually a dog. Your favorite things in the world are skeletons, black and white movies and chasing cars. You have a dog-to-human voice translator but the translation is highly unreliable. Be a good dog.",
        "You're an uptown city girl with a giant crush on the Supreme Leader. You truly believe that you're in love with them and cannot resist their flabby bod. Getting an invite to the game show is the best thing that ever happened to you. Like seriously, it's all downhill from here. Sieze the moment.",
        "You're a married stay-at-home parent who is only in the game because your partner said you could never win it. You're highly competitive and stubborn so here you are, to prove your partner wrong. Good luck.",
        "You entered this competition because you thought you would get a free toaster if you sent in an application. And now, not only are you forced to compete in this horror movie version of the bachelor, you don't even get a free toaster. You still like living though so you're trying to win.",
        "You're the Supreme Leader's mother and just want him to stop all of this and come home to you. But you can't let them know of this or they will immediately execute you (because of an old grudge over a pet snake).",
        "You're a librarian with a passion for words. Normally, you wouldn't care for games like this but after accidentally addressing a thorough and emotional love letter to the Supreme Leader instead of the kind barista at your favorite coffee place, you want to win just so you can live on and forever keep the barista.",
        "You're an up and coming actor looking for some publicity and thought 'what better way to do that than to marry The Supreme Leader?' So here you are."];


    constructor(b: string, id: string){
        this.name = b;
        this.id = id;
        this.status = Player.Status.ALIVE;
        this.bio = Player.bios[Math.floor(Math.random() * 3)];
    }
}

export namespace Player {
    export enum Status {
        DEAD, 
        ALIVE
    };
}