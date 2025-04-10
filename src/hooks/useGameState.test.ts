import { useGameState } from './useGameState';
import { shuffle } from '../utils/ShuffleAlgorithm';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { act } from 'react';
import GameSettings from '../types/GameSettings';

// Mock the shuffle function
vi.mock('../utils/ShuffleAlgorithm', () => ({
  shuffle: vi.fn(arr => arr),
}));

describe('useGameState', () => {
  const gameSettings: GameSettings = { cards: 12, time: 60, maxMistakes: 16 };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('initializes with correct default state', () => {
    const { result } = renderHook(() => useGameState({ gameSettings: gameSettings }));

    expect(result.current.cards.length).toBe(0);
    expect(result.current.flippedIds).toEqual([]);
    expect(result.current.foundCards).toEqual([]);
    expect(result.current.mistakes).toBe(0);
    expect(result.current.gameOver).toBe(false);
  });

  test('flipCard adds card id to flippedIds and updates card state', () => {
    const { result } = renderHook(() => useGameState({ gameSettings: gameSettings }));
    
    act(() => {
      result.current.resetGame();
    });

    act(() => {
      result.current.flipCard(1);
    });

    expect(result.current.flippedIds).toEqual([1]);
    expect(result.current.cards.find(card => card.id === 1)?.flipped).toBe(true);
  });

  test('matchCards adds flipped cards to foundCards and clears flippedIds', () => {
    const { result } = renderHook(() => useGameState({ gameSettings: gameSettings }));

    act(() => {
      result.current.flipCard(1);
    });

    act(() => {
      result.current.flipCard(2);
    });

    expect(result.current.flippedIds).toEqual([1, 2]);

    act(() => {
      result.current.matchCards();
    });

    expect(result.current.foundCards).toEqual([1, 2]);
    expect(result.current.flippedIds).toEqual([]);
  });

  test('addMistake increments mistake count and flips cards back after timeout', () => {
    vi.useFakeTimers();

    const { result } = renderHook(() => useGameState({ gameSettings: gameSettings }));

    act(() => {
      result.current.resetGame();
    });

    act(() => {
      result.current.flipCard(1);
    });

    act(() => {
      result.current.flipCard(3);
      result.current.addMistake();
    });

    expect(result.current.mistakes).toBe(1);
    expect(result.current.flippedIds).toEqual([1, 3]);
    expect(result.current.cards.find(card => card.id === 1)?.flipped).toBe(true);
    expect(result.current.cards.find(card => card.id === 3)?.flipped).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.flippedIds).toEqual([]);
    expect(result.current.cards.find(card => card.id === 1)?.flipped).toBe(false);
    expect(result.current.cards.find(card => card.id === 3)?.flipped).toBe(false);

    vi.useRealTimers();
  });

  test('endGame sets gameOver to true', () => {
    const { result } = renderHook(() => useGameState({ gameSettings: gameSettings }));

    expect(result.current.gameOver).toBe(false);

    act(() => {
      result.current.endGame();
    });

    expect(result.current.gameOver).toBe(true);
  });

  test('resetGame resets all game state', () => {
    const { result } = renderHook(() => useGameState({ gameSettings: gameSettings }));
    
    act(() => {
      result.current.resetGame();
    });

    act(() => {
      result.current.flipCard(1);
    });
    
    act(() => {
      result.current.flipCard(2);
    });
    
    act(() => {
      result.current.matchCards();
      result.current.flipCard(3);
    });

    act(() => {
      result.current.flipCard(4);
      result.current.addMistake();
      result.current.endGame();
    });

    expect(result.current.gameOver).toBe(true);
    expect(result.current.mistakes).toBe(1);
    expect(result.current.foundCards.length).toBe(2);

    act(() => {
      result.current.resetGame();
    });

    expect(result.current.gameOver).toBe(false);
    expect(result.current.mistakes).toBe(0);
    expect(result.current.foundCards).toEqual([]);
    expect(result.current.flippedIds).toEqual([]);
    expect(shuffle).toHaveBeenCalledTimes(2);
  });

  test('createCards creates correct pairs from emojis', () => {
    const { result } = renderHook(() => useGameState({ gameSettings: gameSettings }));

    act(() => {
      result.current.resetGame();
    });

    const cards = result.current.cards;

    expect(cards[0].emoji).toBe(cards[1].emoji);
    expect(cards[2].emoji).toBe(cards[3].emoji);
    expect(cards[0].emoji).not.toBe(cards[2].emoji);
  });
});