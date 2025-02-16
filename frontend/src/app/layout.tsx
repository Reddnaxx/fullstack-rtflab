import { Roboto, Roboto_Condensed } from 'next/font/google';
import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';

import { Header } from '@/widgets/Header/ui';

import { Providers } from './Providers';
import './globals.css';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const roboto = Roboto({
  display: 'swap',
  weight: ['300', '400', '500', '700', '900'],
  preload: true,
  style: 'normal',
  subsets: ['cyrillic', 'latin'],
  variable: '--font-roboto-condensed',
});

const robotoCondensed = Roboto_Condensed({
  display: 'swap',
  weight: ['500', '700'],
  preload: true,
  style: 'normal',
  subsets: ['cyrillic', 'latin'],
  variable: '--font-roboto-condensed',
});

export const metadata: Metadata = {
  title: 'RTFLab',
};

interface LayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

export default function RootLayout({ children, modal }: Readonly<LayoutProps>) {
  return (
    <html lang="ru">
      <body
        className={`${roboto.className} ${robotoCondensed.variable} antialiased`}
      >
        <Providers>
          <div className="flex h-screen flex-col">
            <Suspense>
              <Header />
            </Suspense>
            <main className="container mt-14 flex-1">{children}</main>
          </div>
          <ToastContainer position="bottom-right" />
          {modal}
        </Providers>
      </body>
    </html>
  );
}
