'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MouseEvent, useCallback, useRef, useState } from 'react';
import { Button, Menu } from '.';
import { MenuItem } from './MenuItem';

interface PaginationProps {
  totalCount: number;
  size: number;
}

function circularQueue(min: number, max: number, index: number) {
  const rangeSize = max - min;

  const relativeIndex = index - min;

  return (((relativeIndex % rangeSize) + rangeSize) % rangeSize) + min;
}

export function Pagination({ totalCount, size }: PaginationProps) {
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const controlRef = useRef<HTMLButtonElement | null>(null);

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

    const query = createQueryString('page', String(circularQueue(0, pageCount, index - 1)));

    router.push(`${pathname}?${query}`);
  }

  function handlePageQuery(index: number) {
    handleMenuClose();

    const query = createQueryString('page', String(index));

    router.push(`${pathname}?${query}`);
  }

  function handleNextPageQuery(index: number) {
    handleMenuClose();

    const query = createQueryString('page', String(circularQueue(0, pageCount, index + 1)));

    router.push(`${pathname}?${query}`);
  }

  function handleMenuToggle(event: MouseEvent<HTMLButtonElement>) {
    setIsMenuOpen((prev) => !prev);
  }

  function handleMenuClose() {
    setIsMenuOpen(false);
  }

  return (
    <>
      <div className='flex justify-between gap-3'>
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
