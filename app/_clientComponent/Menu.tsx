'use client';

import { useMount } from '@/_hooks';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface MenuProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
  control: React.RefObject<HTMLElement> | null;
  open: boolean;
  onClose: () => void;
}

export const Menu = forwardRef(function Menu(
  { control, open, onClose, children, onClick, className, ...ulProps }: MenuProps,
  ref,
) {
  const isMounted = useMount();

  const ulRef = useRef<HTMLUListElement>(null);

  useImperativeHandle(ref, () => ulRef.current);

  // useEffect(() => {
  //   if (!isMounted) return;
  //   if (control?.current == null) return;

  //   const { top, bottom, left } = control.current.getBoundingClientRect();

  //   function move() {
  //     if (ulRef?.current == null) return;

  //     ulRef.current.style.transform = `translateX(${top}, ${left})`;
  //   }

  //   function throttleUsingRaf(cb) {
  //     let rAfTimeout = null;

  //     return function () {
  //       if (rAfTimeout) {
  //         window.cancelAnimationFrame(rAfTimeout);
  //       }
  //       rAfTimeout = window.requestAnimationFrame(function () {
  //         cb();
  //       });
  //     };
  //   }

  //   const temp = throttleUsingRaf(move);

  //   window.addEventListener('resize', temp);

  //   return () => {
  //     window.removeEventListener('resize', temp);
  //   };
  // }, [isMounted, control]);

  useEffect(() => {
    function listener(this: HTMLElement, event: globalThis.MouseEvent) {
      if (
        ulRef.current?.parentElement?.isEqualNode(event.target as Node) ||
        ulRef.current?.isEqualNode(event.target as Node)
      )
        return;

      onClose();
    }

    document.documentElement.addEventListener('click', listener);

    return () => {
      document.documentElement.removeEventListener('click', listener);
    };
  }, [onClose]);

  return (
    <ul
      ref={ulRef}
      onClick={(event) => {
        event.stopPropagation();
        if (onClick) {
          onClick(event);
        }
      }}
      className={twMerge(
        'absolute z-40 max-h-44 overflow-y-auto overflow-x-hidden rounded-md border border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 py-2 dark:border-gray-700 dark:from-gray-900 dark:to-gray-800',
        `${open ? 'block' : 'hidden'} ${className ?? ''}`,
      )}
      {...ulProps}
    >
      {children}
    </ul>
  );
});
