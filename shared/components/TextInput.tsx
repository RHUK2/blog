'use client';

import { DetailedHTMLProps, forwardRef, InputHTMLAttributes, useImperativeHandle, useRef } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';

export const TextInput = forwardRef(function TextInput(
  { className, ...TextInputProps }: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  ref,
) {
  const textInputRef = useRef<HTMLInputElement | null>(null);

  useImperativeHandle(ref, () => textInputRef.current);

  return (
    <input
      type='text'
      ref={textInputRef}
      className={twMerge(
        twJoin([
          'min-h-8 rounded-md border border-gray-300 bg-gray-100 px-2',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400',
          'dark:border-gray-700 dark:bg-gray-800 dark:focus-visible:ring-gray-500',
        ]),
        `${className ?? ''}`,
      )}
      {...TextInputProps}
    />
  );
});
