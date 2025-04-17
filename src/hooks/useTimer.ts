import { useCallback, useRef, useState } from "react";

interface TimerInterface {
    timerActive: boolean,
    startTimer: () => void,
    stopTimer: () => void,
}

export default function useTimer({ onTick }: { onTick: () => void }): TimerInterface {
    const [timerActive, setTimerActive] = useState(false);
    const timerRef = useRef(0);

    const startTimer = useCallback(() => {
        clearInterval(timerRef.current);
        setTimerActive(true);
        timerRef.current = setInterval(() => {
            onTick();
        }, 1000);
    }, [onTick])

    const stopTimer = useCallback(() => {
        setTimerActive(false);
        clearInterval(timerRef.current);
    }, [])

    return {
        timerActive,
        startTimer,
        stopTimer,
    }
}