import { ReactNode, useCallback, useEffect } from 'react';
import useTimer from './hooks/useTimer';
import { GameContext } from './context/GameContext';
import { useDispatch, useSelector } from 'react-redux';
import { resetScore, resetGame, endGame, flipCard, matchCards, addMistake, flipCardsBack } from './stores/gameSlice';
import { RootState } from './stores/store';

function Game({ children }: { children: ReactNode }) {
    const { gameOver, mistakes, flippedIds, foundCards, cards, settings } = useSelector((state: RootState) => state.game);
    const dispatch = useDispatch();

    const stopGame = useCallback(() => {
        timer.stopTimer();
        dispatch(endGame(timer.remainingTime));
    }, [dispatch]);

    const timer = useTimer({ time: settings.time, timerEndedCallback: stopGame });

    const startGame = useCallback(() => {
        if (timer.remainingTime === settings.time)
            timer.startTimer();
    }, [settings, timer]);

    const handleCardClick = useCallback((id: number) => {
        if (gameOver) return;
        if (foundCards.includes(id) || flippedIds.includes(id) || flippedIds.length > 1) return;
        if (!timer.timerActive) startGame();
        dispatch(flipCard(id));
    }, [gameOver, foundCards, flippedIds, timer.timerActive, startGame, dispatch])

    const restartGame = useCallback(() => {
        stopGame();
        timer.resetTimer();
        dispatch(resetGame(settings.cards));
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
                if (mistakes + 1 === settings.maxMistakes) stopGame();
            }
        }
    }, [cards, dispatch, flippedIds, stopGame]);

    useEffect(() => {
        restartGame();
    }, [settings, restartGame]);

    return (
        <GameContext.Provider value={{
            remainingTime: timer.remainingTime,
            restartGame,
            handleCardClick
        }}>
            {children}
        </GameContext.Provider>
    )
}

export default Game