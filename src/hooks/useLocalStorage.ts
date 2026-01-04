import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

export interface ReadingPreferences {
  lastReadSurah: number | null;
  lastReadAyah: number | null;
  favoriteSurahs: number[];
  fontSize: {
    arabic: number;
    latin: number;
    translation: number;
  };
  darkMode: boolean;
  showLatin: boolean;
  showTranslation: boolean;
  showTajwid: boolean;
}

export const defaultPreferences: ReadingPreferences = {
  lastReadSurah: null,
  lastReadAyah: null,
  favoriteSurahs: [],
  fontSize: {
    arabic: 28,
    latin: 14,
    translation: 16,
  },
  darkMode: false,
  showLatin: true,
  showTranslation: true,
  showTajwid: true,
};

export function useReadingPreferences() {
  return useLocalStorage<ReadingPreferences>('quran-preferences', defaultPreferences);
}
