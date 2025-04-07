import { createContext, useContext } from "react";

export interface GameState{
    mistakes: number,
    matches: number,
    remainingTime: number,
    restartGame: () => void,
    openSettings: () => void
}

export const GameContext = createContext<GameState | undefined>(undefined);

export function useGameContext() {
    const gameState = useContext(GameContext);
    if(gameState === undefined) throw new Error("GameContext is undefined");
    return gameState;
}