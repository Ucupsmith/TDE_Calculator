import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@material-tailwind/react";
import AppShell from "@/layouts/Appshell";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <AppShell>
        <Component {...pageProps} />
      </AppShell>
    </ThemeProvider>
  );
}
