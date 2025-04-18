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
import { writeMarkdownMetaList } from './_data';
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

interface Props {
  children: ReactNode;
}

// list.json 업데이트
// await writeMarkdownMetaList();

export default async function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang='en' className='h-full'>
      <body className={`h-full ${pretendard.className} dark:bg-gray-950 dark:text-white`}>
        <CustomQueryClientProvider>
          <Header />
          {children}
          <Footer />
        </CustomQueryClientProvider>
      </body>
    </html>
  );
}
