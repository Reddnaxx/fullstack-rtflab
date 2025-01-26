import { Roboto, Roboto_Condensed } from 'next/font/google';
import { ToastContainer } from 'react-toastify';

import { AuthLoaderWrapper } from '@/features/auth/ui';
import { Header } from '@/widgets/Header';

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
}

export default function RootLayout({ children }: Readonly<LayoutProps>) {
  return (
    <html lang="ru">
      <body
        className={`${roboto.className} ${robotoCondensed.variable} antialiased`}
      >
        <Providers>
          <AuthLoaderWrapper>
            <div className="flex h-screen flex-col">
              <Header />
              <main className="container mt-14 flex-1">{children}</main>
            </div>
          </AuthLoaderWrapper>
          <ToastContainer position="bottom-right" />
        </Providers>
      </body>
    </html>
  );
}
