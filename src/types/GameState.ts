import Card from "./Card";

export default interface GameState {
    score: number,
    cards: Card[],
    flippedIds: number[],
    foundCards: number[],
    mistakes: number,
    gameOver: boolean
}