import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@material-tailwind/react';
import AppShell from '@/layouts/Appshell';
import { SessionProvider } from 'next-auth/react';

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <AppShell>
          <Component {...pageProps} />
        </AppShell>
      </ThemeProvider>
    </SessionProvider>
  );
}
