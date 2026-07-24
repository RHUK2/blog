import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Readonly<Props>) {
  return <main className='bg-background min-h-full min-w-xs pt-12'>{children}</main>;
}
