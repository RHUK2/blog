'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';

export function Pagination({ totalCount, size }: { totalCount: number; size: number }) {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();

  function handlePageQuery(index: number) {
    // router.
  }

  return (
    <div>
      {new Array(parseInt((totalCount / size).toFixed())).fill('0').map((item, index) => (
        <span key={`page_${index}`} className='block'>
          {index + 1}
        </span>
      ))}
    </div>
  );
}
