import "@/styles/globals.css";
import { Toaster } from "sonner";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Toaster position="top-right" richColors />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
