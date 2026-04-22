'use client';

import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef, useImperativeHandle, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

export const MenuItem = forwardRef(function MenuItem(
  {
    children,
    className,
    ...buttonProps
  }: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  ref,
) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useImperativeHandle(ref, () => buttonRef.current);

  return (
    <li>
      <button
        ref={buttonRef}
        className={twMerge(
          'min-w-16 cursor-pointer px-3 py-1 text-center whitespace-nowrap hover:bg-gray-100 dark:hover:bg-gray-800',
          ` ${className ?? ''}`,
        )}
        {...buttonProps}
      >
        {children}
      </button>
    </li>
  );
});
