import Link from 'next/link';
import { DarkLightButton } from './client';

export function Header() {
  return (
    <header className='fixed z-50 w-full border-b border-b-gray-200 bg-white dark:border-b-gray-800 dark:bg-gray-950 '>
      <div className='m-auto flex h-12 w-full min-w-[320px] max-w-[1024px] items-center justify-between  px-5 '>
        <Link href='/' className='block text-lg font-bold tracking-tighter'>
          RHUK2
        </Link>
        <div className='flex gap-5'>
          <DarkLightButton />
          <Link href='/' className='block'>
            🏠 HOME
          </Link>
          <Link href='/archive' className=' block'>
            🪢 ARCHIVE
          </Link>
        </div>
      </div>
    </header>
  );
}
