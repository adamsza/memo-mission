import { useState } from "react";
import { shuffle } from "../utils/ShuffleAlgorithm";
import Card from "../types/Card";
import { animalEmojis } from "../data/emojis";
import GameSettings from "../types/GameSettings";

export function useGameState({ gameSettings }: { gameSettings: GameSettings }) {
    const [cards, setCards] = useState<Card[]>(shuffle(createCards(animalEmojis.slice(0, gameSettings.cards))));
    const [flippedIds, setFlippedIds] = useState<number[]>([]);
    const [foundCards, setFoundCards] = useState<number[]>([]);
    const [mistakes, setMistakes] = useState<number>(0);
    const [gameOver, setGameOver] = useState<boolean>(false);

    function resetGame() {
        setGameOver(false);
        setMistakes(0);
        setFoundCards([]);
        setFlippedIds([]);
        setCards(shuffle(createCards(animalEmojis.slice(0, gameSettings.cards))))
    }

    function matchCards() {
        setFoundCards(prevState => [...prevState, ...flippedIds.slice(0, 2)]);
        setFlippedIds([])
    }

    function addMistake() {
        setMistakes(mistakes + 1);
        setTimeout(() => {
            setCards(cards.map(card => flippedIds.includes(card.id) ? {...card, flipped: false} : card));
            setFlippedIds([])
        }, 1000);
    }

    function flipCard(id: number){
        setCards(cards.map(card => card.id === id ? {...card, flipped: true} : card));
        setFlippedIds([...flippedIds, id]);
    }

    function createCards(emojis: string[]) {
        return emojis.reduce<Card[]>((arr: Card[], emoji: string) => {
            arr.push(
                {id: arr.length + 1, emoji, flipped: false},
                {id: arr.length + 2, emoji, flipped: false}
            )
            return arr;
        }, [])
    }

    return {
        cards,
        flippedIds,
        foundCards,
        mistakes,
        gameOver,
        resetGame,
        matchCards,
        addMistake,
        flipCard,
        endGame: () => setGameOver(true)
    }
}