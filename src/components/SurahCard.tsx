import React from 'react';
import { Heart, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Surah } from '@/types/quran';
import { useReadingPreferences } from '@/hooks/useLocalStorage';
import { cn } from '@/lib/utils';

interface SurahCardProps {
  surah: Surah;
  isFeatured?: boolean;
}

export const SurahCard: React.FC<SurahCardProps> = ({ surah, isFeatured = false }) => {
  const [preferences, setPreferences] = useReadingPreferences();
  
  const isFavorite = preferences.favoriteSurahs.includes(surah.id);
  const isLastRead = preferences.lastRead?.surahId === surah.id;

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const newFavorites = isFavorite
      ? preferences.favoriteSurahs.filter(n => n !== surah.id)
      : [...preferences.favoriteSurahs, surah.id];
    
    setPreferences({ ...preferences, favoriteSurahs: newFavorites });
  };

  return (
    <Link
      to={`/surah/${surah.id}`}
      className={cn(
        "group block relative overflow-hidden rounded-xl transition-all duration-300",
        "bg-card hover:bg-card/80 border border-border hover:border-primary/30",
        "hover:shadow-lg hover:shadow-primary/5",
        isFeatured && "ring-1 ring-primary/20",
        isLastRead && "ring-2 ring-accent"
      )}
    >
      {isLastRead && (
        <div className="absolute top-2 right-2 px-2 py-0.5 bg-accent text-accent-foreground text-xs rounded-full font-medium">
          Terakhir Dibaca
        </div>
      )}

      <div className="relative p-4 flex items-center gap-4">
        <div className={cn(
          "flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center",
          "bg-primary/10 text-primary font-semibold",
          "group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
        )}>
          {surah.id}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 mb-1">
            <h3 className="font-semibold text-foreground truncate">{surah.name}</h3>
            <span className="font-arabic text-lg text-primary flex-shrink-0">{surah.nameArabic}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{surah.meaning}</span>
            <span>•</span>
            <span>{surah.totalAyah} Ayat</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleFavorite}
            className={cn(
              "p-2 rounded-lg transition-colors",
              isFavorite 
                ? "text-primary hover:bg-primary/10" 
                : "text-muted-foreground hover:text-primary hover:bg-muted"
            )}
          >
            <Heart className={cn("w-5 h-5", isFavorite && "fill-current")} />
          </button>
          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </div>
    </Link>
  );
};
