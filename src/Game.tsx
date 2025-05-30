import { ReactNode, useCallback, useEffect } from "react";
import useTimer from "./hooks/useTimer";
import { GameContext } from "./context/GameContext";
import { useDispatch, useSelector } from "react-redux";
import {
  resetGame,
  endGame,
  flipCard,
  matchCards,
  addMistake,
  flipCardsBack,
  incrementElapsedTime,
  gameSelector,
} from "./stores/gameSlice";

function Game({ children }: { children: ReactNode }) {
  const {
    gameOver,
    mistakes,
    flippedIds,
    foundCards,
    cards,
    settings,
    elapsedTime,
  } = useSelector(gameSelector);
  const dispatch = useDispatch();
  const { timerActive, startTimer, stopTimer } = useTimer({
    onTick: () => dispatch(incrementElapsedTime()),
  });

  const stopGame = useCallback(() => {
    stopTimer();
    dispatch(endGame());
  }, [dispatch, stopTimer]);

  const startGame = useCallback(() => {
    if (elapsedTime === 0) startTimer();
  }, [elapsedTime, startTimer]);

  const checkCards = useCallback(
    (id: number) => {
      if (flippedIds.length > 0) {
        const flippedCards = [
          cards.find((card) => card.id === flippedIds[0]),
          cards.find((card) => card.id === id),
        ];
        if (flippedCards[0]?.emoji === flippedCards[1]?.emoji) {
          dispatch(matchCards());
          if (foundCards.length + 2 === cards.length) stopGame();
        } else {
          dispatch(addMistake());
          setTimeout(() => {
            dispatch(flipCardsBack());
          }, 1000);
          if (mistakes + 1 === settings.maxMistakes) stopGame();
        }
      }
    },
    [
      cards,
      dispatch,
      flippedIds,
      foundCards.length,
      mistakes,
      settings.maxMistakes,
      stopGame,
    ],
  );

  const handleCardClick = useCallback(
    (id: number) => {
      if (gameOver) return;
      if (
        foundCards.includes(id) ||
        flippedIds.includes(id) ||
        flippedIds.length > 1
      )
        return;
      if (!timerActive) startGame();
      dispatch(flipCard(id));
      checkCards(id);
    },
    [
      gameOver,
      foundCards,
      flippedIds,
      timerActive,
      startGame,
      dispatch,
      checkCards,
    ],
  );

  const restartGame = useCallback(() => {
    stopGame();
    dispatch(resetGame());
  }, [dispatch, stopGame]);

  useEffect(() => {
    restartGame();
  }, [settings, restartGame]);

  useEffect(() => {
    if (elapsedTime === settings.time) stopGame();
  }, [elapsedTime, settings.time, stopGame]);

  return (
    <GameContext.Provider
      value={{
        restartGame,
        handleCardClick,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export default Game;
