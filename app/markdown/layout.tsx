import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Readonly<Props>) {
  return (
    <main className='m-auto min-h-full max-w-[768px] min-w-[320px] bg-white pt-12 dark:bg-gray-950'>{children}</main>
  );
}
