import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Provider } from '@/lib/reactQuery-provider';
import Layout from '@/components/Layout';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'ABM Further Education',
  description:
    'ABM Further Education provides accredited business, hospitality, and management courses to help students succeed in various industries.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased bg-bg`}>
        <Provider>
          <Layout>{children}</Layout>
        </Provider>
      </body>
    </html>
  );
}
