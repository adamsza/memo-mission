import { useRef, useState } from "react";

interface TimerInterface {
    remainingTime: number,
    timerActive: boolean,
    startTimer: () => void,
    stopTimer: () => void,
    setTimer: (time: number) => void,
}

interface TimerProps{
    time: number
}

export default function useTimer(props: TimerProps): TimerInterface {
    const [remainingTime, setRemainingTime] = useState(props.time);
    const [timerActive, setTimerActive] = useState(false);
    const timerRef = useRef(0);

    function startTimer() {
        clearInterval(timerRef.current);
        setTimerActive(false);
        timerRef.current = setInterval(() => {
            setRemainingTime(prevRemainingTime => prevRemainingTime - 1)
        }, 1000);
    }

    function stopTimer() {
        setTimerActive(false);
        clearInterval(timerRef.current);
    }

    function setTimer(time: number) {
        setRemainingTime(time);
    }

    return {
        remainingTime,
        timerActive,
        startTimer,
        stopTimer,
        setTimer
    }
}