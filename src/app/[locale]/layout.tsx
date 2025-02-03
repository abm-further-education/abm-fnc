import localFont from 'next/font/local';
import { Provider } from '@/lib/reactQuery-provider';
import Layout from '@/components/common/Layout';
import TopButton from '@/components/common/TopButton';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Script from 'next/script';

import '../globals.css';

export const inter = localFont({
  src: '../fonts/Inter-VariableFont_opsz,wght.ttf',
  variable: '--font-inter',
  weight: '100 900',
});

export const tinos = localFont({
  src: '../fonts/Tinos-Regular.ttf',
  variable: '--font-tinos',
  weight: '100 900',
});

export const montserrat = localFont({
  src: '../fonts/Montserrat-VariableFont_wght.ttf',
  variable: '--font-montserrat',
  weight: '100 900',
});

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  if (
    !routing.locales.includes(
      locale as 'en' | 'ko' | 'sp' | 'jp' | 'fr' | 'th' | 'pt'
    )
  ) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-bg`}>
        <NextIntlClientProvider messages={messages}>
          <Provider>
            <Layout>{children}</Layout>
            <TopButton />
          </Provider>
        </NextIntlClientProvider>
        <Script
          src="//code.tidio.co/lzyrbzqycwm2brpbgl2bzrqxxteusihm.js"
          async
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
