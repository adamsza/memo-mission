import { createContext, useContext } from "react";

interface GameContext {
    remainingTime: number
    restartGame: () => void,
    handleCardClick: (id: number) => void
}

export const GameContext = createContext<GameContext | undefined>(undefined);

export function useGameContext() {
    const gameStats = useContext(GameContext);
    if(gameStats === undefined) throw new Error("GameContext is undefined");
    return gameStats;
}