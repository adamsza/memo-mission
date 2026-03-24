import { useCallback, useRef, useState } from "react";

interface TimerInterface {
  timerActive: boolean;
  startTimer: () => void;
  stopTimer: () => void;
}

export default function useTimer({
  onTick,
}: {
  onTick: () => void;
}): TimerInterface {
  const [timerActive, setTimerActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | number | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setTimerActive(true);
    timerRef.current = setInterval(() => {
      onTick();
    }, 1000);
  }, [onTick]);

  const stopTimer = useCallback(() => {
    setTimerActive(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  return {
    timerActive,
    startTimer,
    stopTimer,
  };
}
