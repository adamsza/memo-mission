import { useCallback, useEffect, useState } from 'react';
import { Header } from './Header'
import Card from './components/Card';
import CardBody from './components/CardBody';
const emojis = ["🦊", "🐶", "🐱", "🐹", "🐰", "🐵", "🐻", "🐼", "🐨", "🐯", "🦁", "🐷"];

function App() {
  const [cards, setCards] = useState(shuffle(createCards(emojis)));
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [foundPairs, setFoundPairs] = useState(0);
  const handleCardClick = useCallback((id: number) => {
    setCards(cards.map(card =>
        card.id === id ? new Card(card.id, card.emoji, true) : card
      )
    );
    setFlippedIds([...flippedIds, id]);
  }, [cards, flippedIds])

  useEffect(() => {
    console.log(flippedIds);
    if(flippedIds.length > 1){
      const flippedCards = flippedIds.map(id => cards.find(card => card.id === id));
      if(flippedCards[0]?.emoji === flippedCards[1]?.emoji){
        setFoundPairs(foundPairs+1);
      }
      else{
        setTimeout(() => {
          setCards(cards.map(card => 
            flippedIds.includes(card.id) ? new Card(card.id, card.emoji, false) : card
          ));
        }, 3000);
      }
      setFlippedIds([]) 
    }
  }, [flippedIds])

  return (
    <div className="pt-7.5 pb-12.5 px-12.5">
      <Header />
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 bg-[#F5F5F5] py-18.75 px-6.25 rounded-[50px]">
        {cards.map(card => <CardBody key={card.id} card={card} onClick={handleCardClick} />)}
      </div>
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

//Fisher-Yates (Knuth) Shuffle algorithm
function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const random = Math.floor(Math.random() * (i + 1));
    [array[i], array[random]] = [array[random], array[i]];
  }
  return array;
}

export default App