import React, { useState, useEffect } from 'react';

// Komponen buat ganti tema (light ↔ dark)
const ThemeToggle: React.FC = () => {
  // Simpan tema sekarang, default “light”
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Flag biar tahu komponen udah muncul di browser (hindari error di SSR)
  const [mounted, setMounted] = useState(false);

  // Cek localStorage begitu komponen muncul
  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
      if (saved) setTheme(saved); // Kalau ada setingan lama, pakai itu
    }
  }, []);

  // Tempel / copot class “dark” di tag <html> + simpan pilihan user
  useEffect(() => {
    if (!mounted) return; // Pastikan udah mounted dulu
    const root = window.document.documentElement;
    theme === 'dark'
      ? root.classList.add('dark')
      : root.classList.remove('dark');
    localStorage.setItem('theme', theme); // Ingat pilihan user
  }, [theme, mounted]);

  // Ganti tema ketika tombol diklik
  const toggleTheme = () =>
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  // Render kosong dulu sampe komponen siap
  if (!mounted) return null;

  return (
    <div className='w-auto flex items-center pt-4 pb-2'>
      <button
        aria-label='Toggle Dark Mode'
        onClick={toggleTheme}
        className='p-1 md:p-2 rounded-full border border-gray-300 bg-white dark:bg-gray-800
                   dark:border-gray-700 transition-all duration-300 flex items-center
                   justify-center shadow hover:scale-110 focus:outline-none'
      >
        <span
          className={`inline-block transition-transform duration-500 ${
            theme === 'dark'
              ? 'rotate-[360deg] scale-110'
              : 'rotate-0 scale-100'
          }`}
        >
          {theme === 'dark' ? (
            /* Ikon bulan */
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              fill='none'
              viewBox='0 0 24 24'
            >
              <path
                fill='#FBBF24'
                d='M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z'
              />
            </svg>
          ) : (
            /* Ikon matahari */
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle cx='12' cy='12' r='5' fill='#FBBF24' />
              <g stroke='#FBBF24' strokeWidth='2'>
                <path d='M12 1v2' />
                <path d='M12 21v2' />
                <path d='M4.22 4.22l1.42 1.42' />
                <path d='M18.36 18.36l1.42 1.42' />
                <path d='M1 12h2' />
                <path d='M21 12h2' />
                <path d='M4.22 19.78l1.42-1.42' />
                <path d='M18.36 5.64l1.42-1.42' />
              </g>
            </svg>
          )}
        </span>
      </button>
    </div>
  );
};

export default ThemeToggle;
