import { useState, useEffect } from 'react';
import { PrayerTime } from '@/types/quran';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface PrayerTimesResponse {
  data: {
    timings: {
      Fajr: string;
      Sunrise: string;
      Dhuhr: string;
      Asr: string;
      Maghrib: string;
      Isha: string;
    };
    date: {
      hijri: {
        day: string;
        month: {
          en: string;
          ar: string;
        };
        year: string;
      };
    };
    meta: {
      timezone: string;
    };
  };
}

const defaultCoordinates: Coordinates = {
  latitude: -6.2088, // Jakarta
  longitude: 106.8456,
};

export function usePrayerTimes() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [hijriDate, setHijriDate] = useState<string>('');
  const [location, setLocation] = useState<string>('Indonesia');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrayerTimes = async (coords: Coordinates) => {
    try {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const yyyy = today.getFullYear();
      
      const response = await fetch(
        `https://api.aladhan.com/v1/timings/${dd}-${mm}-${yyyy}?latitude=${coords.latitude}&longitude=${coords.longitude}&method=20`
      );
      
      if (!response.ok) throw new Error('Failed to fetch prayer times');
      
      const data: PrayerTimesResponse = await response.json();
      
      const times: PrayerTime[] = [
        { name: 'Subuh', nameArabic: 'الفجر', time: data.data.timings.Fajr },
        { name: 'Terbit', nameArabic: 'الشروق', time: data.data.timings.Sunrise },
        { name: 'Dzuhur', nameArabic: 'الظهر', time: data.data.timings.Dhuhr },
        { name: 'Ashar', nameArabic: 'العصر', time: data.data.timings.Asr },
        { name: 'Maghrib', nameArabic: 'المغرب', time: data.data.timings.Maghrib },
        { name: 'Isya', nameArabic: 'العشاء', time: data.data.timings.Isha },
      ];
      
      setPrayerTimes(times);
      setHijriDate(`${data.data.date.hijri.day} ${data.data.date.hijri.month.ar} ${data.data.date.hijri.year}`);
      setError(null);
    } catch (err) {
      console.error('Error fetching prayer times:', err);
      setError('Gagal memuat jadwal sholat');
      // Set default times
      setPrayerTimes([
        { name: 'Subuh', nameArabic: 'الفجر', time: '04:30' },
        { name: 'Terbit', nameArabic: 'الشروق', time: '05:45' },
        { name: 'Dzuhur', nameArabic: 'الظهر', time: '12:00' },
        { name: 'Ashar', nameArabic: 'العصر', time: '15:15' },
        { name: 'Maghrib', nameArabic: 'المغرب', time: '18:00' },
        { name: 'Isya', nameArabic: 'العشاء', time: '19:15' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getLocationAndFetch = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const coords = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            setLocation('Lokasi Anda');
            fetchPrayerTimes(coords);
          },
          () => {
            // User denied location or error, use default
            setLocation('Jakarta, Indonesia');
            fetchPrayerTimes(defaultCoordinates);
          },
          { timeout: 5000 }
        );
      } else {
        setLocation('Jakarta, Indonesia');
        fetchPrayerTimes(defaultCoordinates);
      }
    };

    getLocationAndFetch();
  }, []);

  return { prayerTimes, hijriDate, location, loading, error };
}
