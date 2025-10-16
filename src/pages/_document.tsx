import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head>
        <meta
          name="description"
          content="PneumoScan – AI-powered pneumonia detection from chest X-rays."
        />
        <meta
          name="keywords"
          content="AI, Pneumonia, Detection, X-ray, Medical Imaging, Healthcare, Next.js"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
