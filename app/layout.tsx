import '@/_css/globals.css';
import '@/_css/highlight.css';
import { Footer, Header } from '@/_serverComponent';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { CustomQueryClientProvider } from './_provider';
import { writeMarkdownDataList } from './_util';

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
  children: React.ReactNode;
}

export default async function RootLayout({ children }: Readonly<RootLayoutProps>) {
  await writeMarkdownDataList();

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
