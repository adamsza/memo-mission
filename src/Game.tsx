import { ReactNode, useCallback, useEffect } from 'react';
import useTimer from './hooks/useTimer';
import { GameContext } from './context/GameContext';
import { useGameState } from './hooks/useGameState';

export interface GameSettings {
    cards: number,
    time: number
}

function Game({ gameSettings, children }: { gameSettings: GameSettings, children: ReactNode }) {
    const {cards, flippedIds, foundCards, mistakes, gameOver, resetGame, matchCards, addMistake, flipCard, endGame} = useGameState({gameSettings});
    const handleCardClick = useCallback((id: number) => {
        if (gameOver) return;
        if (foundCards.includes(id) || flippedIds.length > 1) return;
        if (!timer.timerActive) startGame();
        flipCard(id);
    }, [flippedIds])


    function startGame() {
        if (timer.remainingTime === gameSettings.time)
            timer.startTimer();
    }

    const stopGame = useCallback(() => {
        timer.stopTimer();
        endGame();
    }, []);

    const timer = useTimer({ time: gameSettings.time, timerEndedCallback: stopGame });

    function restartGame() {
        stopGame();
        timer.resetTimer();
        resetGame();
    }

    useEffect(() => {
        if (flippedIds.length > 1) {
            const flippedCards = flippedIds.map(id => cards.find(card => card.id === id));
            if (flippedCards[0]?.emoji === flippedCards[1]?.emoji) {
                matchCards();
                if (foundCards.length + 2 === cards.length) stopGame();
            }
            else addMistake();
        }
    }, [flippedIds]);

    useEffect(() => {
        restartGame();
    }, [gameSettings]);

    return (
        <GameContext.Provider value={{
            cards,
            mistakes,
            matches: foundCards.length / 2,
            remainingTime: timer.remainingTime,
            restartGame,
            handleCardClick
        }}>
            {children}
        </GameContext.Provider>
    )
}

export default Game