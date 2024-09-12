import { Footer, Header } from '@/_component';
import { ScrollTopFloatingButton } from '@/_component/client';
import '@/_css/globals.css';
import '@/_css/highlight.css';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import localFont from 'next/font/local';

dayjs.locale('ko');
dayjs.extend(relativeTime);

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

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang='en'>
      <head>
        <script
          async
          type='module'
          dangerouslySetInnerHTML={{
            __html: `
            (() => { 
              // FOUC(Flash of Unstyled Content) 방지를 위한 동기 스크립트 삽입
              // Hydration 에러 발생할 수 밖에 없음
              try {
                if ( localStorage.theme === 'dark' || (!(localStorage.theme === '') && window.matchMedia('(prefers-color-scheme: dark)').matches)) 
                {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            })();
            `,
          }}
        />
      </head>
      <body
        className={`${(inter.variable, roboto_mono.variable, pretendard.variable)} font-pret
        dark:bg-gray-950 dark:text-white`}>
        <Header />
        <main
          className='m-auto min-h-screen min-w-[320px] max-w-[1024px] 
          border-x border-x-gray-200 bg-white pt-12 
        dark:border-x-gray-800 dark:bg-gray-950 '>
          {children}
        </main>
        <Footer />
        <ScrollTopFloatingButton />
      </body>
    </html>
  );
}
