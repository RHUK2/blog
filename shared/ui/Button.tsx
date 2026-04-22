'use client';

import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef, useImperativeHandle, useRef } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';

export const Button = forwardRef(function Button(
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
    <button
      ref={buttonRef}
      type='button'
      className={twMerge(
        twJoin(
          'min-h-8 min-w-12 cursor-pointer rounded-md border border-gray-300 bg-gray-100 px-2',
          'hover:bg-gray-200 focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:outline-none',
          'dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus-visible:ring-gray-500',
        ),
        `${className ?? ''}`,
      )}
      {...buttonProps}
    >
      {children}
    </button>
  );
});
