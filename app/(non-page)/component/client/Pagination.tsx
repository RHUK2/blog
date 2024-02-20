'use client';

import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, MouseEvent, useMemo, useRef, useState } from 'react';
import { Menu } from '.';
import Button from './Button';

export function Pagination({ totalCount, size }: { totalCount: number; size: number }) {
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const router = useRouter();

  const buttonRef = useRef<HTMLButtonElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pageCount = useMemo(() => Math.ceil(totalCount / size), [totalCount, size]);

  function handlePageQuery(index: number) {
    router.push(`${pathname}${index > 0 ? `?page=${index}` : ''}`);
  }

  function handleMenuToggle(event: MouseEvent<HTMLButtonElement>) {
    setIsMenuOpen((prev) => !prev);
  }

  function handleMenuClose() {
    setIsMenuOpen(false);
  }

  return (
    <div className=''>
      <Button
        ref={buttonRef}
        className=''
        buttonProps={{
          id: 'menu-button',
          onClick: handleMenuToggle,
        }}>
        {searchParams.get('page') ?? '0'}
      </Button>
      <Menu open={isMenuOpen} onClose={handleMenuClose} elementRef={buttonRef}>
        {new Array(pageCount).fill('0').map((item, index) => (
          <li key={`page_${index}`} onClick={() => handlePageQuery(index)} className='min-w-10 cursor-pointer'>
            {index + 1}
          </li>
        ))}
      </Menu>
    </div>
  );
}
