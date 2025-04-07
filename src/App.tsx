import { useCallback, useEffect, useState } from 'react';
import { Header } from './Header'
import Card from './components/Card';
import CardBody from './components/CardBody';
import { shuffle } from './utils/ShuffleAlgorithm';
import { GameContext } from './context/GameConext';
import { animalEmojis } from './data/emojis';
import useTimer from './hooks/useTimer';
import SettingsModal from './components/SettingsModal';

function App() {
  const [cards, setCards] = useState(shuffle(createCards(animalEmojis.slice(0, 12))));
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [foundPairs, setFoundPairs] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const timer = useTimer({ time: 60 });
  const [modal, setModal] = useState(false);
  const handleCardClick = useCallback((id: number) => {
    if (!timer.timerActive) startGame();
    setCards(cards.map(card =>
      card.id === id ? new Card(card.id, card.emoji, true) : card
    )
    );
    setFlippedIds([...flippedIds, id]);
  }, [cards, flippedIds])

  function startGame() {
    timer.startTimer();
  }

  function stopGame() {
    timer.stopTimer();
  }

  function restartGame() {
    stopGame();
    timer.setTimer(60);
    setMistakes(0);
    setFoundPairs(0);
    setFlippedIds([]);
    setCards(shuffle(createCards(animalEmojis.slice(0, 12))))
  }

  useEffect(() => {
    if (flippedIds.length > 1) {
      const flippedCards = flippedIds.map(id => cards.find(card => card.id === id));
      if (flippedCards[0]?.emoji === flippedCards[1]?.emoji) {
        setFoundPairs(foundPairs + 1);
        if (foundPairs + 1 === cards.length / 2) stopGame();
      }
      else {
        setMistakes(mistakes + 1);
        setTimeout(() => {
          setCards(cards.map(card =>
            flippedIds.includes(card.id) ? new Card(card.id, card.emoji, false) : card
          ));
        }, 3000);
      }
      setFlippedIds([]) //only shift the first two
    }
  }, [flippedIds])

  return (
    <div className="pt-7.5 pb-12.5 px-12.5">
      <GameContext.Provider value={{
        mistakes: mistakes,
        matches: foundPairs,
        remainingTime: timer.remainingTime,
        restartGame: restartGame,
        openSettings: () => setModal(true)
      }}>
        <Header />
      </GameContext.Provider>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 bg-[#F5F5F5] py-18.75 px-6.25 rounded-[50px]">
        {cards.map(card => <CardBody key={card.id} card={card} onClick={handleCardClick} />)}
      </div>
      {modal ? <SettingsModal /> : <></>}
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