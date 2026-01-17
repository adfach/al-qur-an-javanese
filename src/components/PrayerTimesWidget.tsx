import React, { useEffect, useState } from 'react';
import { Clock, MapPin, RefreshCw, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
    getUserLocation,
    getPrayerTimes,
    getNextPrayer,
    PrayerTimes as PrayerTimesData,
} from '@/services/prayerTimesAPI';
import { useReadingPreferences } from '@/hooks/useLocalStorage';

export const PrayerTimesWidget: React.FC = () => {
    const [preferences, setPreferences] = useReadingPreferences();
    const [prayerTimes, setPrayerTimes] = useState<PrayerTimesData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    // Update current time every minute
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); // Update every minute

        return () => clearInterval(timer);
    }, []);

    // Load prayer times
    useEffect(() => {
        loadPrayerTimes();
    }, []);

    const loadPrayerTimes = async () => {
        try {
            setLoading(true);
            setError(null);

            // Try to get user location
            const location = await getUserLocation();

            // Save location to preferences
            setPreferences(prev => ({
                ...prev,
                location: {
                    city: 'Unknown',
                    latitude: location.latitude,
                    longitude: location.longitude,
                },
            }));

            // Fetch prayer times
            const times = await getPrayerTimes(location.latitude, location.longitude);
            setPrayerTimes(times);
        } catch (err) {
            console.error('Error loading prayer times:', err);
            setError('Gagal memuat jadwal sholat. Izinkan akses lokasi atau coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    const prayers = prayerTimes
        ? [
            { name: 'Subuh', time: prayerTimes.fajr, icon: '🌅' },
            { name: 'Dhuha', time: prayerTimes.dhuha, icon: '☀️' },
            { name: 'Dzuhur', time: prayerTimes.dhuhr, icon: '🌞' },
            { name: 'Ashar', time: prayerTimes.asr, icon: '🌤️' },
            { name: 'Maghrib', time: prayerTimes.maghrib, icon: '🌆' },
            { name: 'Isya', time: prayerTimes.isha, icon: '🌙' },
        ]
        : [];

    const nextPrayer = prayerTimes ? getNextPrayer(prayerTimes) : null;

    if (loading) {
        return (
            <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                <div className="flex items-center justify-center gap-3">
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground">Memuat jadwal sholat...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 rounded-xl bg-gradient-to-br from-destructive/10 to-destructive/5 border border-destructive/20">
                <div className="flex items-center gap-3 mb-3">
                    <MapPin className="w-5 h-5 text-destructive" />
                    <h4 className="font-semibold text-foreground">Waktu Sholat</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{error}</p>
                <Button
                    onClick={loadPrayerTimes}
                    size="sm"
                    variant="outline"
                    className="w-full"
                >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Coba Lagi
                </Button>
            </div>
        );
    }

    return (
        <div className="group p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 hover:shadow-lg transition-all duration-300">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold text-foreground">Waktu Sholat</h4>
                </div>
                <Button
                    onClick={loadPrayerTimes}
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 hover:bg-primary/20"
                >
                    <RefreshCw className="w-4 h-4 text-primary" />
                </Button>
            </div>

            {/* Location */}
            {prayerTimes?.city && (
                <div className="flex items-center gap-1 mb-4 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span>{prayerTimes.city}</span>
                </div>
            )}

            {/* Prayer Times Grid */}
            <div className="grid grid-cols-2 gap-3">
                {prayers.map((prayer) => {
                    const isNext = nextPrayer?.name === prayer.name;
                    return (
                        <div
                            key={prayer.name}
                            className={cn(
                                'p-3 rounded-lg transition-all duration-300',
                                isNext
                                    ? 'bg-primary text-primary-foreground shadow-md scale-105'
                                    : 'bg-background/50 hover:bg-background/80'
                            )}
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-lg">{prayer.icon}</span>
                                <span className={cn(
                                    'text-xs font-medium',
                                    isNext ? 'text-primary-foreground' : 'text-muted-foreground'
                                )}>
                                    {prayer.name}
                                </span>
                            </div>
                            <p className={cn(
                                'text-lg font-bold',
                                isNext ? 'text-primary-foreground' : 'text-foreground'
                            )}>
                                {prayer.time}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Next Prayer Indicator */}
            {nextPrayer && (
                <div className="mt-4 pt-4 border-t border-primary/20">
                    <p className="text-xs text-center text-muted-foreground">
                        Sholat selanjutnya: <strong className="text-primary">{nextPrayer.name}</strong> pukul <strong>{nextPrayer.time}</strong>
                    </p>
                </div>
            )}
        </div>
    );
};
