import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'katex/dist/katex.min.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ReactNode } from 'react';
import { Footer } from './_clientComponent';
import './_css/globals.css';
import './_css/highlight.css';
import 'katex/dist/katex.min.css';
import { CustomQueryClientProvider } from './_provider';
import { Header } from './_serverComponent';

dayjs.locale('ko');
dayjs.extend(relativeTime);

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
  children: ReactNode;
}

// list.json 업데이트
// await writeMarkdownDataList();

export default async function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang='en'>
      <body className={`${pretendard.variable} font-pret dark:bg-gray-950 dark:text-white`}>
        <CustomQueryClientProvider>
          <Header />
          {children}
          <Footer />
        </CustomQueryClientProvider>
      </body>
    </html>
  );
}
