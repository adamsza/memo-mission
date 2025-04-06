class Card {
    id: number;
    flipped: boolean;
    emoji: string;

    constructor(id: number, emoji: string, flipped: boolean){
        this.id = id;
        this.emoji = emoji;
        this.flipped = flipped;
    }
}

export default Card