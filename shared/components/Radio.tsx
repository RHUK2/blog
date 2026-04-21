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
          'h-3.5 w-3.5 appearance-none rounded-full border border-gray-300 bg-gray-100',
          'dark:border-gray-700 dark:bg-gray-800',
          'checked:border-4 checked:border-gray-900',
          'dark:checked:border-gray-50',
        ),
        `${className ?? ''}`,
      )}
      {...buttonProps}
    />
  );
});
