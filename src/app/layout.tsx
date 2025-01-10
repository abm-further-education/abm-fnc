import localFont from 'next/font/local';
import { Provider } from '@/lib/reactQuery-provider';
import Layout from '@/components/common/Layout';
import './globals.css';
import TopButton from '@/components/common/TopButton';

export const inter = localFont({
  src: './fonts/Inter-VariableFont_opsz,wght.ttf',
  variable: '--font-inter',
  weight: '100 900',
});

export const tinos = localFont({
  src: './fonts/Tinos-Regular.ttf',
  variable: '--font-tinos',
  weight: '100 900',
});

export const montserrat = localFont({
  src: './fonts/Montserrat-VariableFont_wght.ttf',
  variable: '--font-montserrat',
  weight: '100 900',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-bg`}>
        <Provider>
          <Layout>{children}</Layout>
          <TopButton />
        </Provider>
      </body>
    </html>
  );
}
