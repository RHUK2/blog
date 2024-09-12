import Link from 'next/link';
import { DarkLightButton } from './client';

export function Header() {
  return (
    <header
      className='fixed z-50 w-full border-b border-b-gray-200 bg-white
    dark:border-b-gray-800 dark:bg-gray-950'>
      <div
        className='m-auto flex h-12 w-full min-w-[320px] max-w-[1024px] items-center justify-between px-5
        text-lg tracking-tighter'>
        <Link href='/' className='font-bold'>
          RHUK2
        </Link>
        <div className='flex gap-4 '>
          <DarkLightButton />
          <Link href='/'>🏠 HOME</Link>
          <Link href='/archive'>🪢 ARCHIVE</Link>
          <Link href='/gpt'>🤖 GPT</Link>
        </div>
      </div>
    </header>
  );
}
