'use client';

import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef, useImperativeHandle, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

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
        'min-h-8 min-w-12 rounded-md border border-gray-400 bg-gradient-to-br from-gray-50 to-gray-100 px-2 dark:border-gray-700 dark:from-gray-900 dark:to-gray-800',
        `${className ?? ''}`,
      )}
      {...buttonProps}
    >
      {children}
    </button>
  );
});
