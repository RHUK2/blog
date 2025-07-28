'use client';

import { useDebounce } from '@/utils/hooks';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MouseEvent, useCallback, useRef, useState } from 'react';
import { Button } from './Button';
import { Menu } from './Menu';
import { MenuItem } from './MenuItem';

interface Props {
  totalCount: number;
  size: number;
}

function circularQueue(min: number, max: number, index: number) {
  const rangeSize = max - min;

  const relativeIndex = index - min;

  return (((relativeIndex % rangeSize) + rangeSize) % rangeSize) + min;
}

export function Pagination({ totalCount, size }: Props) {
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const ref = useRef<HTMLButtonElement | null>(null);

  const pageCount = Math.ceil(totalCount / size);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handlePreviousPageQuery = useDebounce((index: number) => {
    const query = createQueryString('page', String(circularQueue(0, pageCount, index - 1)));

    router.push(`${pathname}?${query}`);
  }, 300);

  const handlePageQuery = useDebounce((index: number) => {
    const query = createQueryString('page', String(index));

    router.push(`${pathname}?${query}`);
  }, 300);

  const handleNextPageQuery = useDebounce((index: number) => {
    const query = createQueryString('page', String(circularQueue(0, pageCount, index + 1)));

    router.push(`${pathname}?${query}`);
  }, 300);

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
        <Button ref={ref} onClick={handleMenuToggle}>
          {parseInt(searchParams.get('page') || '0') + 1}
        </Button>
        <Button onClick={() => handleNextPageQuery(parseInt(searchParams.get('page') || '0'))}>{'>'}</Button>
      </div>

      <Menu anchorEl={ref.current} open={isMenuOpen} onClose={handleMenuClose}>
        {new Array(pageCount).fill('0').map((item, index) => (
          <MenuItem key={`page_${index}`} onClick={() => handlePageQuery(index)}>
            {index + 1}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
