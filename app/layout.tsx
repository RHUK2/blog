import '@/_css/globals.css';
import '@/_css/highlight.css';
import { Footer, Header } from '@/_serverComponent';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { ScrollTopFloatingButton } from './_clientComponent';
import { CustomQueryClientProvider } from './_provider';

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
  description: 'blog',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang='en'>
      <body
        className={`${(inter.variable, roboto_mono.variable, pretendard.variable)} font-pret dark:bg-gray-950 dark:text-white`}>
        <CustomQueryClientProvider>
          <Header />
          {children}
          <Footer />
          {/* <ScrollTopFloatingButton /> */}
        </CustomQueryClientProvider>
      </body>
    </html>
  );
}
