'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className='m-auto min-h-full min-w-[320px] max-w-[1024px] border-x border-x-gray-300 bg-white pt-12 dark:border-x-gray-800 dark:bg-gray-950'>
      <section className='m-auto min-w-[320px] max-w-[768px] px-4 py-10'>
        <div className='flex flex-col items-center gap-4 pt-12 text-xl tracking-tighter'>
          <p>서버에서 에러가 발생하였습니다.</p>
          <button onClick={() => reset()}>🔃RETRY</button>
        </div>
      </section>
    </main>
  );
}
