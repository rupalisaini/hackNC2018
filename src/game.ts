export class Game {
    
    banned: string[] = [];

    constructor(){
    }

    banWord(a: string) {
        this.banned.push(a);
    }

    banCheck(a: string){

        let n: number = -1;

        for (let i: number = 0; i < this.banned.length; i++){
            if (n === -1){
                let r = new RegExp(this.banned[i], "i");
                n = a.search(r);             
            }
        }
        return n !== -1;
    }
}

let a: Game = new Game();
a.banWord("lolx");
a.banWord("a");
console.log(a.banned);
console.log(a.banCheck("i'm a little bitcho"));