'use client';

import { forwardRef, useImperativeHandle, useRef } from 'react';

export const TextInput = forwardRef(function TextInput(
  {
    className,
    ...TextInputProps
  }: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  ref,
) {
  const textInputRef = useRef(null);

  useImperativeHandle(ref, () => textInputRef.current);

  return (
    <input
      type='text'
      ref={textInputRef}
      className={`min-h-8 rounded-md border border-gray-400 bg-gradient-to-br from-gray-50 to-gray-100 px-2 dark:border-gray-700 dark:from-gray-900 dark:to-gray-800 ${className ?? ''}`}
      {...TextInputProps}
    />
  );
});
