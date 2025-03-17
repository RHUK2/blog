'use client';

import React, { Fragment, useEffect, useRef, useState } from 'react';

interface Props {
  parent: React.ReactNode;
  children: React.ReactNode;
}

export function TreeBox({ parent, children }: Props) {
  const [offsetTopList, setOffsetTopList] = useState<number[]>([]);

  const rafId = useRef<number | null>(null);

  const ulRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    function listener() {
      if (rafId.current == null) {
        rafId.current = requestAnimationFrame((t) => {
          if (!ulRef.current) return;

          const arr = [];

          for (const element of ulRef.current.childNodes.values()) {
            arr.push((element as HTMLElement).offsetTop + 11);
          }

          setOffsetTopList(arr);

          rafId.current = null;
        });
      }
    }

    listener();

    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, []);

  return (
    <ul className='relative flex flex-col gap-8 border-l border-l-gray-400 pl-3 dark:border-l-gray-600'>
      {offsetTopList.map((offsetTop) => (
        <Fragment key={offsetTop}>
          <div
            className={'absolute -left-[3px] z-1 h-1.5 w-1.5 rounded-full bg-black dark:bg-white'}
            style={{ top: offsetTop }}
          ></div>
          <div
            className={'absolute -left-[1px] w-3 border-b border-b-gray-400 dark:border-b-gray-600'}
            style={{ top: offsetTop + 2.5 }}
          ></div>
        </Fragment>
      ))}
      {parent}
      <ul ref={ulRef} className='flex flex-col gap-8 pl-2'>
        {children}
      </ul>
    </ul>
  );
}
