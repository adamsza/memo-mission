import { useEffect, useRef, useState } from "react";

interface TimerInterface {
    remainingTime: number,
    timerActive: boolean,
    startTimer: () => void,
    stopTimer: () => void,
    resetTimer: () => void,
}

interface TimerProps{
    time: number,
    timerEndedCallback: () => void
}

export default function useTimer(props: TimerProps): TimerInterface {
    const [remainingTime, setRemainingTime] = useState(props.time);
    const [timerActive, setTimerActive] = useState(false);
    const timerRef = useRef(0);

    function startTimer() {
        clearInterval(timerRef.current);
        setTimerActive(true);
        timerRef.current = setInterval(() => {
            setRemainingTime(prevRemainingTime => prevRemainingTime - 1);
        }, 1000);
    }

    function stopTimer() {
        setTimerActive(false);
        clearInterval(timerRef.current);
    }

    function resetTimer() {
        setRemainingTime(props.time);
    }

    useEffect(()=>{
        if(remainingTime === 0) props.timerEndedCallback();
    }, [props, remainingTime]);

    return {
        remainingTime,
        timerActive,
        startTimer,
        stopTimer,
        resetTimer
    }
}