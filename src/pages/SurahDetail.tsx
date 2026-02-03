import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Info, Share2, Heart, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { AyahCard } from '@/components/AyahCard';
import { TajwidPanel } from '@/components/TajwidPanel';
// import { FontSettings } from '@/components/FontSettings';
import { Footer } from '@/components/Footer';
import { IslamicOrnament, Bismillah } from '@/components/IslamicOrnament';
import { surahs, Ayah } from '@/data/quranData';
import { useReadingPreferences } from '@/hooks/useLocalStorage';
import { fetchSurahData, EquranAyah } from '@/services/equranAPI';
import { cn } from '@/lib/utils';
import { useReadingTimer } from '@/hooks/useReadingTimer';
import { useOnboarding } from '@/hooks/useOnboarding';

const SurahDetail: React.FC = () => {
  useOnboarding('surah');
  const { surahNumber } = useParams<{ surahNumber: string }>();
  const [preferences, setPreferences] = useReadingPreferences();
  const [showTajwid, setShowTajwid] = useState(false);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentAyah, setCurrentAyah] = useState<number>(1);
  const hasAutoScrolled = useRef(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Start reading timer
  useReadingTimer();

  const surahNum = parseInt(surahNumber || '1');
  const surah = surahs.find((s) => s.number === surahNum);
  const prevSurah = surahs.find((s) => s.number === surahNum - 1);
  const nextSurah = surahs.find((s) => s.number === surahNum + 1);

  const isFavorite = preferences.favoriteSurahs.includes(surahNum);

  // Fetch ayahs from equran.id API
  useEffect(() => {
    const loadAyahs = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchSurahData(surahNum);

        // Convert equran.id format to our Ayah format
        const convertedAyahs: Ayah[] = data.ayat?.map((ayah: EquranAyah) => ({
          number: ayah.nomorAyat,
          surahNumber: surahNum,
          text: ayah.teksArab,
          translation: ayah.teksIndonesia,
          latin: ayah.teksLatin,
          juz: surah?.juz[0] || 1,
          page: 1,
        })) || [];

        setAyahs(convertedAyahs);
      } catch (err) {
        console.error('Error loading ayahs:', err);
        setError('Gagal memuat ayat. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    };

    if (surahNum) {
      loadAyahs();
    }
  }, [surahNum, surah?.juz]);

  // Update last read surah (only once per surah)
  useEffect(() => {
    if (surah) {
      setPreferences((prev) => ({
        ...prev,
        lastReadSurah: surahNum,
        lastReadAyah: prev.surahProgress[surahNum] || 1,
      }));
    }
    // Reset auto-scroll flag when changing surah
    hasAutoScrolled.current = false;
  }, [surahNum, surah, setPreferences]);

  // Auto-scroll to last read position (only once per page load)
  useEffect(() => {
    if (!loading && ayahs.length > 0 && !hasAutoScrolled.current) {
      const lastReadAyah = preferences.surahProgress[surahNum] || 1;

      // Only scroll if user has read beyond ayah 1
      if (lastReadAyah > 1) {
        hasAutoScrolled.current = true; // Prevent repeated auto-scrolls
        setTimeout(() => {
          const element = document.querySelector(`[data-ayah="${lastReadAyah}"]`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 600); // Small delay to ensure DOM is ready
      } else {
        hasAutoScrolled.current = true; // Mark as done even if no scroll needed
      }
    }
  }, [loading, ayahs.length, surahNum, preferences.surahProgress]);

  // Track visible ayahs with IntersectionObserver
  useEffect(() => {
    if (ayahs.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const ayahNum = parseInt(entry.target.getAttribute('data-ayah') || '1');
            setCurrentAyah(ayahNum);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '-20% 0px -20% 0px', // Trigger when ayah is in middle of viewport
      }
    );

    // Observe all ayah elements
    const ayahElements = document.querySelectorAll('[data-ayah]');
    ayahElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [ayahs]);

  // Save reading progress when current ayah changes (debounced)
  useEffect(() => {
    if (currentAyah > 0 && hasAutoScrolled.current) {
      // Clear previous timeout
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      // Debounce save to avoid too frequent updates
      saveTimeoutRef.current = setTimeout(() => {
        setPreferences((prev) => ({
          ...prev,
          surahProgress: {
            ...prev.surahProgress,
            [surahNum]: currentAyah,
          },
          lastReadAyah: currentAyah,
        }));
      }, 1000); // Save after 1 second of no scroll
    }

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [currentAyah, surahNum, setPreferences]);

  const toggleFavorite = () => {
    const newFavorites = isFavorite
      ? preferences.favoriteSurahs.filter((n) => n !== surahNum)
      : [...preferences.favoriteSurahs, surahNum];
    setPreferences({ ...preferences, favoriteSurahs: newFavorites });
  };

  const handleShare = async () => {
    const shareText = `📖 ${surah?.name} (${surah?.nameArabic})\n${surah?.meaning}\n${surah?.totalAyahs} Ayat • ${surah?.revelation}\n\n🕌 Al-Qur'an Javanese`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: surah?.name,
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        navigator.clipboard.writeText(shareText);
      }
    } else {
      navigator.clipboard.writeText(shareText);
    }
  };

  if (!surah) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-muted-foreground">Surah tidak ditemukan</p>
          <Button asChild className="mt-4">
            <Link to="/">Kembali ke Beranda</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Tajwid Panel */}
      <TajwidPanel isOpen={showTajwid} onClose={() => setShowTajwid(false)} />

      {/* Surah Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background py-8 md:py-12">
        <div className="absolute inset-0 ornament-pattern opacity-20" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto">
            {/* Navigation */}
            <div className="flex items-center justify-between mb-6">
              <Button variant="ghost" asChild className="gap-2" id="back-button">
                <Link to="/">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Daftar Surah</span>
                </Link>
              </Button>

              <div className="flex items-center gap-2">
                {/* <div id="font-settings">
                  <FontSettings />
                </div> */}
                <Button
                  id="tajwid-button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowTajwid(true)}
                  className="gap-2"
                >
                  <Info className="w-4 h-4" />
                  <span className="hidden sm:inline">Tajwid</span>
                </Button>
              </div>
            </div>

            {/* Surah Info */}
            <div className="text-center animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-4">
                <BookOpen className="w-4 h-4" />
                <span>Surah ke-{surah.number}</span>
                <span className="text-primary/50">•</span>
                <span>{surah.totalAyahs} Ayat</span>
                <span className="text-primary/50">•</span>
                <span>{surah.revelation}</span>
              </div>

              <h1 className="quran-arabic text-5xl md:text-6xl text-primary mb-3">
                {surah.nameArabic}
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                {surah.name}
              </h2>
              <p className="text-muted-foreground mb-6">
                {surah.meaning}
              </p>

              <div className="flex items-center justify-center gap-3">
                <Button
                  id="favorite-surah"
                  variant={isFavorite ? "default" : "outline"}
                  size="sm"
                  onClick={toggleFavorite}
                  className="gap-2"
                >
                  <Heart className={cn("w-4 h-4", isFavorite && "fill-current")} />
                  {isFavorite ? 'Favorit' : 'Tandai Favorit'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Bagikan
                </Button>
              </div>
            </div>

            <IslamicOrnament variant="header" className="mt-8" />
          </div>
        </div>
      </section>

      {/* Ayahs */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Bismillah (except for At-Taubah) */}
          {surah.number !== 9 && surah.number !== 1 && (
            <div className="text-center mb-8 p-6 rounded-2xl bg-card border border-border">
              <Bismillah />
            </div>
          )}

          {/* Ayah List */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-muted-foreground">Memuat ayat...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-destructive mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>
                Coba Lagi
              </Button>
            </div>
          ) : (
            <div className="space-y-6" id="ayah-list">
              {ayahs.map((ayah, index) => (
                <div
                  key={ayah.number}
                  className="animate-slide-up"
                  style={{ animationDelay: `${Math.min(index * 0.02, 0.3)}s` }}
                >
                  <AyahCard
                    ayah={ayah}
                    surahName={surah.name}
                    surahNameArabic={surah.nameArabic}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Success Message */}
          {!loading && !error && ayahs.length > 0 && (
            <div className="mt-8 p-4 rounded-xl bg-primary/10 border border-primary/20 text-center">
              <p className="text-sm text-muted-foreground">
                ✅ Menampilkan <strong>{ayahs.length} ayat</strong> lengkap dari {surah.name}
              </p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-border">
            {prevSurah ? (
              <Button variant="outline" asChild className="gap-2">
                <Link to={`/surah/${prevSurah.number}`}>
                  <ArrowLeft className="w-4 h-4" />
                  <div className="text-left">
                    <p className="text-xs text-muted-foreground">Sebelumnya</p>
                    <p className="text-sm font-medium">{prevSurah.name}</p>
                  </div>
                </Link>
              </Button>
            ) : (
              <div />
            )}

            {nextSurah ? (
              <Button variant="outline" asChild className="gap-2">
                <Link to={`/surah/${nextSurah.number}`}>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Selanjutnya</p>
                    <p className="text-sm font-medium">{nextSurah.name}</p>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            ) : (
              <div />
            )}
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
};

export default SurahDetail;
