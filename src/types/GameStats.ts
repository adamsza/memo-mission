import Card from "./Card";

export default interface GameStats{
    cards: Card[],
    mistakes: number,
    matches: number,
    remainingTime: number
}