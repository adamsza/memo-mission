import { createContext, useContext } from "react";
import GameStats from "../types/GameStats";

interface GameContext extends GameStats{
    restartGame: () => void,
    handleCardClick: (id: number) => void
}

export const GameContext = createContext<GameContext | undefined>(undefined);

export function useGameContext() {
    const gameStats = useContext(GameContext);
    if(gameStats === undefined) throw new Error("GameContext is undefined");
    return gameStats;
}