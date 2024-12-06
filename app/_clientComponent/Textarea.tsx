'use client';

import { forwardRef, useImperativeHandle, useRef } from 'react';

export const Textarea = forwardRef(function Textarea(
  {
    className,
    ...TextareaProps
  }: React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>,
  ref,
) {
  const textareaRef = useRef(null);

  useImperativeHandle(ref, () => textareaRef.current);

  return (
    <textarea
      ref={textareaRef}
      className={`resize-none rounded-md border border-gray-400 bg-gradient-to-br from-gray-50 to-gray-100 p-2 dark:border-gray-700 dark:from-gray-900 dark:to-gray-800 ${className ?? ''}`}
      {...TextareaProps}
    />
  );
});
