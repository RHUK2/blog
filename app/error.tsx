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
    <div
      className='flex flex-col items-center gap-4 pt-12 
      text-xl tracking-tighter'>
      <p>서버에서 에러가 발생하였습니다.</p>
      <button onClick={() => reset()}>🔃RETRY</button>
    </div>
  );
}
