import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useTimer from "./useTimer";

describe("useTimer hook", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("should initialize with provided time", () => {
        const { result } = renderHook(() => useTimer({ time: 60, timerEndedCallback: vi.fn() }));

        expect(result.current.remainingTime).toBe(60);
        expect(result.current.timerActive).toBe(false);
    })

    it("should start timer", () => {
        const { result } = renderHook(() => useTimer({ time: 60, timerEndedCallback: vi.fn() }));

        act(() => {
            result.current.startTimer();
        });

        expect(result.current.timerActive).toBe(true);

        act(() => {
            vi.advanceTimersByTime(2000);
        });

        expect(result.current.remainingTime).toBe(58);
    })

    it("should stop timer", () => {
        const { result } = renderHook(() => useTimer({ time: 60, timerEndedCallback: vi.fn() }));

        act(() => {
            result.current.startTimer();
            vi.advanceTimersByTime(2000);
            result.current.stopTimer();
        });

        expect(result.current.timerActive).toBe(false);

        act(() => {
            vi.advanceTimersByTime(3000);
        });
        
        expect(result.current.remainingTime).toBe(58);
    });
    
    it("should reset time", () => {
        const { result } = renderHook(() => useTimer({ time: 60, timerEndedCallback: vi.fn() }));
        
        act(() => {
            result.current.startTimer();
            vi.advanceTimersByTime(2000);
            result.current.resetTimer();
        });

        expect(result.current.remainingTime).toBe(60);
    });

    it("should call timerEndedCallback when timer reaches zero", () => {
        const callback = vi.fn();
        const { result } = renderHook(() => useTimer({ time: 3, timerEndedCallback: callback }));

        act(() => {
            result.current.startTimer();
            vi.advanceTimersByTime(3000);
        });

        expect(result.current.remainingTime).toBe(0);
        expect(callback).toHaveBeenCalledTimes(1);
    });

    it("should restart timer correctly when timer started multiple times", () => {
        const { result } = renderHook(() => useTimer({ time: 60, timerEndedCallback: vi.fn() }));

        act(() => {
            result.current.startTimer();
            vi.advanceTimersByTime(2000);
        });

        expect(result.current.remainingTime).toBe(58);

        act(() => {
            result.current.startTimer();
        });

        expect(result.current.timerActive).toBe(true);

        act(() => {
            vi.advanceTimersByTime(3000);
        });

        expect(result.current.remainingTime).toBe(55);
    });
    
    it("should reset timer correctly when stopped, reset and started", () => {
        const { result } = renderHook(() => useTimer({ time: 60, timerEndedCallback: vi.fn() }));
        
        act(() => {
            result.current.startTimer();
            vi.advanceTimersByTime(2000);
            result.current.stopTimer();
            result.current.resetTimer();
            vi.advanceTimersByTime(3000);
        });
        
        expect(result.current.remainingTime).toBe(60);
        expect(result.current.timerActive).toBe(false);

        act(() => {
            result.current.startTimer();
            vi.advanceTimersByTime(4000);
        })

        expect(result.current.remainingTime).toBe(56);
        expect(result.current.timerActive).toBe(true);
    });

})