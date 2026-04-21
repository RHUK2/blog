'use client';

import { usePathname } from 'next/navigation';
import { twJoin } from 'tailwind-merge';

export function Footer() {
  const pathname = usePathname();

  return (
    <footer
      className={twJoin(
        'w-full border-t border-t-gray-300 bg-white/80 backdrop-blur-sm',
        'dark:border-t-gray-700 dark:bg-gray-950/80',
        `${pathname === '/llm' && 'hidden'}`,
      )}
    >
      <div className='m-auto flex h-16 max-w-3xl min-w-xs items-center justify-center px-5'>
        <p className='text-xs tracking-tighter'>ⓒ 2024. RHUK2 All rights reserved.</p>
      </div>
    </footer>
  );
}
