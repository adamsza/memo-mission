import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import Card from "../types/Card";
import { shuffle } from "../utils/ShuffleAlgorithm";
import { animalEmojis } from "../data/emojis";
import GameState from "../types/GameState";

const initialState: GameState = {
    score: 0,
    cards: [],
    flippedIds: [],
    foundCards: [],
    mistakes: 0,
    gameOver: true
}

function createCards(emojis: string[]) {
    return emojis.reduce<Card[]>((arr: Card[], emoji: string) => {
        arr.push(
            {id: arr.length + 1, emoji, flipped: false},
            {id: arr.length + 2, emoji, flipped: false}
        )
        return arr;
    }, [])
}

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        resetScore: (state) => {
            state.score = 0;
        },
        endGame: (state, action: PayloadAction<number>) => {
            state.gameOver = true;
            state.score += action.payload //* (gamesettings.time / 60) * 10;
        },
        resetGame: (state, action: PayloadAction<number>) => {
            state.gameOver = false;
            state.mistakes = 0;
            state.foundCards = [];
            state.flippedIds = [];
            state.cards = shuffle(createCards(animalEmojis.slice(0, action.payload)))
        },
        matchCards: (state) => {
            state.foundCards = [...state.foundCards, ...state.flippedIds.slice(0, 2)];
            state.flippedIds = []
            state.score += 50;
        },
        addMistake: (state) => {
            state.mistakes += 1;
            state.score -= 10;
        },
        flipCard: (state, action: PayloadAction<number>) => {
            state.cards = state.cards.map(card => card.id === action.payload ? { ...card, flipped: true } : card);
            state.flippedIds = [...state.flippedIds, action.payload];
        },
        flipCardsBack: (state) => {
            state.cards = state.cards.map(card => state.flippedIds.includes(card.id) ? { ...card, flipped: false } : card);
            state.flippedIds = []
        }
    }
})

export const {
    resetScore,
    endGame,
    resetGame,
    matchCards,
    addMistake,
    flipCard,
    flipCardsBack
} = gameSlice.actions;

export default gameSlice.reducer;