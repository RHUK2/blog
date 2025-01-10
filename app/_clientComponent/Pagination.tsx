'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MouseEvent, useCallback, useRef, useState } from 'react';
import { Button, Menu } from '.';
import { MenuItem } from './MenuItem';

interface PaginationProps {
  totalCount: number;
  size: number;
}

export function Pagination({ totalCount, size }: PaginationProps) {
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const controlRef = useRef<HTMLElement>(null);

  const pageCount = Math.ceil(totalCount / size);

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
        <Button ref={controlRef} onClick={handleMenuToggle}>
          {parseInt(searchParams.get('page') || '0') + 1}
        </Button>
        <Menu control={controlRef} open={isMenuOpen} onClose={handleMenuClose}>
          {new Array(pageCount).fill('0').map((item, index) => (
            <MenuItem key={`page_${index}`} onClick={() => handlePageQuery(index)}>
              {index + 1}
            </MenuItem>
          ))}
        </Menu>
        <Button onClick={() => handleNextPageQuery(parseInt(searchParams.get('page') || '0'))}>{'>'}</Button>
      </div>
    </>
  );
}
