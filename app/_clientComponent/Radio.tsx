'use client';

import { DetailedHTMLProps, forwardRef, InputHTMLAttributes, useImperativeHandle, useRef } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';

export const Radio = forwardRef(function Radio(
  { className, ...buttonProps }: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  ref,
) {
  const radioRef = useRef<HTMLInputElement | null>(null);

  useImperativeHandle(ref, () => radioRef.current);

  return (
    <input
      ref={radioRef}
      type='radio'
      className={twMerge(
        twJoin(
          'h-3.5 w-3.5 appearance-none rounded-[50%] border border-gray-400 bg-gradient-to-br from-gray-50 to-gray-100',
          'dark:border-gray-700 dark:from-gray-900 dark:to-gray-800',
          'checked:border-4 checked:from-gray-900 checked:to-gray-800',
          'dark:checked:from-gray-50 dark:checked:to-gray-100',
        ),
        `${className ?? ''}`,
      )}
      {...buttonProps}
    />
  );
});
