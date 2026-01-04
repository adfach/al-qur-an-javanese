import React from 'react';
import { Share2, Bookmark, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Ayah } from '@/data/quranData';
import { useReadingPreferences } from '@/hooks/useLocalStorage';
import { cn } from '@/lib/utils';

interface AyahCardProps {
  ayah: Ayah;
  surahName: string;
  surahNameArabic: string;
}

const toArabicNumber = (num: number): string => {
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return num.toString().split('').map(d => arabicDigits[parseInt(d)]).join('');
};

export const AyahCard: React.FC<AyahCardProps> = ({ ayah, surahName, surahNameArabic }) => {
  const [preferences] = useReadingPreferences();
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handleShare = async () => {
    const shareText = `${ayah.text}\n\n"${ayah.translation}"\n\n— ${surahName} (${surahNameArabic}), Ayat ${ayah.number}\n\n🕌 Al-Qur'an Javanese`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${surahName} Ayat ${ayah.number}`,
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or share failed
        copyToClipboard(shareText);
      }
    } else {
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add toast notification here
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // Audio implementation would go here
  };

  return (
    <div className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-300 animate-fade-in">
      {/* Ayah Number Badge */}
      <div className="absolute -top-3 left-6 px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium shadow-md">
        Ayat {ayah.number}
      </div>

      {/* Arabic Text */}
      <div 
        className="quran-arabic text-quran-arabic text-right leading-loose mb-6 pt-4"
        style={{ fontSize: `${preferences.fontSize.arabic}px` }}
      >
        {ayah.text}
        <span className="inline-block mx-2 text-primary">
          ﴿{toArabicNumber(ayah.number)}﴾
        </span>
      </div>

      {/* Latin Transliteration */}
      {preferences.showLatin && (
        <p 
          className="quran-latin text-quran-latin mb-4 border-l-2 border-primary/30 pl-4"
          style={{ fontSize: `${preferences.fontSize.latin}px` }}
        >
          {ayah.latin}
        </p>
      )}

      {/* Translation */}
      {preferences.showTranslation && (
        <p 
          className="text-quran-translation"
          style={{ fontSize: `${preferences.fontSize.translation}px` }}
        >
          {ayah.translation}
        </p>
      )}

      {/* Actions */}
      <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-border opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="sm"
          onClick={togglePlay}
          className="text-muted-foreground hover:text-primary"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 mr-1" />
          ) : (
            <Play className="w-4 h-4 mr-1" />
          )}
          <span className="text-xs">Putar</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-primary"
        >
          <Bookmark className="w-4 h-4 mr-1" />
          <span className="text-xs">Tandai</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleShare}
          className="text-muted-foreground hover:text-primary"
        >
          <Share2 className="w-4 h-4 mr-1" />
          <span className="text-xs">Bagikan</span>
        </Button>
      </div>
    </div>
  );
};
