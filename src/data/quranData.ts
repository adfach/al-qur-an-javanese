export interface Surah {
  number: number;
  name: string;
  nameArabic: string;
  meaning: string;
  totalAyahs: number;
  revelation: 'Makkiyah' | 'Madaniyah';
  juz: number[];
}

export interface Ayah {
  number: number;
  surahNumber: number;
  text: string;
  translation: string;
  latin: string;
  juz: number;
  page: number;
}

export interface TajwidRule {
  id: string;
  name: string;
  nameArabic: string;
  description: string;
  letters: string;
  example: string;
  color: string;
}

export const tajwidRules: TajwidRule[] = [
  {
    id: 'ikhfa',
    name: 'Ikhfa Haqiqi',
    nameArabic: 'إِخْفَاء حَقِيقِي',
    description: 'Menyamarkan bunyi nun mati/tanwin saat bertemu 15 huruf ikhfa dengan dengung.',
    letters: 'ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك',
    example: 'مِنْ ثَمَرَةٍ → dibaca samar dengan dengung',
    color: 'tajwid-ikhfa',
  },
  {
    id: 'idgham',
    name: 'Idgham Bighunnah',
    nameArabic: 'إِدْغَام بِغُنَّة',
    description: 'Memasukkan bunyi nun mati/tanwin ke huruf setelahnya dengan dengung.',
    letters: 'ي ن م و',
    example: 'مِنْ يَّوْمٍ → nun dilebur dengan ya',
    color: 'tajwid-idgham',
  },
  {
    id: 'iqlab',
    name: 'Iqlab',
    nameArabic: 'إِقْلَاب',
    description: 'Mengubah bunyi nun mati/tanwin menjadi mim saat bertemu huruf ba.',
    letters: 'ب',
    example: 'مِنْ بَعْدِ → dibaca "mim ba\'di"',
    color: 'tajwid-iqlab',
  },
  {
    id: 'ghunnah',
    name: 'Ghunnah',
    nameArabic: 'غُنَّة',
    description: 'Dengung yang keluar dari pangkal hidung, sekitar 2 harakat.',
    letters: 'ن م (bertasydid)',
    example: 'إِنَّ → nun tasydid didengungkan',
    color: 'tajwid-ghunnah',
  },
  {
    id: 'qalqalah',
    name: 'Qalqalah',
    nameArabic: 'قَلْقَلَة',
    description: 'Memantulkan bunyi huruf qalqalah saat mati/waqaf.',
    letters: 'ق ط ب ج د',
    example: 'يَخْلُقْ → qaf dipantulkan',
    color: 'tajwid-qalqalah',
  },
  {
    id: 'mad',
    name: 'Mad Asli',
    nameArabic: 'مَدّ أَصْلِي',
    description: 'Memanjangkan bacaan 2 harakat pada huruf mad.',
    letters: 'ا و ي',
    example: 'قَالَ → alif dipanjangkan 2 harakat',
    color: 'tajwid-mad',
  },
];

