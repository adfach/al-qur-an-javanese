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

export interface LastRead {
  surahId: number;
  surahName: string;
  ayahNumber: number;
  timestamp: number;
}

export interface FavoriteAyah {
  surahId: number;
  surahName: string;
  ayahNumber: number;
  text: string;
  translation: string;
}

export interface ReadingPreferences {
  lastRead: LastRead | null;
  favoriteSurahs: number[];
  favoriteAyahs: FavoriteAyah[];
  fontSize: {
    arabic: number;
    latin: number;
    translation: number;
  };
  darkMode: boolean;
  showLatin: boolean;
  showTranslation: boolean;
  showTajwid: boolean;
  showTafsir: boolean;
  totalReadingTime: number;
}

export const defaultPreferences: ReadingPreferences = {
  lastRead: null,
  favoriteSurahs: [],
  favoriteAyahs: [],
  fontSize: {
    arabic: 32,
    latin: 14,
    translation: 16,
  },
  darkMode: false,
  showLatin: true,
  showTranslation: true,
  showTajwid: true,
  showTafsir: false,
  totalReadingTime: 0,
};

export function useReadingPreferences() {
  return useLocalStorage<ReadingPreferences>('quran-javanese-preferences', defaultPreferences);
}
