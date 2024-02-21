'use client';

import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, MouseEvent, useCallback, useMemo, useRef, useState } from 'react';
import { Menu } from '.';
import Button from './Button';

export function Pagination({ totalCount, size }: { totalCount: number; size: number }) {
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const router = useRouter();

  const buttonRef = useRef<HTMLButtonElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pageCount = useMemo(() => Math.ceil(totalCount / size), [totalCount, size]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  function handlePreviousPageQuery(index: number) {
    router.push(
      `${pathname}${index > 1 ? `?${createQueryString('page', String(index - 1))}` : `?${createQueryString('page', '')}`}`,
    );
  }

  function handlePageQuery(index: number) {
    router.push(
      `${pathname}${index > 0 ? `?${createQueryString('page', String(index))}` : `?${createQueryString('page', '')}`}`,
    );
  }

  function handleNextPageQuery(index: number) {
    router.push(
      `${pathname}${index < pageCount - 1 ? `?${createQueryString('page', String(index + 1))}` : `?${createQueryString('page', String(index))}`}`,
    );
  }

  function handleMenuToggle(event: MouseEvent<HTMLButtonElement>) {
    setIsMenuOpen((prev) => !prev);
  }

  function handleMenuClose() {
    setIsMenuOpen(false);
  }

  return (
    <>
      <div className='flex justify-center gap-3'>
        <Button
          buttonProps={{
            onClick: () => handlePreviousPageQuery(parseInt(searchParams.get('page') || '0')),
          }}>
          {'<'}
        </Button>
        <Button
          ref={buttonRef}
          buttonProps={{
            id: 'menu-button',
            onClick: handleMenuToggle,
          }}>
          {parseInt(searchParams.get('page') || '0') + 1}
        </Button>
        <Button
          buttonProps={{
            onClick: () => handleNextPageQuery(parseInt(searchParams.get('page') || '0')),
          }}>
          {'>'}
        </Button>
      </div>

      <Menu open={isMenuOpen} onClose={handleMenuClose} elementRef={buttonRef}>
        {new Array(pageCount).fill('0').map((item, index) => (
          <li
            key={`page_${index}`}
            onClick={() => handlePageQuery(index)}
            className='m-auto min-w-12 cursor-pointer py-1 text-center '>
            {index + 1}
          </li>
        ))}
      </Menu>
    </>
  );
}
