import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useTimer from "./useTimer";

describe("useTimer hook", () => {

    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.clearAllMocks();
        vi.clearAllTimers();
        vi.useRealTimers();
    });

    it("should initialize with inactive timer", () => {
        const { result } = renderHook(() => useTimer({ onTick: vi.fn() }));

        expect(result.current.timerActive).toBe(false);
    })

    it("should start timer", () => {
        const { result } = renderHook(() => useTimer({ onTick: vi.fn() }));

        act(() => {
            result.current.startTimer();
        });

        expect(result.current.timerActive).toBe(true);
    })

    it("should stop timer", () => {
        const { result } = renderHook(() => useTimer({ onTick: vi.fn() }));

        act(() => {
            result.current.startTimer();
            result.current.stopTimer();
        });

        expect(result.current.timerActive).toBe(false);
    });

    it("should reset timer correctly when stopped and started", () => {
        const { result } = renderHook(() => useTimer({ onTick: vi.fn() }));

        act(() => {
            result.current.startTimer();
            vi.advanceTimersByTime(2000);
            result.current.stopTimer();
            vi.advanceTimersByTime(3000);
        });

        expect(result.current.timerActive).toBe(false);

        act(() => {
            result.current.startTimer();
            vi.advanceTimersByTime(1000);
        })

        expect(result.current.timerActive).toBe(true);
    });

    it('startTimer should call onTick callback', () => {
        const mockOnTick = vi.fn();
        const { result } = renderHook(() => useTimer({ onTick: mockOnTick }));

        act(() => {
            result.current.startTimer();
            vi.advanceTimersByTime(3000);
        });

        expect(mockOnTick).toHaveBeenCalledTimes(3);
    });

    it('stopTimer should clear interval', () => {
        const mockOnTick = vi.fn();
        const { result } = renderHook(() => useTimer({ onTick: mockOnTick }));
        const clearIntervalSpy = vi.spyOn(window, 'clearInterval');

        act(() => {
            result.current.startTimer();
            result.current.stopTimer();
        });

        expect(clearIntervalSpy).toHaveBeenCalledTimes(2);

        act(() => {
            vi.advanceTimersByTime(3000);
        });

        expect(mockOnTick).toHaveBeenCalledTimes(0);
    });

    it('should not call onTick after stopTimer called', () => {
        const mockOnTick = vi.fn();
        const { result } = renderHook(() => useTimer({ onTick: mockOnTick }));

        act(() => {
            result.current.startTimer();
            vi.advanceTimersByTime(2000);
        });

        expect(mockOnTick).toHaveBeenCalledTimes(2);

        act(() => {
            result.current.stopTimer();
            vi.advanceTimersByTime(3000);
        });

        expect(mockOnTick).toHaveBeenCalledTimes(2);
    });
})