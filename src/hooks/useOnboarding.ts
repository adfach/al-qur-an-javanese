import { useEffect } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

export const useOnboarding = (page: 'home' | 'surah') => {
    useEffect(() => {
        const hasSeenHomeTour = localStorage.getItem('hasSeenHomeTour');
        const hasSeenSurahTour = localStorage.getItem('hasSeenSurahTour');

        if (page === 'home' && !hasSeenHomeTour) {
            const driverObj = driver({
                showProgress: true,
                steps: [
                    {
                        element: '#site-logo',
                        popover: {
                            title: 'Selamat Datang!',
                            description: 'Ini adalah Al-Qur\'an Javanese. Platform untuk membaca dan mempelajari Al-Qur\'an dengan standar Kemenag RI.',
                            side: "bottom",
                            align: 'start'
                        }
                    },
                    {
                        element: '#search-container',
                        popover: {
                            title: 'Cari Surah',
                            description: 'Gunakan kotak pencarian ini untuk mencari surah berdasarkan nama, nomor, atau artinya.',
                            side: "bottom",
                            align: 'start'
                        }
                    },
                    {
                        element: '#prayer-times',
                        popover: {
                            title: 'Jadwal Sholat',
                            description: 'Pantau waktu sholat berdasarkan lokasi Anda di sini.',
                            side: "bottom",
                            align: 'start'
                        }
                    },
                    {
                        element: '#dark-mode-toggle',
                        popover: {
                            title: 'Mode Gelap/Terang',
                            description: 'Klik ikon bulan sabit/matahari ini untuk mengubah tema website menjadi mode gelap atau terang sesuai kenyamanan Anda.',
                            side: "bottom",
                            align: 'end'
                        }
                    },
                    {
                        element: '#feedback-button',
                        popover: {
                            title: 'Saran & Masukan',
                            description: 'Klik ikon tanda seru ini untuk memberikan kritik, saran, atau masukan untuk pengembangan website ini.',
                            side: "bottom",
                            align: 'end'
                        }
                    },
                    {
                        element: '#surah-list',
                        popover: {
                            title: 'Daftar Surah',
                            description: 'Pilih surah yang ingin Anda baca dari daftar ini. Anda juga bisa melihat berdasarkan Juz.',
                            side: "top",
                            align: 'start'
                        }
                    }
                ],
                onDestroyed: () => {
                    localStorage.setItem('hasSeenHomeTour', 'true');
                }
            });

            driverObj.drive();
        }

        if (page === 'surah' && !hasSeenSurahTour) {
            const driverObj = driver({
                showProgress: true,
                steps: [
                    {
                        element: '#back-button',
                        popover: {
                            title: 'Kembali',
                            description: 'Klik di sini untuk kembali ke daftar surah.',
                            side: "bottom",
                            align: 'start'
                        }
                    },
                    {
                        element: '#font-settings',
                        popover: {
                            title: 'Pengaturan Font',
                            description: 'Sesuaikan ukuran font Arab dan terjemahan agar nyaman dibaca.',
                            side: "bottom",
                            align: 'end'
                        }
                    },
                    {
                        element: '#tajwid-button',
                        popover: {
                            title: 'Panduan Tajwid',
                            description: 'Lihat referensi kode warna tajwid untuk membantu tilawah Anda.',
                            side: "bottom",
                            align: 'end'
                        }
                    },
                    {
                        element: '#favorite-surah',
                        popover: {
                            title: 'Tandai Favorit',
                            description: 'Simpan surah ini ke daftar favorit Anda agar mudah diakses nanti.',
                            side: "bottom",
                            align: 'center'
                        }
                    }
                ],
                onDestroyed: () => {
                    localStorage.setItem('hasSeenSurahTour', 'true');
                }
            });

            setTimeout(() => {
                driverObj.drive();
            }, 1000); // Wait for content to load
        }
    }, [page]);
};
