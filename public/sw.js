// Nama cache yang digunakan untuk menyimpan file statis
const CACHE_NAME = 'tdee-calculator-v1';

// Daftar file yang akan disimpan ke cache saat service worker di-install
const urlsToCache = [
  '/',                      // Root halaman utama
  '/index.html',            // Halaman utama HTML
  '/manifest.json',         // Web App Manifest
  '/tdee.svg',              // Ikon/logo aplikasi
  '/homeicon.svg',          // Ikon navigasi home
  '/articleicon.svg',       // Ikon navigasi artikel
  '/offersicon.svg',        // Ikon navigasi penawaran
  '/mealplan.svg',          // Ikon meal plan
  '/profileicon.svg',       // Ikon profil
  '/article1gambar.svg',    // Gambar artikel pertama
  '/lari.svg',              // Ikon/gambar aktivitas lari
  '/sleep.svg',             // Ikon/gambar tidur
  '/nofound.png',           // Gambar not found / 404
  '/joko.jpg',              // Gambar pengguna/ilustrasi
  '/nilon.jpg'              // Gambar pengguna/ilustrasi
];

// Event ini dijalankan saat service worker di-install pertama kali
self.addEventListener('install', (event) => {
  // Menyimpan semua resource ke dalam cache
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Event ini menangani semua permintaan fetch (request ke server)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    // Cek apakah permintaan sudah ada di cache
    caches.match(event.request)
      .then((response) => {
        if (response) {
          // Jika ada di cache, langsung kembalikan dari cache
          return response;
        }

        // Jika tidak ada di cache, ambil dari jaringan (fetch)
        return fetch(event.request)
          .then((response) => {
            // Jika response tidak valid, langsung return
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone response agar bisa disimpan di cache dan dikembalikan
            const responseToCache = response.clone();

            // Simpan salinan ke cache untuk penggunaan berikutnya
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          });
      })
  );
});

// Event dijalankan saat service worker diaktifkan (biasanya setelah update)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    // Hapus cache lama jika ada versi cache yang berbeda
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            // Hapus cache lama
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
