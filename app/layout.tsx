import { Footer, Header } from '@/component';
import '@/css/globals.css';
import '@/css/github-markdown.css';
import '@/css/github.css';
import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import { ScrollTopFloatingButton } from '@/component/client';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
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
    // 동기 스크립트 삽입으로 인한 hydration 에러 발생, 해당 에러 끄기
    <html lang='en' suppressHydrationWarning>
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src='./script/dom_init.js'></script>
      </head>
      <body className={`${(inter.variable, roboto_mono.variable)} font-mono dark:bg-gray-950 `}>
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
