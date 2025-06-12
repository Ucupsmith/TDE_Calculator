import '@/styles/globals.css';
import 'swiper/css';
import 'swiper/css/pagination';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@material-tailwind/react';
import AppShell from '@/layouts/Appshell';
import { SessionProvider } from 'next-auth/react';
import { SessionExpiredProvider } from '@/common/SessionExpiredContext';
import SessionExpiredModal from '@/components/common/SessionExpiredModal';
import { useEffect } from 'react';
import { TdeeProvider } from '@/common/TdeeProvider';

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {

  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <SessionExpiredProvider>
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
