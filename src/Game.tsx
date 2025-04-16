import { ReactNode, useCallback, useEffect } from 'react';
import useTimer from './hooks/useTimer';
import { GameContext } from './context/GameContext';
import { useDispatch, useSelector } from 'react-redux';
import { resetScore, resetGame, endGame, flipCard, matchCards, addMistake, flipCardsBack } from './stores/gameSlice';
import GameSettings from './types/GameSettings';
import { RootState } from './stores/store';

function Game({ gameSettings, children }: { gameSettings: GameSettings, children: ReactNode }) {
    //const { cards, flippedIds, foundCards, mistakes, gameOver, resetGame, matchCards, addMistake, flipCard, endGame } = useGameState({ gameSettings });
    const { gameOver, mistakes, flippedIds, foundCards, cards } = useSelector((state: RootState) => state.game);
    const dispatch = useDispatch();

    const stopGame = useCallback(() => {
        timer.stopTimer();
        dispatch(endGame(timer.remainingTime));
    }, [dispatch]);

    const timer = useTimer({ time: gameSettings.time, timerEndedCallback: stopGame });

    const startGame = useCallback(() => {
        if (timer.remainingTime === gameSettings.time)
            timer.startTimer();
    }, [gameSettings, timer]);

    const handleCardClick = useCallback((id: number) => {
        if (gameOver) return;
        if (foundCards.includes(id) || flippedIds.includes(id) || flippedIds.length > 1) return;
        if (!timer.timerActive) startGame();
        dispatch(flipCard(id));
    }, [gameOver, foundCards, flippedIds, timer.timerActive, startGame, dispatch])

    const restartGame = useCallback(() => {
        stopGame();
        timer.resetTimer();
        dispatch(resetGame(gameSettings.cards));
        dispatch(resetScore());
    }, [dispatch, stopGame]);

    useEffect(() => {
        if (flippedIds.length > 1) {
            const flippedCards = flippedIds.map(id => cards.find(card => card.id === id));
            if (flippedCards[0]?.emoji === flippedCards[1]?.emoji) {
                dispatch(matchCards());
                if (foundCards.length + 2 === cards.length) stopGame();
            }
            else {
                dispatch(addMistake());
                setTimeout(() => {
                    dispatch(flipCardsBack());
                }, 1000);
                if (mistakes + 1 === gameSettings.maxMistakes) stopGame();
            }
        }
    }, [cards, dispatch, flippedIds, stopGame]);

    useEffect(() => {
        restartGame();
    }, [gameSettings, restartGame]);

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