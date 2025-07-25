'use client';

import Link from 'next/link';
import React from 'react';
import { twJoin, twMerge } from 'tailwind-merge';

interface Props {
  href?: string;
  children: React.ReactNode;
}

export function Badge({ href, children }: Props) {
  const className = twMerge(
    twJoin([
      'flex w-min items-center gap-1 rounded-xl border border-gray-400 bg-gradient-to-br from-gray-50 to-gray-100 px-2 py-1',
      'text-xs font-medium whitespace-nowrap',
      'dark:border-gray-700 dark:from-gray-900 dark:to-gray-800',
    ]),
  );

  if (href) {
    return (
      <Link className={className} href={href} target='_blank'>
        {children}
      </Link>
    );
  }

  return <div className={className}>{children}</div>;
}
