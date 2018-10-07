import {Game} from './game';

export class Player {
    name: string = "";
    id: string = "";
    game: Game;
    status: Player.Status;
    static bios: string[] = [
        "You're a humble factory worker with ten loving children, who are also factory workers. Your greatest defining feature is the giant wart on your nose. Your children are tired of working and need a vacation. There are probably other ways to get them a vacation, but you're not all that smart, so you decided to marry the Supreme Leader",
        "You're a goose herder in the capital city of the nation, but traffic keeps killing your geese. You're very poor and you don't want to declare bankruptcy for the 15th time this year. Marrying the dictator is your best bet for a better life.", 
        "You're a spy from the Russian government whose only motive is to get intel on the Supreme Leader. Marrying them would get you a lot of dirt on them (probably). This is likely your last mission with the agency because you'll either be dead or married to the Supreme Leader forever. Tread wisely.", 
        "You're a dog dressed up as a Beautiful Farmer. Your main task here is to not let on that you're actually a dog. Your favorite things in the world are Skeletons, Black and White Movies, and Chasing Cars. You have a dog-to-human voice translator but the translation is Highly Unreliable. Be a good dog.",
        "You're an uptown city girl with a giant crush on the Supreme Leader. You just can't resist their flabby, flabby bod. Receiving an invitation to the game show is the best thing that has ever happened to you. Like, seriously. It's all downhill from here.",
        "You're a married, stay-at-home parent who is only participating because your partner said you could never win. You are extremely stubborn, so here you are, to prove your partner wrong. Good luck.",
        "You only entered this competition because you thought you would get a free toaster if you sent in an application. Now, not only are you forced to compete in this horror movie version of The Bachelor, you don't even get a free toaster. You still like being alive, though, so you're trying your hardest to win.",
        "You're the Supreme Leader's mother and you just want him to stop all of this nonsense and come home to you. But you can't let them know, or they will immediately execute you (because of an old grudge over their pet snake).",
        "You're a librarian with a passion for words. You wouldn't normally be interested in a game like this, but after accidentally addressing a thorough and emotional love letter to the Supreme Leader instead of the kind barista at your favorite coffee place, you have no choice in the matter. You just want to win so you can live on and keep the barista forever.",
        "You're an up-and-coming actor looking for some publicity, and what better way than to marry the Supreme Leader? So here you are, 21 years old and full of the urge to start drama. You hope you at least win an Oscar for this.",
        "You're a SoundCloud rapper and you desperately want the Supreme Leader to hear your sick tunes. You've tried to blast them on a speaker at the Supreme Leader's press conferences, but you never really get any feedback on them. You want them to REALLY listen. Oh, and you also have a knack for talking in rhymes.",
        "You're a loyal soldier in the Supreme Leader's army and you have devoted your life to their protection. What better way to protect them than by their side, as their loyal spouse? War is all you've ever known, but surely romance can't be much harder.",
        "You're a janitor at the Supreme Leader's mansion, and you've secretly been in love with them for years. This is the opportunity of your lifetime. After scrubbing out their bathroom so many times, you'll finally have a chance to see their bedroom as well.",
        "You're the nation's foremost scientist, but the Supreme Leader keeps censoring your important discoveries. Marrying them is your only hope of making them listen. Global warming is no hoax!",
        "You're a homeless person who came across the application form in an overflowing trashcan. Despite your ragged clothes and smelly hair, you're confident that your wit and charm can woo the Supreme Leader.",
        "You're a cobbler-turned-fugitive, on the run for the crime of making the Supreme Leader's feet uncomfortable. With your shoe-making business in tatters, this is your last chance to fix your life. You're pretty sure that they can't kill you if you're married to them. Right?",
        "You're a dentist who once had the privilege of cleaning the Supreme Leader's teeth. They had the most magnificent, off-white teeth that you have ever seen. You just want to see those teeth again, and you're willing to risk your life for the chance."
    ];

    constructor(b: string, id: string) {
        this.name = b;
        this.id = id;
        this.status = Player.Status.ALIVE;
    }
}

export namespace Player {
    export enum Status {
        DEAD, 
        ALIVE
    };
}