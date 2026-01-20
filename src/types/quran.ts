export interface Surah {
  id: number;
  name: string;
  nameArabic: string;
  nameLatin: string;
  meaning: string;
  type: 'makkiyah' | 'madaniyah';
  totalAyah: number;
  juz: number[];
  audioUrl?: string;
}

export interface Ayah {
  id: number;
  surahId: number;
  numberInSurah: number;
  text: string;
  textLatin: string;
  translation: string;
  tafsir: string;
  audioUrl?: string;
  juz: number;
  page: number;
  tajwidMarks?: TajwidMark[];
}

export interface TajwidMark {
  start: number;
  end: number;
  rule: TajwidRuleType;
}

export type TajwidRuleType = 
  | 'ikhfa'
  | 'idgham'
  | 'iqlab'
  | 'ghunnah'
  | 'qalqalah'
  | 'mad'
  | 'idzhar'
  | 'idgham-mimi'
  | 'ikhfa-syafawi'
  | 'mad-wajib'
  | 'mad-jaiz'
  | 'mad-lazim'
  | 'idgham-bighunnah'
  | 'idgham-bilaghunnah'
  | 'waqf'
  | 'hamzah-washal'
  | 'tafkhim'
  | 'tarqiq'
  | 'lafdz-jalalah'
  | 'ra';

export interface TajwidRule {
  id: string;
  name: string;
  nameArabic: string;
  description: string;
  letters: string;
  example: string;
  exampleArabic: string;
  color: string;
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

export interface PrayerTime {
  name: string;
  nameArabic: string;
  time: string;
}

export interface UserPreferences {
  darkMode: boolean;
  arabicFontSize: number;
  latinFontSize: number;
  translationFontSize: number;
  showTajwid: boolean;
  showLatin: boolean;
  showTranslation: boolean;
  showTafsir: boolean;
}
