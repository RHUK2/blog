'use client';

import { forwardRef, useImperativeHandle, useRef } from 'react';

const Button = forwardRef(function Button(
  {
    children,
    className,
    ...buttonProps
  }: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  ref,
) {
  const buttonRef = useRef(null);

  useImperativeHandle(ref, () => buttonRef.current);

  return (
    <button
      ref={buttonRef}
      type='button'
      className={`min-h-8 min-w-12 rounded-md border border-gray-400 bg-gradient-to-br from-gray-50 to-gray-100 px-2 dark:border-gray-700 dark:from-gray-900 dark:to-gray-800 ${className ?? ''}`}
      {...buttonProps}>
      {children}
    </button>
  );
});

export default Button;
