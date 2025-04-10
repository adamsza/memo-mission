import { createContext, useContext } from "react";
import Card from "../components/Card";

export interface GameStats{
    cards: Card[],
    mistakes: number,
    matches: number,
    remainingTime: number,
    restartGame: () => void,
    handleCardClick: (id: number) => void
}

export const GameContext = createContext<GameStats | undefined>(undefined);

export function useGameContext() {
    const gameStats = useContext(GameContext);
    if(gameStats === undefined) throw new Error("GameContext is undefined");
    return gameStats;
}