'use client';

import { usePathname } from 'next/navigation';

export function Footer() {
  const pathname = usePathname();

  return (
    <footer
      className={`w-full border-t border-t-gray-300 bg-white dark:border-t-gray-800 dark:bg-gray-950 ${pathname === '/gpt' && 'hidden'}`}
    >
      <div className='m-auto flex h-16 min-w-[320px] max-w-[1024px] items-center justify-center px-5'>
        <p className='text-xs tracking-tighter'>ⓒ 2024. RHUK2 All rights reserved.</p>
      </div>
    </footer>
  );
}
