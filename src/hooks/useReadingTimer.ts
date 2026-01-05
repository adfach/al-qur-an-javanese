import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useReadingTimer() {
  const [totalReadingTime, setTotalReadingTime] = useLocalStorage<number>('reading-time', 0);
  const [sessionTime, setSessionTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    setIsActive(true);
  }, []);

  const pauseTimer = useCallback(() => {
    setIsActive(false);
  }, []);

  const resetSessionTimer = useCallback(() => {
    setSessionTime(0);
  }, []);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSessionTime((prev) => prev + 1);
        setTotalReadingTime((prev) => prev + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, setTotalReadingTime]);

  // Auto-start when component mounts
  useEffect(() => {
    startTimer();
    return () => pauseTimer();
  }, [startTimer, pauseTimer]);

  return {
    sessionTime,
    totalReadingTime,
    isActive,
    startTimer,
    pauseTimer,
    resetSessionTimer,
  };
}
