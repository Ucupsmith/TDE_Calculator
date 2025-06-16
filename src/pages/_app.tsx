import '@/styles/globals.css';
import 'swiper/css';
import 'swiper/css/pagination';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@material-tailwind/react';
import AppShell from '@/layouts/Appshell';
import { SessionProvider } from 'next-auth/react';
import { SessionExpiredProvider } from '@/common/SessionExpiredContext';
import SessionExpiredModal from '@/components/common/SessionExpiredModal';
import { TdeeProvider } from '@/common/TdeeProvider';
import { useEffect } from 'react';
// import { requestNotificationPermission } from '@/utils/notificationUtils';

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  useEffect(() => {
    const initNotifications = async () => {
      if ('serviceWorker' in navigator) {
        try {
          await navigator.serviceWorker.register('/sw.js');
          console.log('Service Worker berhasil didaftarkan');
          // await requestNotificationPermission();
        } catch (error) {
          console.error('Gagal mendaftarkan Service Worker:', error);
        }
      }
    };

    initNotifications();
  }, []);
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <SessionExpiredProvider>
          <SessionExpiredModal />
          <AppShell>
            <TdeeProvider>
              <Component {...pageProps} />
            </TdeeProvider>
          </AppShell>
          <SessionExpiredModal />
        </SessionExpiredProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
