import { Link } from 'react-router-dom';
import { Heart, ArrowLeft, BookOpen, Trash2 } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useReadingPreferences } from '@/hooks/useLocalStorage';
import { surahList } from '@/data/surahList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Favorites = () => {
  const [preferences, setPreferences] = useReadingPreferences();
  const { favoriteSurahs = [], favoriteAyahs = [] } = preferences;

  const favoriteSurahsData = surahList.filter(s => 
    favoriteSurahs.includes(s.id)
  );

  const removeFavoriteSurah = (surahId: number) => {
    setPreferences({
      ...preferences,
      favoriteSurahs: favoriteSurahs.filter(id => id !== surahId)
    });
  };

  const removeFavoriteAyah = (surahId: number, ayahNumber: number) => {
    setPreferences({
      ...preferences,
      favoriteAyahs: favoriteAyahs.filter(
        a => !(a.surahId === surahId && a.ayahNumber === ayahNumber)
      )
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary fill-primary" />
            <h1 className="text-2xl font-bold">Favorit Saya</h1>
          </div>
        </div>

        <Tabs defaultValue="surahs" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="surahs" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Surat ({favoriteSurahsData.length})
            </TabsTrigger>
            <TabsTrigger value="ayahs" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Ayat ({favoriteAyahs.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="surahs">
            {favoriteSurahsData.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Heart className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Belum ada surat favorit</h3>
                  <p className="text-muted-foreground mb-4">
                    Tandai surat favorit Anda dengan menekan ikon hati
                  </p>
                  <Link to="/">
                    <Button>Jelajahi Surat</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoriteSurahsData.map((surah) => (
                  <Card key={surah.id} className="group hover:border-primary transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <Link to={`/surah/${surah.id}`} className="flex-1">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                              {surah.id}
                            </div>
                            <div>
                              <h3 className="font-semibold">{surah.name}</h3>
                              <p className="text-sm text-muted-foreground">{surah.meaning}</p>
                            </div>
                          </div>
                          <div className="mt-2 text-right">
                            <p className="text-xl font-arabic text-primary">{surah.nameArabic}</p>
                            <p className="text-xs text-muted-foreground">{surah.totalAyah} Ayat</p>
                          </div>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeFavoriteSurah(surah.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="ayahs">
            {favoriteAyahs.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Heart className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Belum ada ayat favorit</h3>
                  <p className="text-muted-foreground mb-4">
                    Tandai ayat favorit Anda saat membaca Al-Qur'an
                  </p>
                  <Link to="/">
                    <Button>Mulai Membaca</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {favoriteAyahs.map((ayah, index) => (
                  <Card key={`${ayah.surahId}-${ayah.ayahNumber}-${index}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <Link 
                            to={`/surah/${ayah.surahId}?ayah=${ayah.ayahNumber}`}
                            className="text-sm text-primary hover:underline font-medium"
                          >
                            {ayah.surahName} : {ayah.ayahNumber}
                          </Link>
                          <p className="text-xl font-arabic text-right mt-2 leading-loose">
                            {ayah.text}
                          </p>
                          <p className="text-sm text-muted-foreground mt-2">
                            {ayah.translation}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFavoriteAyah(ayah.surahId, ayah.ayahNumber)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Favorites;
