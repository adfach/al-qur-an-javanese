import { useState, useEffect, useRef } from 'react';
import { useReadingPreferences } from './useLocalStorage';

/**
 * Hook untuk tracking durasi membaca Al-Qur'an
 * Timer otomatis mulai saat hook digunakan dan stop saat unmount
 * Durasi disimpan ke localStorage
 */
export function useReadingTimer() {
  const [preferences, setPreferences] = useReadingPreferences();
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Start timer saat hook mount
  useEffect(() => {
    setIsActive(true);
    startTimeRef.current = Date.now();

    return () => {
      // Stop timer dan save duration saat unmount
      setIsActive(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Update localStorage setiap 10 detik
  useEffect(() => {
    if (isActive) {
      intervalRef.current = window.setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        setPreferences(prev => ({
          ...prev,
          readingDuration: prev.readingDuration + elapsed,
        }));
        startTimeRef.current = Date.now(); // Reset start time
      }, 10000); // Update every 10 seconds

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [isActive, setPreferences]);

  /**
   * Format durasi dalam detik ke string yang mudah dibaca
   * @param seconds - Durasi dalam detik
   * @returns String format "X jam Y menit" atau "Y menit"
   */
  const formatDuration = (seconds: number): string => {
    if (seconds < 60) {
      return `${seconds} detik`;
    }

    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0) {
      if (remainingMinutes > 0) {
        return `${hours} jam ${remainingMinutes} menit`;
      }
      return `${hours} jam`;
    }

    return `${minutes} menit`;
  };

  return {
    totalDuration: preferences.readingDuration,
    formattedDuration: formatDuration(preferences.readingDuration),
    isActive,
  };
}
