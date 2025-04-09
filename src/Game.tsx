import { ReactNode, useCallback, useEffect, useState } from 'react';
import Card from './components/Card';
import { shuffle } from './utils/ShuffleAlgorithm';
import { animalEmojis } from './data/emojis';
import useTimer from './hooks/useTimer';
import { GameContext } from './context/GameContext';

export interface GameSettings {
    cards: number,
    time: number
}

function Game({ gameSettings, children }: { gameSettings: GameSettings, children: ReactNode }) {
    const [cards, setCards] = useState<Card[]>(shuffle(createCards(animalEmojis.slice(0, gameSettings.cards))));
    const [flippedIds, setFlippedIds] = useState<number[]>([]);
    const [foundCards, setFoundCards] = useState<number[]>([]);
    const [mistakes, setMistakes] = useState<number>(0);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const handleCardClick = useCallback((id: number) => {
        if(gameOver) return;
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

    const stopGame = useCallback(() => {
        timer.stopTimer();
        setGameOver(true);
    }, []);
    const timer = useTimer({ time: gameSettings.time, timerEndedCallback: stopGame });

    function resetGame() {
        stopGame();
        timer.resetTimer();
        setGameOver(false);
        setMistakes(0);
        setFoundCards([]);
        setFlippedIds([]);
        setCards(shuffle(createCards(animalEmojis.slice(0, gameSettings.cards))))
    }

    function createCards(emojis: string[]) {
        return emojis.reduce<Card[]>((arr: Card[], emoji: string) => {
            const card1 = new Card(arr.length + 1, emoji, false);
            const card2 = new Card(arr.length + 2, emoji, false);
            arr.push(card1, card2);
            return arr;
        }, [])
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
        <GameContext.Provider value={{
            cards,
            mistakes,
            matches: foundCards.length / 2,
            remainingTime: timer.remainingTime,
            restartGame: resetGame,
            handleCardClick
        }}>
            {children}
        </GameContext.Provider>
    )
}

export default Game