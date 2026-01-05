import React from 'react';
import { Clock } from 'lucide-react';
import { usePrayerTimes } from '@/hooks/usePrayerTimes';
import { cn } from '@/lib/utils';

export const PrayerTimesWidget: React.FC = () => {
  const { prayerTimes, hijriDate, location, loading, error } = usePrayerTimes();
  
  // Get current prayer
  const getCurrentPrayer = () => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    for (let i = prayerTimes.length - 1; i >= 0; i--) {
      const [hours, minutes] = prayerTimes[i].time.split(':').map(Number);
      const prayerTime = hours * 60 + minutes;
      if (currentTime >= prayerTime) {
        return prayerTimes[i].name;
      }
    }
    return prayerTimes[prayerTimes.length - 1]?.name || '';
  };

  const currentPrayer = getCurrentPrayer();

  if (loading) {
    return (
      <div className="p-4 rounded-xl bg-card border border-border animate-pulse">
        <div className="h-4 bg-muted rounded w-1/3 mb-3"></div>
        <div className="h-6 bg-muted rounded w-2/3"></div>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Jadwal Sholat</span>
        </div>
        <span className="text-xs text-muted-foreground">{location}</span>
      </div>
      
      {/* Hijri Date */}
      {hijriDate && (
        <p className="text-xs text-muted-foreground mb-3 font-arabic">{hijriDate}</p>
      )}
      
      {/* Prayer Times Grid */}
      <div className="grid grid-cols-3 gap-2">
        {prayerTimes.map((prayer) => (
          <div
            key={prayer.name}
            className={cn(
              "text-center p-2 rounded-lg transition-colors",
              currentPrayer === prayer.name
                ? "bg-primary text-primary-foreground"
                : "bg-background/50"
            )}
          >
            <p className={cn(
              "text-xs font-medium",
              currentPrayer === prayer.name ? "text-primary-foreground" : "text-foreground"
            )}>
              {prayer.name}
            </p>
            <p className={cn(
              "text-sm font-semibold",
              currentPrayer === prayer.name ? "text-primary-foreground" : "text-primary"
            )}>
              {prayer.time}
            </p>
          </div>
        ))}
      </div>
      
      {error && (
        <p className="text-xs text-destructive mt-2">{error}</p>
      )}
    </div>
  );
};
