import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Readonly<Props>) {
  return (
    <main className='m-auto h-full max-w-[1024px] min-w-[320px] border-x border-x-gray-300 bg-white pt-12 dark:border-x-gray-800 dark:bg-gray-950'>
      {children}
    </main>
  );
}
