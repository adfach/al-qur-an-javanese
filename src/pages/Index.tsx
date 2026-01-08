import React, { useState, useMemo } from 'react';
import { Search, Book, Heart, Clock, Grid3X3, List, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Header } from '@/components/Header';
import { SurahCard } from '@/components/SurahCard';
import { Footer } from '@/components/Footer';
import { PrayerTimesWidget } from '@/components/PrayerTimesWidget';
import { surahList, featuredSurahs } from '@/data/surahList';
import { useReadingPreferences } from '@/hooks/useLocalStorage';

const Index: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [preferences] = useReadingPreferences();

  const filteredSurahs = useMemo(() => {
    if (!searchQuery) return surahList;
    const query = searchQuery.toLowerCase();
    return surahList.filter(
      (surah) =>
        surah.name.toLowerCase().includes(query) ||
        surah.nameArabic.includes(query) ||
        surah.meaning.toLowerCase().includes(query) ||
        surah.id.toString().includes(query)
    );
  }, [searchQuery]);

  const featuredSurahsList = useMemo(
    () => surahList.filter((s) => featuredSurahs.includes(s.id)),
    []
  );

  const favoriteSurahsList = useMemo(
    () => surahList.filter((s) => preferences.favoriteSurahs.includes(s.id)),
    [preferences.favoriteSurahs]
  );

  const lastReadSurah = useMemo(
    () => preferences.lastRead ? surahList.find((s) => s.id === preferences.lastRead?.surahId) : null,
    [preferences.lastRead]
  );

  const juzGroups = useMemo(() => {
    const groups: { [key: number]: typeof surahList } = {};
    for (let i = 1; i <= 30; i++) {
      groups[i] = surahList.filter((s) => s.juz.includes(i));
    }
    return groups;
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-10 md:py-14">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-2xl mx-auto text-center animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Al-Qur'an Javanese
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Tilawah, tadabbur, dan pembelajaran tajwid dengan standar Kemenag RI
            </p>

            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Cari surah..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-card border-border rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Prayer Times - Below Search */}
      <section className="container mx-auto px-4 py-4">
        <PrayerTimesWidget />
      </section>

      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-4">
            {/* Last Read */}
            {lastReadSurah && preferences.lastRead && (
              <Link 
                to={`/surah/${lastReadSurah.id}?ayah=${preferences.lastRead.ayahNumber}`}
                className="block p-4 rounded-xl bg-accent/50 border border-accent hover:bg-accent/70 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-accent-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Terakhir Dibaca</p>
                    <p className="font-semibold text-foreground text-sm">
                      {lastReadSurah.name} : {preferences.lastRead.ayahNumber}
                    </p>
                  </div>
                </div>
              </Link>
            )}

            {/* Favorites Count */}
            {favoriteSurahsList.length > 0 && (
              <Link to="/favorites" className="block p-4 rounded-xl bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors">
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Favorit</p>
                    <p className="font-semibold text-foreground text-sm">
                      {preferences.favoriteSurahs.length + preferences.favoriteAyahs.length} item
                    </p>
                  </div>
                </div>
              </Link>
            )}
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Surahs */}
            {!searchQuery && (
              <section className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Surah Pilihan</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {featuredSurahsList.map((surah) => (
                    <SurahCard key={surah.id} surah={surah} isFeatured />
                  ))}
                </div>
              </section>
            )}

            {/* All Surahs */}
            <section>
              <Tabs defaultValue="surah" className="w-full">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Book className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">
                      {searchQuery ? `Hasil (${filteredSurahs.length})` : 'Daftar Surah'}
                    </h3>
                  </div>
                  <TabsList>
                    <TabsTrigger value="surah"><List className="w-4 h-4" /></TabsTrigger>
                    <TabsTrigger value="juz"><Grid3X3 className="w-4 h-4" /></TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="surah" className="mt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {filteredSurahs.map((surah) => (
                      <SurahCard key={surah.id} surah={surah} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="juz" className="mt-0 space-y-6">
                  {Object.entries(juzGroups).map(([juz, juzSurahs]) => (
                    <div key={juz}>
                      <h4 className="text-md font-semibold text-primary mb-3">Juz {juz}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {juzSurahs.map((surah) => (
                          <SurahCard key={`${juz}-${surah.id}`} surah={surah} />
                        ))}
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
