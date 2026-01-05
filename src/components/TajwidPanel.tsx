import React from 'react';
import { X, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { tajwidRules } from '@/data/tajwidRules';
import { cn } from '@/lib/utils';

interface TajwidPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const getTajwidColorClass = (color: string): string => {
  const colorMap: Record<string, string> = {
    'tajwid-ikhfa': 'bg-[hsl(200,70%,50%)]',
    'tajwid-idgham-bighunnah': 'bg-[hsl(270,55%,58%)]',
    'tajwid-idgham-bilaghunnah': 'bg-[hsl(290,50%,55%)]',
    'tajwid-iqlab': 'bg-[hsl(45,80%,50%)]',
    'tajwid-idzhar': 'bg-[hsl(180,60%,45%)]',
    'tajwid-ghunnah': 'bg-[hsl(120,50%,45%)]',
    'tajwid-qalqalah': 'bg-[hsl(350,70%,55%)]',
    'tajwid-mad': 'bg-[hsl(25,80%,55%)]',
    'tajwid-mad-wajib': 'bg-[hsl(15,75%,52%)]',
    'tajwid-mad-jaiz': 'bg-[hsl(30,70%,50%)]',
    'tajwid-mad-lazim': 'bg-[hsl(0,65%,55%)]',
    'tajwid-idgham-mimi': 'bg-[hsl(260,55%,60%)]',
    'tajwid-ikhfa-syafawi': 'bg-[hsl(190,65%,48%)]',
    'tajwid-waqf': 'bg-[hsl(100,50%,45%)]',
    'tajwid-hamzah-washal': 'bg-[hsl(210,60%,50%)]',
    'tajwid-tafkhim': 'bg-[hsl(330,55%,55%)]',
    'tajwid-tarqiq': 'bg-[hsl(160,50%,50%)]',
    'tajwid-lafdz-jalalah': 'bg-[hsl(156,70%,40%)]',
    'tajwid-ra': 'bg-[hsl(340,60%,52%)]',
  };
  return colorMap[color] || 'bg-primary';
};

export const TajwidPanel: React.FC<TajwidPanelProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-20 right-4 z-40 w-80 max-h-[calc(100vh-120px)] overflow-hidden rounded-xl bg-card border border-border shadow-xl animate-scale-in">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-primary/5">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">20 Hukum Tajwid</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="overflow-y-auto max-h-[calc(100vh-200px)] p-4 space-y-3 scrollbar-thin">
        {tajwidRules.map((rule) => (
          <div 
            key={rule.id}
            className="p-3 rounded-lg bg-muted/50 border border-border"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={cn(
                "w-3 h-3 rounded-full flex-shrink-0",
                getTajwidColorClass(rule.color)
              )} />
              <h4 className="font-medium text-foreground text-sm">{rule.name}</h4>
              <span className="font-arabic text-sm text-primary">{rule.nameArabic}</span>
            </div>
            
            <p className="text-xs text-muted-foreground mb-2 leading-relaxed">
              {rule.description}
            </p>
            
            <div className="text-xs space-y-1">
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">Huruf:</span>{' '}
                <span className="font-arabic text-primary">{rule.letters}</span>
              </p>
              <div className="p-2 rounded bg-background/50 border border-border/50">
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">Contoh:</span>
                </p>
                <p className="font-arabic text-primary text-base mt-1">{rule.exampleArabic}</p>
                <p className="text-muted-foreground italic text-[11px] mt-0.5">{rule.example}</p>
              </div>
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