export const surahs: Surah[] = [
  { number: 1, name: 'Al-Fatihah', nameArabic: 'الفاتحة', meaning: 'Pembukaan', totalAyahs: 7, revelation: 'Makkiyah', juz: [1] },
  { number: 2, name: 'Al-Baqarah', nameArabic: 'البقرة', meaning: 'Sapi Betina', totalAyahs: 286, revelation: 'Madaniyah', juz: [1, 2, 3] },
  { number: 3, name: 'Ali Imran', nameArabic: 'آل عمران', meaning: 'Keluarga Imran', totalAyahs: 200, revelation: 'Madaniyah', juz: [3, 4] },
  { number: 4, name: 'An-Nisa', nameArabic: 'النساء', meaning: 'Wanita', totalAyahs: 176, revelation: 'Madaniyah', juz: [4, 5, 6] },
  { number: 5, name: 'Al-Ma\'idah', nameArabic: 'المائدة', meaning: 'Hidangan', totalAyahs: 120, revelation: 'Madaniyah', juz: [6, 7] },
  { number: 6, name: 'Al-An\'am', nameArabic: 'الأنعام', meaning: 'Binatang Ternak', totalAyahs: 165, revelation: 'Makkiyah', juz: [7, 8] },
  { number: 7, name: 'Al-A\'raf', nameArabic: 'الأعراف', meaning: 'Tempat Tertinggi', totalAyahs: 206, revelation: 'Makkiyah', juz: [8, 9] },
  { number: 8, name: 'Al-Anfal', nameArabic: 'الأنفال', meaning: 'Rampasan Perang', totalAyahs: 75, revelation: 'Madaniyah', juz: [9, 10] },
  { number: 9, name: 'At-Taubah', nameArabic: 'التوبة', meaning: 'Pengampunan', totalAyahs: 129, revelation: 'Madaniyah', juz: [10, 11] },
  { number: 10, name: 'Yunus', nameArabic: 'يونس', meaning: 'Yunus', totalAyahs: 109, revelation: 'Makkiyah', juz: [11] },
  { number: 11, name: 'Hud', nameArabic: 'هود', meaning: 'Hud', totalAyahs: 123, revelation: 'Makkiyah', juz: [11, 12] },
  { number: 12, name: 'Yusuf', nameArabic: 'يوسف', meaning: 'Yusuf', totalAyahs: 111, revelation: 'Makkiyah', juz: [12, 13] },
  { number: 13, name: 'Ar-Ra\'d', nameArabic: 'الرعد', meaning: 'Guruh', totalAyahs: 43, revelation: 'Madaniyah', juz: [13] },
  { number: 14, name: 'Ibrahim', nameArabic: 'إبراهيم', meaning: 'Ibrahim', totalAyahs: 52, revelation: 'Makkiyah', juz: [13] },
  { number: 15, name: 'Al-Hijr', nameArabic: 'الحجر', meaning: 'Batu Gunung', totalAyahs: 99, revelation: 'Makkiyah', juz: [14] },
  { number: 16, name: 'An-Nahl', nameArabic: 'النحل', meaning: 'Lebah', totalAyahs: 128, revelation: 'Makkiyah', juz: [14] },
  { number: 17, name: 'Al-Isra', nameArabic: 'الإسراء', meaning: 'Perjalanan Malam', totalAyahs: 111, revelation: 'Makkiyah', juz: [15] },
  { number: 18, name: 'Al-Kahfi', nameArabic: 'الكهف', meaning: 'Gua', totalAyahs: 110, revelation: 'Makkiyah', juz: [15, 16] },
  { number: 19, name: 'Maryam', nameArabic: 'مريم', meaning: 'Maryam', totalAyahs: 98, revelation: 'Makkiyah', juz: [16] },
  { number: 20, name: 'Taha', nameArabic: 'طه', meaning: 'Taha', totalAyahs: 135, revelation: 'Makkiyah', juz: [16] },
  { number: 21, name: 'Al-Anbiya', nameArabic: 'الأنبياء', meaning: 'Para Nabi', totalAyahs: 112, revelation: 'Makkiyah', juz: [17] },
  { number: 22, name: 'Al-Hajj', nameArabic: 'الحج', meaning: 'Haji', totalAyahs: 78, revelation: 'Madaniyah', juz: [17] },
  { number: 23, name: 'Al-Mu\'minun', nameArabic: 'المؤمنون', meaning: 'Orang-orang Mukmin', totalAyahs: 118, revelation: 'Makkiyah', juz: [18] },
  { number: 24, name: 'An-Nur', nameArabic: 'النور', meaning: 'Cahaya', totalAyahs: 64, revelation: 'Madaniyah', juz: [18] },
  { number: 25, name: 'Al-Furqan', nameArabic: 'الفرقان', meaning: 'Pembeda', totalAyahs: 77, revelation: 'Makkiyah', juz: [18, 19] },
  { number: 26, name: 'Asy-Syu\'ara', nameArabic: 'الشعراء', meaning: 'Para Penyair', totalAyahs: 227, revelation: 'Makkiyah', juz: [19] },
  { number: 27, name: 'An-Naml', nameArabic: 'النمل', meaning: 'Semut', totalAyahs: 93, revelation: 'Makkiyah', juz: [19, 20] },
  { number: 28, name: 'Al-Qashash', nameArabic: 'القصص', meaning: 'Kisah-kisah', totalAyahs: 88, revelation: 'Makkiyah', juz: [20] },
  { number: 29, name: 'Al-Ankabut', nameArabic: 'العنكبوت', meaning: 'Laba-laba', totalAyahs: 69, revelation: 'Makkiyah', juz: [20, 21] },
  { number: 30, name: 'Ar-Rum', nameArabic: 'الروم', meaning: 'Romawi', totalAyahs: 60, revelation: 'Makkiyah', juz: [21] },
  { number: 31, name: 'Luqman', nameArabic: 'لقمان', meaning: 'Luqman', totalAyahs: 34, revelation: 'Makkiyah', juz: [21] },
  { number: 32, name: 'As-Sajdah', nameArabic: 'السجدة', meaning: 'Sujud', totalAyahs: 30, revelation: 'Makkiyah', juz: [21] },
  { number: 33, name: 'Al-Ahzab', nameArabic: 'الأحزاب', meaning: 'Golongan', totalAyahs: 73, revelation: 'Madaniyah', juz: [21, 22] },
  { number: 34, name: 'Saba\'', nameArabic: 'سبأ', meaning: 'Saba\'', totalAyahs: 54, revelation: 'Makkiyah', juz: [22] },
  { number: 35, name: 'Fathir', nameArabic: 'فاطر', meaning: 'Pencipta', totalAyahs: 45, revelation: 'Makkiyah', juz: [22] },
  { number: 36, name: 'Yasin', nameArabic: 'يس', meaning: 'Yasin', totalAyahs: 83, revelation: 'Makkiyah', juz: [22, 23] },
  { number: 37, name: 'Ash-Shaffat', nameArabic: 'الصافات', meaning: 'Barisan', totalAyahs: 182, revelation: 'Makkiyah', juz: [23] },
  { number: 38, name: 'Shad', nameArabic: 'ص', meaning: 'Shad', totalAyahs: 88, revelation: 'Makkiyah', juz: [23] },
  { number: 39, name: 'Az-Zumar', nameArabic: 'الزمر', meaning: 'Rombongan', totalAyahs: 75, revelation: 'Makkiyah', juz: [23, 24] },
  { number: 40, name: 'Ghafir', nameArabic: 'غافر', meaning: 'Pengampun', totalAyahs: 85, revelation: 'Makkiyah', juz: [24] },
  { number: 41, name: 'Fussilat', nameArabic: 'فصلت', meaning: 'Yang Dijelaskan', totalAyahs: 54, revelation: 'Makkiyah', juz: [24, 25] },
  { number: 42, name: 'Asy-Syura', nameArabic: 'الشورى', meaning: 'Musyawarah', totalAyahs: 53, revelation: 'Makkiyah', juz: [25] },
  { number: 43, name: 'Az-Zukhruf', nameArabic: 'الزخرف', meaning: 'Perhiasan', totalAyahs: 89, revelation: 'Makkiyah', juz: [25] },
  { number: 44, name: 'Ad-Dukhan', nameArabic: 'الدخان', meaning: 'Kabut', totalAyahs: 59, revelation: 'Makkiyah', juz: [25] },
  { number: 45, name: 'Al-Jasiyah', nameArabic: 'الجاثية', meaning: 'Berlutut', totalAyahs: 37, revelation: 'Makkiyah', juz: [25] },
  { number: 46, name: 'Al-Ahqaf', nameArabic: 'الأحقاف', meaning: 'Bukit Pasir', totalAyahs: 35, revelation: 'Makkiyah', juz: [26] },
  { number: 47, name: 'Muhammad', nameArabic: 'محمد', meaning: 'Muhammad', totalAyahs: 38, revelation: 'Madaniyah', juz: [26] },
  { number: 48, name: 'Al-Fath', nameArabic: 'الفتح', meaning: 'Kemenangan', totalAyahs: 29, revelation: 'Madaniyah', juz: [26] },
  { number: 49, name: 'Al-Hujurat', nameArabic: 'الحجرات', meaning: 'Kamar-kamar', totalAyahs: 18, revelation: 'Madaniyah', juz: [26] },
  { number: 50, name: 'Qaf', nameArabic: 'ق', meaning: 'Qaf', totalAyahs: 45, revelation: 'Makkiyah', juz: [26] },
  { number: 51, name: 'Adz-Dzariyat', nameArabic: 'الذاريات', meaning: 'Angin yang Menerbangkan', totalAyahs: 60, revelation: 'Makkiyah', juz: [26, 27] },
  { number: 52, name: 'At-Tur', nameArabic: 'الطور', meaning: 'Bukit', totalAyahs: 49, revelation: 'Makkiyah', juz: [27] },
  { number: 53, name: 'An-Najm', nameArabic: 'النجم', meaning: 'Bintang', totalAyahs: 62, revelation: 'Makkiyah', juz: [27] },
  { number: 54, name: 'Al-Qamar', nameArabic: 'القمر', meaning: 'Bulan', totalAyahs: 55, revelation: 'Makkiyah', juz: [27] },
  { number: 55, name: 'Ar-Rahman', nameArabic: 'الرحمن', meaning: 'Maha Pengasih', totalAyahs: 78, revelation: 'Madaniyah', juz: [27] },
  { number: 56, name: 'Al-Waqi\'ah', nameArabic: 'الواقعة', meaning: 'Hari Kiamat', totalAyahs: 96, revelation: 'Makkiyah', juz: [27] },
  { number: 57, name: 'Al-Hadid', nameArabic: 'الحديد', meaning: 'Besi', totalAyahs: 29, revelation: 'Madaniyah', juz: [27] },
  { number: 58, name: 'Al-Mujadilah', nameArabic: 'المجادلة', meaning: 'Wanita yang Mengajukan Gugatan', totalAyahs: 22, revelation: 'Madaniyah', juz: [28] },
  { number: 59, name: 'Al-Hasyr', nameArabic: 'الحشر', meaning: 'Pengusiran', totalAyahs: 24, revelation: 'Madaniyah', juz: [28] },
  { number: 60, name: 'Al-Mumtahanah', nameArabic: 'الممتحنة', meaning: 'Wanita yang Diuji', totalAyahs: 13, revelation: 'Madaniyah', juz: [28] },
  { number: 61, name: 'Ash-Shaff', nameArabic: 'الصف', meaning: 'Barisan', totalAyahs: 14, revelation: 'Madaniyah', juz: [28] },
  { number: 62, name: 'Al-Jumu\'ah', nameArabic: 'الجمعة', meaning: 'Jumat', totalAyahs: 11, revelation: 'Madaniyah', juz: [28] },
  { number: 63, name: 'Al-Munafiqun', nameArabic: 'المنافقون', meaning: 'Orang-orang Munafik', totalAyahs: 11, revelation: 'Madaniyah', juz: [28] },
  { number: 64, name: 'At-Taghabun', nameArabic: 'التغابن', meaning: 'Hari Ditampakkan Kesalahan', totalAyahs: 18, revelation: 'Madaniyah', juz: [28] },
  { number: 65, name: 'At-Talaq', nameArabic: 'الطلاق', meaning: 'Talak', totalAyahs: 12, revelation: 'Madaniyah', juz: [28] },
  { number: 66, name: 'At-Tahrim', nameArabic: 'التحريم', meaning: 'Pengharaman', totalAyahs: 12, revelation: 'Madaniyah', juz: [28] },
  { number: 67, name: 'Al-Mulk', nameArabic: 'الملك', meaning: 'Kerajaan', totalAyahs: 30, revelation: 'Makkiyah', juz: [29] },
  { number: 68, name: 'Al-Qalam', nameArabic: 'القلم', meaning: 'Pena', totalAyahs: 52, revelation: 'Makkiyah', juz: [29] },
  { number: 69, name: 'Al-Haqqah', nameArabic: 'الحاقة', meaning: 'Hari Kiamat', totalAyahs: 52, revelation: 'Makkiyah', juz: [29] },
  { number: 70, name: 'Al-Ma\'arij', nameArabic: 'المعارج', meaning: 'Tempat-tempat Naik', totalAyahs: 44, revelation: 'Makkiyah', juz: [29] },
  { number: 71, name: 'Nuh', nameArabic: 'نوح', meaning: 'Nuh', totalAyahs: 28, revelation: 'Makkiyah', juz: [29] },
  { number: 72, name: 'Al-Jinn', nameArabic: 'الجن', meaning: 'Jin', totalAyahs: 28, revelation: 'Makkiyah', juz: [29] },
  { number: 73, name: 'Al-Muzzammil', nameArabic: 'المزمل', meaning: 'Orang yang Berselimut', totalAyahs: 20, revelation: 'Makkiyah', juz: [29] },
  { number: 74, name: 'Al-Muddassir', nameArabic: 'المدثر', meaning: 'Orang yang Berkemul', totalAyahs: 56, revelation: 'Makkiyah', juz: [29] },
  { number: 75, name: 'Al-Qiyamah', nameArabic: 'القيامة', meaning: 'Hari Kiamat', totalAyahs: 40, revelation: 'Makkiyah', juz: [29] },
  { number: 76, name: 'Al-Insan', nameArabic: 'الإنسان', meaning: 'Manusia', totalAyahs: 31, revelation: 'Madaniyah', juz: [29] },
  { number: 77, name: 'Al-Mursalat', nameArabic: 'المرسلات', meaning: 'Malaikat yang Diutus', totalAyahs: 50, revelation: 'Makkiyah', juz: [29] },
  { number: 78, name: 'An-Naba\'', nameArabic: 'النبأ', meaning: 'Berita Besar', totalAyahs: 40, revelation: 'Makkiyah', juz: [30] },
  { number: 79, name: 'An-Nazi\'at', nameArabic: 'النازعات', meaning: 'Malaikat yang Mencabut', totalAyahs: 46, revelation: 'Makkiyah', juz: [30] },
  { number: 80, name: '\'Abasa', nameArabic: 'عبس', meaning: 'Bermuka Masam', totalAyahs: 42, revelation: 'Makkiyah', juz: [30] },
  { number: 81, name: 'At-Takwir', nameArabic: 'التكوير', meaning: 'Menggulung', totalAyahs: 29, revelation: 'Makkiyah', juz: [30] },
  { number: 82, name: 'Al-Infitar', nameArabic: 'الانفطار', meaning: 'Terbelah', totalAyahs: 19, revelation: 'Makkiyah', juz: [30] },
  { number: 83, name: 'Al-Mutaffifin', nameArabic: 'المطففين', meaning: 'Orang yang Curang', totalAyahs: 36, revelation: 'Makkiyah', juz: [30] },
  { number: 84, name: 'Al-Insyiqaq', nameArabic: 'الانشقاق', meaning: 'Terbelah', totalAyahs: 25, revelation: 'Makkiyah', juz: [30] },
  { number: 85, name: 'Al-Buruj', nameArabic: 'البروج', meaning: 'Gugusan Bintang', totalAyahs: 22, revelation: 'Makkiyah', juz: [30] },
  { number: 86, name: 'At-Tariq', nameArabic: 'الطارق', meaning: 'Yang Datang di Malam Hari', totalAyahs: 17, revelation: 'Makkiyah', juz: [30] },
  { number: 87, name: 'Al-A\'la', nameArabic: 'الأعلى', meaning: 'Maha Tinggi', totalAyahs: 19, revelation: 'Makkiyah', juz: [30] },
  { number: 88, name: 'Al-Gasyiyah', nameArabic: 'الغاشية', meaning: 'Hari Pembalasan', totalAyahs: 26, revelation: 'Makkiyah', juz: [30] },
  { number: 89, name: 'Al-Fajr', nameArabic: 'الفجر', meaning: 'Fajar', totalAyahs: 30, revelation: 'Makkiyah', juz: [30] },
  { number: 90, name: 'Al-Balad', nameArabic: 'البلد', meaning: 'Negeri', totalAyahs: 20, revelation: 'Makkiyah', juz: [30] },
  { number: 91, name: 'Asy-Syams', nameArabic: 'الشمس', meaning: 'Matahari', totalAyahs: 15, revelation: 'Makkiyah', juz: [30] },
  { number: 92, name: 'Al-Lail', nameArabic: 'الليل', meaning: 'Malam', totalAyahs: 21, revelation: 'Makkiyah', juz: [30] },
  { number: 93, name: 'Ad-Duha', nameArabic: 'الضحى', meaning: 'Waktu Duha', totalAyahs: 11, revelation: 'Makkiyah', juz: [30] },
  { number: 94, name: 'Asy-Syarh', nameArabic: 'الشرح', meaning: 'Kelapangan', totalAyahs: 8, revelation: 'Makkiyah', juz: [30] },
  { number: 95, name: 'At-Tin', nameArabic: 'التين', meaning: 'Buah Tin', totalAyahs: 8, revelation: 'Makkiyah', juz: [30] },
  { number: 96, name: 'Al-\'Alaq', nameArabic: 'العلق', meaning: 'Segumpal Darah', totalAyahs: 19, revelation: 'Makkiyah', juz: [30] },
  { number: 97, name: 'Al-Qadr', nameArabic: 'القدر', meaning: 'Kemuliaan', totalAyahs: 5, revelation: 'Makkiyah', juz: [30] },
  { number: 98, name: 'Al-Bayyinah', nameArabic: 'البينة', meaning: 'Bukti Nyata', totalAyahs: 8, revelation: 'Madaniyah', juz: [30] },
  { number: 99, name: 'Az-Zalzalah', nameArabic: 'الزلزلة', meaning: 'Kegoncangan', totalAyahs: 8, revelation: 'Madaniyah', juz: [30] },
  { number: 100, name: 'Al-\'Adiyat', nameArabic: 'العاديات', meaning: 'Kuda Perang', totalAyahs: 11, revelation: 'Makkiyah', juz: [30] },
  { number: 101, name: 'Al-Qari\'ah', nameArabic: 'القارعة', meaning: 'Hari Kiamat', totalAyahs: 11, revelation: 'Makkiyah', juz: [30] },
  { number: 102, name: 'At-Takasur', nameArabic: 'التكاثر', meaning: 'Bermegah-megahan', totalAyahs: 8, revelation: 'Makkiyah', juz: [30] },
  { number: 103, name: 'Al-\'Asr', nameArabic: 'العصر', meaning: 'Masa', totalAyahs: 3, revelation: 'Makkiyah', juz: [30] },
  { number: 104, name: 'Al-Humazah', nameArabic: 'الهمزة', meaning: 'Pengumpat', totalAyahs: 9, revelation: 'Makkiyah', juz: [30] },
  { number: 105, name: 'Al-Fil', nameArabic: 'الفيل', meaning: 'Gajah', totalAyahs: 5, revelation: 'Makkiyah', juz: [30] },
  { number: 106, name: 'Quraisy', nameArabic: 'قريش', meaning: 'Suku Quraisy', totalAyahs: 4, revelation: 'Makkiyah', juz: [30] },
  { number: 107, name: 'Al-Ma\'un', nameArabic: 'الماعون', meaning: 'Barang yang Berguna', totalAyahs: 7, revelation: 'Makkiyah', juz: [30] },
  { number: 108, name: 'Al-Kausar', nameArabic: 'الكوثر', meaning: 'Nikmat yang Berlimpah', totalAyahs: 3, revelation: 'Makkiyah', juz: [30] },
  { number: 109, name: 'Al-Kafirun', nameArabic: 'الكافرون', meaning: 'Orang-orang Kafir', totalAyahs: 6, revelation: 'Makkiyah', juz: [30] },
  { number: 110, name: 'An-Nasr', nameArabic: 'النصر', meaning: 'Pertolongan', totalAyahs: 3, revelation: 'Madaniyah', juz: [30] },
  { number: 111, name: 'Al-Lahab', nameArabic: 'المسد', meaning: 'Api yang Bergejolak', totalAyahs: 5, revelation: 'Makkiyah', juz: [30] },
  { number: 112, name: 'Al-Ikhlas', nameArabic: 'الإخلاص', meaning: 'Keikhlasan', totalAyahs: 4, revelation: 'Makkiyah', juz: [30] },
  { number: 113, name: 'Al-Falaq', nameArabic: 'الفلق', meaning: 'Waktu Subuh', totalAyahs: 5, revelation: 'Makkiyah', juz: [30] },
  { number: 114, name: 'An-Nas', nameArabic: 'الناس', meaning: 'Manusia', totalAyahs: 6, revelation: 'Makkiyah', juz: [30] },
];

