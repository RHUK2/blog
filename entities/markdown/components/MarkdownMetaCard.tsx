'use client';

import dayjs from 'dayjs';
import { HTMLMotionProps, motion } from 'motion/react';
import Link from 'next/link';
import { MarkdownMeta } from '../types';

interface Props extends Omit<HTMLMotionProps<'li'>, 'ref'> {
  data: MarkdownMeta;
}

export function MarkdownMetaCard({ data, ...liProps }: Props) {
  return (
    <motion.li
      className='list-none'
      whileHover={{
        scale: 1.02,
      }}
      whileFocus={{
        scale: 1.02,
      }}
      {...liProps}
    >
      <Link
        href={`/markdown/${data.folderName}/detail`}
        className='flex flex-col gap-1 rounded-lg border border-gray-400 bg-gradient-to-br from-gray-50 to-gray-100 p-4 dark:border-gray-700 dark:from-gray-900 dark:to-gray-800'
      >
        <p className='text-xl'>{data.title ?? '-'}</p>
        <p className='text-gray-600 dark:text-gray-400'>{`tag: ${data.tag ?? '-'}`}</p>
        <p className='text-sm text-gray-600 dark:text-gray-400'>
          {dayjs(data.updatedAt).isValid() ? dayjs(data.updatedAt).fromNow() : '-'}
        </p>
      </Link>
    </motion.li>
  );
}
