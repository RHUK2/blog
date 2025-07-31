'use client';

import React from 'react';
import { twJoin, twMerge } from 'tailwind-merge';

interface Props {
  children: React.ReactNode;
  className?: string;
}

type PolymorphicProps<T extends React.ElementType> = Props & {
  as?: T;
} & Omit<React.ComponentPropsWithoutRef<T>, keyof Props>;

export function Badge<T extends React.ElementType>(props: PolymorphicProps<T>) {
  const { as: Component = 'div', children, className, ...rest } = props;
  const mergedClassName = twMerge(
    twJoin(
      [
        'flex w-min items-center gap-1 rounded-xl border border-gray-400 bg-gradient-to-br from-gray-50 to-gray-100 px-2 py-1',
        'text-xs font-medium whitespace-nowrap',
        'dark:border-gray-700 dark:from-gray-900 dark:to-gray-800',
      ],
      className,
    ),
  );

  return (
    <Component className={mergedClassName} {...rest}>
      {children}
    </Component>
  );
}
