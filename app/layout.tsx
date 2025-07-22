import { Footer, Header } from '@/shared/components';
import { GlobalClientConfig } from '@/store/GlobalClientConfig';
import { ReactQueryProvider } from '@/store/ReactQueryProvider';
import '@/styles/globals.css';
import '@/styles/highlight.css';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'katex/dist/katex.min.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { cookies } from 'next/headers';
import { ReactNode } from 'react';

dayjs.locale('ko');
dayjs.extend(relativeTime);

const pretendard = localFont({
  variable: '--font-pretendard',
  src: '../public/PretendardVariable.woff2',
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

export default async function RootLayout({ children }: Readonly<Props>) {
  const cookieStore = await cookies();

  const theme = cookieStore.get('theme')?.value;

  return (
    <html lang='en' className={`h-full ${theme}`}>
      <body className={`h-full ${pretendard.className} dark:bg-gray-950 dark:text-white`}>
        <ReactQueryProvider>
          <GlobalClientConfig />
          <Header />
          {children}
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
