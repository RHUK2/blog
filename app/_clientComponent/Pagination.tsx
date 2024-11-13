'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MouseEvent, useCallback, useMemo, useState } from 'react';
import { Menu } from '.';
import Button from './Button';

interface PaginationProps {
  totalCount: number;
  size: number;
}

export function Pagination({ totalCount, size }: PaginationProps) {
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const router = useRouter();

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
    handleMenuClose();

    router.push(
      `${pathname}${index > 0 ? `?${createQueryString('page', String(index - 1))}` : `?${searchParams.toString()}`}`,
    );
  }

  function handlePageQuery(index: number) {
    handleMenuClose();

    router.push(
      `${pathname}${index >= 0 ? `?${createQueryString('page', String(index))}` : `?${searchParams.toString()}`}`,
    );
  }

  function handleNextPageQuery(index: number) {
    handleMenuClose();

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
        <Button onClick={() => handlePreviousPageQuery(parseInt(searchParams.get('page') || '0'))}>{'<'}</Button>
        <Button onClick={handleMenuToggle}>
          {parseInt(searchParams.get('page') || '0') + 1}
          <Menu open={isMenuOpen} onClose={handleMenuClose}>
            {new Array(pageCount).fill('0').map((item, index) => (
              <li
                key={`page_${index}`}
                onClick={() => handlePageQuery(index)}
                className='m-auto min-w-12 cursor-pointer py-1 text-center'>
                {index + 1}
              </li>
            ))}
          </Menu>
        </Button>
        <Button onClick={() => handleNextPageQuery(parseInt(searchParams.get('page') || '0'))}>{'>'}</Button>
      </div>
    </>
  );
}
