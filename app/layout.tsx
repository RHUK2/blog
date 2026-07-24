import { GlobalClientConfig, ReactQueryProvider } from '@/app/_providers';
import { Header } from '@/widgets/site-header';
import { Footer } from '@/widgets/site-footer';
import '@/styles/globals.css';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'katex/dist/katex.min.css';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { ReactNode } from 'react';

dayjs.locale('ko');
dayjs.extend(relativeTime);

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
      <body className='h-full'>
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
