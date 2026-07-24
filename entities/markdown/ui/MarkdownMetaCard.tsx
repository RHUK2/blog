'use client';

import { Badge } from '@/shared/ui';
import dayjs from 'dayjs';
import { HTMLMotionProps, motion } from 'motion/react';
import Link from 'next/link';
import { getTagColor } from '../lib/tagColor';
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
        className='border-border bg-muted flex h-full flex-col overflow-hidden rounded-lg border'
      >
        <span className={`h-1.5 w-full ${getTagColor(data.tag ?? '')}`} />

        <div className='flex flex-1 flex-col gap-2 p-4'>
          <span className='flex-1 text-base'>{data.title ?? '-'}</span>

          <div className='flex items-center justify-between gap-2'>
            <Badge>{data.tag ?? '-'}</Badge>
            <p className='text-muted-foreground text-sm'>
              {dayjs(data.updatedAt).isValid() ? dayjs(data.updatedAt).fromNow() : '-'}
            </p>
          </div>
        </div>
      </Link>
    </motion.li>
  );
}
