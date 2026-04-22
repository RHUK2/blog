'use client';

import { Badge } from '@/shared/ui';
import dayjs from 'dayjs';
import { HTMLMotionProps, motion } from 'motion/react';
import Link from 'next/link';
import { MarkdownMeta } from '../model/types';

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
        className='flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-100 p-4 dark:border-gray-700 dark:bg-gray-800'
      >
        <p className='flex flex-1 gap-2 overflow-hidden'>
          <span className='text-md overflow-lg text-ellipsis whitespace-nowrap'>{data.title ?? '-'}</span>
          <Badge as={'span'}>{data.tag ?? '-'}</Badge>
        </p>
        <p className='text-sm text-gray-600 dark:text-gray-400'>
          {dayjs(data.updatedAt).isValid() ? dayjs(data.updatedAt).fromNow() : '-'}
        </p>
      </Link>
    </motion.li>
  );
}
