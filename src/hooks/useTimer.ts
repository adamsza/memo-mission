import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { incrementElapsedTime } from "../stores/gameSlice";

interface TimerInterface {
    timerActive: boolean,
    startTimer: () => void,
    stopTimer: () => void,
}

export default function useTimer(): TimerInterface {
    const [timerActive, setTimerActive] = useState(false);
    const timerRef = useRef(0);
    const dispatch = useDispatch();

    function startTimer(){
        clearInterval(timerRef.current);
        setTimerActive(true);
        timerRef.current = setInterval(() => {
            dispatch(incrementElapsedTime());
        }, 1000);
    }
    
    function stopTimer() {
        setTimerActive(false);
        clearInterval(timerRef.current);
    }

    return {
        timerActive,
        startTimer,
        stopTimer,
    }
}