export const featuredSurahNumbers = [36, 18, 67, 56, 55, 1, 112, 113, 114]; // Yasin, Al-Kahfi, Al-Mulk, Al-Waqi'ah, Ar-Rahman, Al-Fatihah, Al-Ikhlas, Al-Falaq, An-Nas

// Sample ayahs for Al-Fatihah
export const sampleAyahs: Ayah[] = [
  {
    number: 1,
    surahNumber: 1,
    text: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    translation: 'Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.',
    latin: 'Bismillāhir-raḥmānir-raḥīm',
    juz: 1,
    page: 1,
  },
  {
    number: 2,
    surahNumber: 1,
    text: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
    translation: 'Segala puji bagi Allah, Tuhan seluruh alam,',
    latin: 'Al-ḥamdu lillāhi rabbil-\'ālamīn',
    juz: 1,
    page: 1,
  },
  {
    number: 3,
    surahNumber: 1,
    text: 'الرَّحْمَٰنِ الرَّحِيمِ',
    translation: 'Yang Maha Pengasih, Maha Penyayang,',
    latin: 'Ar-raḥmānir-raḥīm',
    juz: 1,
    page: 1,
  },
  {
    number: 4,
    surahNumber: 1,
    text: 'مَالِكِ يَوْمِ الدِّينِ',
    translation: 'Pemilik hari pembalasan.',
    latin: 'Māliki yaumid-dīn',
    juz: 1,
    page: 1,
  },
  {
    number: 5,
    surahNumber: 1,
    text: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
    translation: 'Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami mohon pertolongan.',
    latin: 'Iyyāka na\'budu wa iyyāka nasta\'īn',
    juz: 1,
    page: 1,
  },
  {
    number: 6,
    surahNumber: 1,
    text: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
    translation: 'Tunjukilah kami jalan yang lurus,',
    latin: 'Ihdinaṣ-ṣirāṭal-mustaqīm',
    juz: 1,
    page: 1,
  },
  {
    number: 7,
    surahNumber: 1,
    text: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
    translation: '(yaitu) jalan orang-orang yang telah Engkau beri nikmat kepadanya; bukan (jalan) mereka yang dimurkai, dan bukan (pula jalan) mereka yang sesat.',
    latin: 'Ṣirāṭal-lażīna an\'amta \'alaihim gairil-magḍūbi \'alaihim wa laḍ-ḍāllīn',
    juz: 1,
    page: 1,
  },
];
