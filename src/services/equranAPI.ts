/**
 * Service layer untuk integrasi dengan API equran.id
 * Menyediakan fungsi untuk fetch data Al-Qur'an, tafsir, dan audio
 */

export interface EquranAyah {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio: {
    [key: string]: string;
  };
}

export interface EquranSurah {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
  audioFull: {
    [key: string]: string;
  };
  ayat?: EquranAyah[];
}

export interface TafsirAyah {
  ayat: number;
  teks: string;
}

export interface TafsirSurah {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tafsir: TafsirAyah[];
}

const BASE_URL = 'https://equran.id/api/v2';

/**
 * Fetch daftar semua surat Al-Qur'an
 */
export async function fetchAllSurahs(): Promise<EquranSurah[]> {
  try {
    const response = await fetch(`${BASE_URL}/surat`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const json = await response.json();
    return json.data || json;
  } catch (error) {
    console.error('Error fetching surahs:', error);
    throw error;
  }
}

/**
 * Fetch data lengkap surat beserta semua ayatnya
 * @param surahNumber - Nomor surat (1-114)
 */
export async function fetchSurahData(surahNumber: number): Promise<EquranSurah> {
  try {
    const response = await fetch(`${BASE_URL}/surat/${surahNumber}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const json = await response.json();
    // equran.id v2 API returns { code, message, data: { ... } }
    return json.data || json;
  } catch (error) {
    console.error(`Error fetching surah ${surahNumber}:`, error);
    throw error;
  }
}

/**
 * Fetch tafsir untuk surat tertentu
 * @param surahNumber - Nomor surat (1-114)
 * @param tafsirId - ID tafsir (default: 'id-tafsir-kemenag' atau 'id-tafsir-jalalayn')
 */
export async function fetchTafsir(
  surahNumber: number,
  tafsirId: string = 'id-tafsir-kemenag'
): Promise<TafsirSurah> {
  try {
    const response = await fetch(`${BASE_URL}/tafsir/${tafsirId}/${surahNumber}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching tafsir for surah ${surahNumber}:`, error);
    throw error;
  }
}

/**
 * Generate URL audio untuk ayat tertentu
 * @param surahNumber - Nomor surat (1-114)
 * @param ayahNumber - Nomor ayat
 * @param qari - Nama qari (default: 'mishary' - Mishary Rashid Alafasy)
 */
export function getAudioUrl(
  surahNumber: number,
  ayahNumber: number,
  qari: string = 'mishary'
): string {
  // Format: https://equran.id/storage/audio/{qari}/{surahNumber}/{ayahNumber}.mp3
  const surahPadded = surahNumber.toString().padStart(3, '0');
  const ayahPadded = ayahNumber.toString().padStart(3, '0');
  return `https://equran.id/storage/audio/${qari}/${surahPadded}${ayahPadded}.mp3`;
}

/**
 * Get tafsir untuk ayat tertentu dari data tafsir surat
 * @param tafsirData - Data tafsir surat lengkap
 * @param ayahNumber - Nomor ayat
 */
export function getTafsirForAyah(tafsirData: TafsirSurah, ayahNumber: number): string {
  const tafsirAyah = tafsirData.tafsir.find(t => t.ayat === ayahNumber);
  return tafsirAyah?.teks || '';
}
