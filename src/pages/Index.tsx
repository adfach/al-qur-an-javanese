import React, { useState, useMemo } from 'react';
import { Search, Book, Heart, Clock, Grid3X3, List, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Header } from '@/components/Header';
import { SurahCard } from '@/components/SurahCard';
import { IslamicOrnament, Bismillah } from '@/components/IslamicOrnament';
import { surahs, featuredSurahNumbers } from '@/data/quranData';
import { useReadingPreferences } from '@/hooks/useLocalStorage';
import { cn } from '@/lib/utils';

const Index: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'surah' | 'juz'>('surah');
  const [preferences] = useReadingPreferences();

  const filteredSurahs = useMemo(() => {
    if (!searchQuery) return surahs;
    const query = searchQuery.toLowerCase();
    return surahs.filter(
      (surah) =>
        surah.name.toLowerCase().includes(query) ||
        surah.nameArabic.includes(query) ||
        surah.meaning.toLowerCase().includes(query) ||
        surah.number.toString().includes(query)
    );
  }, [searchQuery]);

  const featuredSurahs = useMemo(
    () => surahs.filter((s) => featuredSurahNumbers.includes(s.number)),
    []
  );

  const favoriteSurahs = useMemo(
    () => surahs.filter((s) => preferences.favoriteSurahs.includes(s.number)),
    [preferences.favoriteSurahs]
  );

  const lastReadSurah = useMemo(
    () => preferences.lastReadSurah ? surahs.find((s) => s.number === preferences.lastReadSurah) : null,
    [preferences.lastReadSurah]
  );

  const juzGroups = useMemo(() => {
    const groups: { [key: number]: typeof surahs } = {};
    for (let i = 1; i <= 30; i++) {
      groups[i] = surahs.filter((s) => s.juz.includes(i));
    }
    return groups;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-12 md:py-16">
        <div className="absolute inset-0 ornament-pattern opacity-30" />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-2xl mx-auto text-center animate-fade-in">
            <IslamicOrnament variant="header" className="mb-6" />
            
            <Bismillah className="mb-8" />
            
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Selamat Datang di Al-Qur'an Javanese
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Baca, tadabbur, dan pelajari Al-Qur'an dengan standar Kementerian Agama RI. 
              <span className="block mt-1 text-sm italic">Mangga dipun waos kanthi khusyuk.</span>
            </p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Cari surah... (nama, nomor, atau arti)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-card border-border rounded-xl shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        {(lastReadSurah || favoriteSurahs.length > 0) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 animate-slide-up">
            {/* Last Read */}
            {lastReadSurah && (
              <div className="p-4 rounded-xl bg-accent/50 border border-accent flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center">
                  <Clock className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Terakhir Dibaca</p>
                  <p className="font-semibold text-foreground">
                    {lastReadSurah.name} <span className="quran-arabic text-sm">{lastReadSurah.nameArabic}</span>
                  </p>
                </div>
              </div>
            )}

            {/* Favorites Count */}
            {favoriteSurahs.length > 0 && (
              <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Surah Favorit</p>
                  <p className="font-semibold text-foreground">
                    {favoriteSurahs.length} Surah ditandai
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Featured Surahs */}
        {!searchQuery && (
          <section className="mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-semibold text-foreground">Surah Pilihan</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredSurahs.slice(0, 6).map((surah) => (
                <SurahCard key={surah.number} surah={surah} isFeatured />
              ))}
            </div>
          </section>
        )}

        {/* User Favorites */}
        {!searchQuery && favoriteSurahs.length > 0 && (
          <section className="mb-10 animate-slide-up" style={{ animationDelay: '0.15s' }}>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-red-500" />
              <h3 className="text-lg font-semibold text-foreground">Favorit Anda</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {favoriteSurahs.map((surah) => (
                <SurahCard key={surah.number} surah={surah} />
              ))}
            </div>
          </section>
        )}

        {/* All Surahs */}
        <section className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Tabs defaultValue="surah" className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Book className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">
                  {searchQuery ? `Hasil Pencarian (${filteredSurahs.length})` : 'Daftar Surah'}
                </h3>
              </div>

              <TabsList className="grid w-full sm:w-auto grid-cols-2">
                <TabsTrigger value="surah" className="gap-2">
                  <List className="w-4 h-4" />
                  <span className="hidden sm:inline">Per Surah</span>
                </TabsTrigger>
                <TabsTrigger value="juz" className="gap-2">
                  <Grid3X3 className="w-4 h-4" />
                  <span className="hidden sm:inline">Per Juz</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="surah" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSurahs.map((surah, index) => (
                  <div
                    key={surah.number}
                    className="animate-fade-in"
                    style={{ animationDelay: `${Math.min(index * 0.02, 0.3)}s` }}
                  >
                    <SurahCard surah={surah} />
                  </div>
                ))}
              </div>
              {filteredSurahs.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Tidak ada surah yang ditemukan untuk "{searchQuery}"
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="juz" className="mt-0">
              <div className="space-y-8">
                {Object.entries(juzGroups).map(([juz, juzSurahs]) => (
                  <div key={juz}>
                    <h4 className="text-md font-semibold text-primary mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm">
                        {juz}
                      </span>
                      Juz {juz}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {juzSurahs.map((surah) => (
                        <SurahCard key={`${juz}-${surah.number}`} surah={surah} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border text-center">
          <IslamicOrnament variant="divider" className="mb-6" />
          <p className="text-sm text-muted-foreground mb-2">
            Al-Qur'an Javanese • Standar Kemenag RI
          </p>
          <p className="text-xs text-muted-foreground/70">
            Semoga Allah SWT memudahkan kita dalam memahami Al-Qur'an
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
