import { Footer, Header } from '@/component';
import { ScrollTopFloatingButton } from '@/component/client';
import '@/css/globals.css';
import '@/css/highlight.css';
import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import localFont from 'next/font/local';

// next/font/google
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

// next/font/google
const roboto_mono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
  display: 'swap',
});

// next/font/local
const pretendard = localFont({
  variable: '--font-pretendard',
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
});

export const metadata: Metadata = {
  title: 'RHUK2',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <script async type='module' src='/script/dom_init.mjs'></script>
      </head>
      <body
        className={`${(inter.variable, roboto_mono.variable, pretendard.variable)} font-pret dark:bg-gray-950 dark:text-white`}>
        <Header />
        <main className='m-auto min-h-screen min-w-[320px] max-w-[1024px] border-x border-x-gray-200 bg-white pt-12 dark:border-x-gray-800 dark:bg-gray-950 '>
          {children}
        </main>
        <Footer />
        <ScrollTopFloatingButton />
      </body>
    </html>
  );
}
