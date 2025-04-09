import { createContext, useContext } from "react";
import Card from "../components/Card";

export interface GameState{
    cards: Card[],
    mistakes: number,
    matches: number,
    remainingTime: number,
    restartGame: () => void,
    handleCardClick: (id: number) => void
}

export const GameContext = createContext<GameState | undefined>(undefined);

export function useGameContext() {
    const gameStats = useContext(GameContext);
    if(gameStats === undefined) throw new Error("GameContext is undefined");
    return gameStats;
}