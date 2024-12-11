'use client';

import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

export const Textarea = forwardRef(function Textarea(
  {
    rows,
    className,
    onChange,
    ...TextareaProps
  }: React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>,
  ref,
) {
  const textareaRef = useRef(null);

  const [lines, setLines] = useState(1);

  useImperativeHandle(ref, () => textareaRef.current);

  return (
    <textarea
      ref={textareaRef}
      rows={lines}
      onChange={(e) => {
        const renderedLines = Math.floor(e.target.scrollHeight / parseFloat(getComputedStyle(e.target).lineHeight));

        setLines(e.target.value ? renderedLines : 1);

        if (onChange) onChange(e);
      }}
      className={`resize-none rounded-md border border-gray-400 bg-gradient-to-br from-gray-50 to-gray-100 p-2 dark:border-gray-700 dark:from-gray-900 dark:to-gray-800 ${className ?? ''}`}
      {...TextareaProps}
    />
  );
});
