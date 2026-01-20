import React from 'react';
import { Info, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { tajwidRules } from '@/data/quranData';
import { cn } from '@/lib/utils';

interface TajwidPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const getTajwidBgClass = (colorClass: string): string => {
  const map: Record<string, string> = {
    'tajwid-izhar': 'bg-tajwid-izhar',
    'tajwid-ikhfa': 'bg-tajwid-ikhfa',
    'tajwid-idgham': 'bg-tajwid-idgham',
    'tajwid-idgham-bila': 'bg-tajwid-idgham-bila',
    'tajwid-iqlab': 'bg-tajwid-iqlab',
    'tajwid-ikhfa-syafawi': 'bg-tajwid-ikhfa-syafawi',
    'tajwid-izhar-syafawi': 'bg-tajwid-izhar-syafawi',
    'tajwid-idgham-syafawi': 'bg-tajwid-idgham-syafawi',
    'tajwid-mad-asli': 'bg-tajwid-mad-asli',
    'tajwid-mad-wajib': 'bg-tajwid-mad-wajib',
    'tajwid-mad-jaiz': 'bg-tajwid-mad-jaiz',
    'tajwid-mad-lazim': 'bg-tajwid-mad-lazim',
    'tajwid-mad-arid': 'bg-tajwid-mad-arid',
    'tajwid-mad-lin': 'bg-tajwid-mad-lin',
    'tajwid-qalqalah': 'bg-tajwid-qalqalah',
    'tajwid-ghunnah': 'bg-tajwid-ghunnah',
    'tajwid-tafkhim': 'bg-tajwid-tafkhim',
    'tajwid-tarqiq': 'bg-tajwid-tarqiq',
    'tajwid-lam-tarif': 'bg-tajwid-lam-tarif',
  };
  return map[colorClass] || 'bg-primary';
};

export const TajwidPanel: React.FC<TajwidPanelProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-20 right-4 z-40 w-80 max-h-[calc(100vh-120px)] overflow-hidden rounded-xl bg-card border border-border shadow-xl animate-scale-in">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-primary/5">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Panduan Tajwid</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="overflow-y-auto max-h-[calc(100vh-200px)] p-4 space-y-4 scrollbar-thin">
        {tajwidRules.map((rule) => (
          <div
            key={rule.id}
            className="p-3 rounded-lg bg-muted/50 border border-border"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={cn(
                "w-3 h-3 rounded-full",
                getTajwidBgClass(rule.color)
              )} />
              <h4 className="font-medium text-foreground">{rule.name}</h4>
              <span className="quran-arabic text-sm text-primary">{rule.nameArabic}</span>
            </div>

            <p className="text-sm text-muted-foreground mb-2">
              {rule.description}
            </p>

            <div className="text-xs space-y-1">
              <p className="text-muted-foreground">
                <span className="font-medium">Huruf:</span>{' '}
                <span className="quran-arabic">{rule.letters}</span>
              </p>
              <p className="text-muted-foreground italic">
                <span className="font-medium not-italic">Contoh:</span> {rule.example}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-border bg-muted/30">
        <p className="text-xs text-muted-foreground text-center">
          Pewarnaan tajwid sesuai standar Kemenag RI
        </p>
      </div>
    </div>
  );
};
