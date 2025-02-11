'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className='m-auto min-h-full max-w-[1024px] min-w-[320px] border-x border-x-gray-300 bg-white pt-12 dark:border-x-gray-800 dark:bg-gray-950'>
      <section className='m-auto max-w-[768px] min-w-[320px] px-4 py-10'>
        <div className='flex flex-col items-center gap-4 pt-12 text-xl tracking-tighter'>
          <p>서버에서 에러가 발생하였습니다.</p>
          <button onClick={() => reset()}>🔃RETRY</button>
        </div>
      </section>
    </main>
  );
}
