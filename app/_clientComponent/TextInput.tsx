'use client';

import { forwardRef, InputHTMLAttributes, useImperativeHandle, useRef } from 'react';

const TextInput = forwardRef(function Button(
  { className, ...TextInputProps }: React.DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  ref,
) {
  const textInputRef = useRef(null);

  useImperativeHandle(ref, () => textInputRef.current);

  return (
    <input
      type='text'
      ref={textInputRef}
      className={`min-h-8 min-w-12
        rounded-md border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-200 px-2
        dark:border-gray-700 dark:from-gray-900 dark:to-gray-800
        ${className ?? ''}`}
      {...TextInputProps}
    />
  );
});

export default TextInput;
