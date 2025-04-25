import Card from "./Card";
import GameSettings from "./GameSettings";

export default interface GameState {
  score: number;
  cards: Card[];
  flippedIds: number[];
  foundCards: number[];
  mistakes: number;
  gameOver: boolean;
  elapsedTime: number;
  settings: GameSettings;
}
