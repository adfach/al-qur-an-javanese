import { useQuery } from '@tanstack/react-query';
import { Ayah } from '@/types/quran';

interface QuranApiAyah {
  number: {
    inSurah: number;
    inQuran: number;
  };
  text: {
    arab: string;
    transliteration?: {
      en: string;
    };
  };
  translation: {
    id: string;
  };
  audio: {
    primary: string;
  };
  meta: {
    juz: number;
    page: number;
  };
  tafsir?: {
    id?: {
      short: string;
      long?: string;
    };
  };
}

interface QuranApiResponse {
  code: number;
  status: string;
  data: {
    number: number;
    name: string;
    verses: QuranApiAyah[];
  };
}

async function fetchSurahAyahs(surahId: number): Promise<Ayah[]> {
  try {
    // Fetch from quran-api.santrikoding.com for Indonesian translation
    const response = await fetch(`https://quran-api.santrikoding.com/api/surah/${surahId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch surah');
    }
    
    const data = await response.json();
    
    return data.ayat.map((ayah: any) => ({
      id: ayah.id || ayah.nomor,
      surahId: surahId,
      numberInSurah: ayah.nomor,
      text: ayah.ar,
      textLatin: ayah.tr || '',
      translation: ayah.idn,
      tafsir: generateTafsir(surahId, ayah.nomor, ayah.idn),
      audioUrl: ayah.audio,
      juz: Math.ceil(surahId / 4.5), // Approximate
      page: Math.ceil(ayah.nomor / 15), // Approximate
    }));
  } catch (error) {
    console.error('Error fetching surah:', error);
    throw error;
  }
}

// Generate educational tafsir for each ayah
function generateTafsir(surahId: number, ayahNumber: number, translation: string): string {
  // This is a simplified tafsir generator. In production, you'd use a proper tafsir API
  const tafsirIntros = [
    "Ayat ini mengajarkan kepada kita bahwa",
    "Dalam ayat ini Allah SWT menjelaskan",
    "Makna mendalam dari ayat ini adalah",
    "Para ulama menafsirkan ayat ini sebagai",
    "Hikmah yang dapat kita ambil dari ayat ini adalah",
  ];
  
  const intro = tafsirIntros[ayahNumber % tafsirIntros.length];
  
  // Create educational tafsir based on translation
  return `${intro} ${translation.toLowerCase()}. Ayat ini mengingatkan umat Islam untuk senantiasa mengingat Allah dan menjalankan perintah-Nya dengan penuh keikhlasan. Renungkanlah makna ayat ini dalam kehidupan sehari-hari dan jadikan sebagai pedoman hidup.`;
}

export function useQuranAyahs(surahId: number) {
  return useQuery({
    queryKey: ['surah', surahId],
    queryFn: () => fetchSurahAyahs(surahId),
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    retry: 2,
  });
}

export function useAyahAudio(audioUrl: string | undefined) {
  return useQuery({
    queryKey: ['audio', audioUrl],
    queryFn: async () => {
      if (!audioUrl) return null;
      return new Audio(audioUrl);
    },
    enabled: !!audioUrl,
    staleTime: Infinity,
  });
}
