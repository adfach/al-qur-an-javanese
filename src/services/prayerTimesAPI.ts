/**
 * Service untuk integrasi dengan Aladhan Prayer Times API
 * Menyediakan jadwal waktu sholat berdasarkan lokasi
 */

export interface PrayerTimes {
    fajr: string;      // Subuh
    dhuha: string;     // Dhuha
    dhuhr: string;     // Dzuhur
    asr: string;       // Ashar
    maghrib: string;   // Maghrib
    isha: string;      // Isya
    date: string;
    city?: string;
    country?: string;
}

export interface GeolocationCoords {
    latitude: number;
    longitude: number;
}

const ALADHAN_BASE_URL = 'https://api.aladhan.com/v1';

/**
 * Get lokasi pengguna menggunakan Geolocation API
 */
export async function getUserLocation(): Promise<GeolocationCoords> {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation tidak didukung oleh browser ini'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => {
                reject(new Error(`Error mendapatkan lokasi: ${error.message}`));
            }
        );
    });
}

/**
 * Fetch jadwal waktu sholat berdasarkan koordinat
 * @param latitude - Latitude lokasi
 * @param longitude - Longitude lokasi
 * @param date - Tanggal (format: DD-MM-YYYY), default: hari ini
 */
export async function getPrayerTimes(
    latitude: number,
    longitude: number,
    date?: Date
): Promise<PrayerTimes> {
    try {
        const dateStr = date
            ? `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
            : '';

        const url = dateStr
            ? `${ALADHAN_BASE_URL}/timings/${dateStr}?latitude=${latitude}&longitude=${longitude}&method=20`
            : `${ALADHAN_BASE_URL}/timings?latitude=${latitude}&longitude=${longitude}&method=20`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const timings = data.data.timings;
        const meta = data.data.meta;

        // Calculate Dhuha time (15-20 minutes after sunrise)
        const sunriseTime = timings.Sunrise;
        const dhuhaTime = addMinutesToTime(sunriseTime, 15);

        return {
            fajr: timings.Fajr,
            dhuha: dhuhaTime,
            dhuhr: timings.Dhuhr,
            asr: timings.Asr,
            maghrib: timings.Maghrib,
            isha: timings.Isha,
            date: data.data.date.readable,
            city: meta.timezone,
        };
    } catch (error) {
        console.error('Error fetching prayer times:', error);
        throw error;
    }
}

/**
 * Fetch jadwal waktu sholat berdasarkan nama kota
 * @param city - Nama kota
 * @param country - Nama negara (default: 'Indonesia')
 */
export async function getPrayerTimesByCity(
    city: string,
    country: string = 'Indonesia'
): Promise<PrayerTimes> {
    try {
        const response = await fetch(
            `${ALADHAN_BASE_URL}/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=20`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const timings = data.data.timings;

        const sunriseTime = timings.Sunrise;
        const dhuhaTime = addMinutesToTime(sunriseTime, 15);

        return {
            fajr: timings.Fajr,
            dhuha: dhuhaTime,
            dhuhr: timings.Dhuhr,
            asr: timings.Asr,
            maghrib: timings.Maghrib,
            isha: timings.Isha,
            date: data.data.date.readable,
            city: city,
            country: country,
        };
    } catch (error) {
        console.error('Error fetching prayer times by city:', error);
        throw error;
    }
}

/**
 * Helper function untuk menambahkan menit ke waktu string (HH:MM)
 */
function addMinutesToTime(timeStr: string, minutes: number): string {
    const [hours, mins] = timeStr.split(':').map(Number);
    const totalMinutes = hours * 60 + mins + minutes;
    const newHours = Math.floor(totalMinutes / 60) % 24;
    const newMins = totalMinutes % 60;
    return `${newHours.toString().padStart(2, '0')}:${newMins.toString().padStart(2, '0')}`;
}

/**
 * Get waktu sholat berikutnya
 */
export function getNextPrayer(prayerTimes: PrayerTimes): { name: string; time: string } | null {
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const prayers = [
        { name: 'Subuh', time: prayerTimes.fajr },
        { name: 'Dhuha', time: prayerTimes.dhuha },
        { name: 'Dzuhur', time: prayerTimes.dhuhr },
        { name: 'Ashar', time: prayerTimes.asr },
        { name: 'Maghrib', time: prayerTimes.maghrib },
        { name: 'Isya', time: prayerTimes.isha },
    ];

    for (const prayer of prayers) {
        if (prayer.time > currentTime) {
            return prayer;
        }
    }

    // Jika semua waktu sholat sudah lewat, kembalikan Subuh esok hari
    return { name: 'Subuh', time: prayerTimes.fajr };
}
