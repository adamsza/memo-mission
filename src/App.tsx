import { useCallback, useEffect, useState } from 'react';
import { Header } from './Header'
import Card from './components/Card';
import CardBody from './components/CardBody';
import { shuffle } from './utils/ShuffleAlgorithm';
import { GameContext } from './context/GameConext';
import { animalEmojis } from './data/emojis';
import useTimer from './hooks/useTimer';
import SettingsModal from './components/SettingsModal';

export interface GameSettings {
  cards: number,
  time: number
}

function App() {
  const [gameSettings, setGameSettings] = useState<GameSettings>({ cards: 12, time: 60 })
  const [cards, setCards] = useState(shuffle(createCards(animalEmojis.slice(0, gameSettings.cards))));
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [foundCards, setFoundCards] = useState<number[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [modal, setModal] = useState(false);
  const timer = useTimer({ time: gameSettings.time, timerEndedCallback: stopGame });
  const handleCardClick = useCallback((id: number) => {
    if (!timer.timerActive) startGame();
    if (foundCards.includes(id) || flippedIds.length > 1) return;
    setCards(cards.map(card =>
      card.id === id ? new Card(card.id, card.emoji, true) : card
    )
    );
    setFlippedIds([...flippedIds, id]);
  }, [cards, flippedIds])


  function startGame() {
    if (timer.remainingTime === gameSettings.time)
      timer.startTimer();
  }

  function stopGame() {
    timer.stopTimer();
  }

  function resetGame() {
    stopGame();
    timer.resetTimer();
    setMistakes(0);
    setFoundCards([]);
    setFlippedIds([]);
    setCards(shuffle(createCards(animalEmojis.slice(0, gameSettings.cards))))
  }

  useEffect(() => {
    if (flippedIds.length > 1) {
      const flippedCards = flippedIds.map(id => cards.find(card => card.id === id));
      if (flippedCards[0]?.emoji === flippedCards[1]?.emoji) {
        setFoundCards(prevState => [...prevState, ...flippedIds.slice(0, 2)]);
        setFlippedIds([])
        if (foundCards.length + 2 === cards.length) stopGame();
      }
      else {
        setMistakes(mistakes + 1);
        setTimeout(() => {
          setCards(cards.map(card =>
            flippedIds.includes(card.id) ? new Card(card.id, card.emoji, false) : card
          ));
          setFlippedIds([])
        }, 2000);
      }
    }
  }, [flippedIds]);

  useEffect(() => {
    resetGame();
  }, [gameSettings]);


  return (
    <div className="pt-7.5 pb-12.5 px-12.5">
      <GameContext.Provider value={{
        mistakes: mistakes,
        matches: foundCards.length / 2,
        remainingTime: timer.remainingTime,
        restartGame: resetGame,
        openSettings: () => setModal(true)
      }}>
        <Header />
      </GameContext.Provider>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 bg-[#F5F5F5] py-18.75 px-6.25 rounded-[50px]">
        {cards.map(card => <CardBody key={card.id} card={card} onClick={handleCardClick} />)}
      </div>
      {modal ? <SettingsModal
        handleClose={() => setModal(false)}
        gameSettings={gameSettings}
        changeSettings={(gameSettings) => {
          setGameSettings(gameSettings);
          setModal(false);
        }} />
        : <></>}
    </div>
  )
}

function createCards(emojis: string[]) {
  return emojis.reduce<Card[]>((arr: Card[], emoji: string) => {
    const card1 = new Card(arr.length + 1, emoji, false);
    const card2 = new Card(arr.length + 2, emoji, false);
    arr.push(card1, card2);
    return arr;
  }, [])
}

export default App