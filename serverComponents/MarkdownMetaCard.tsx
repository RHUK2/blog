import { IMarkdownMeta } from '@/data/dynamic/local.types';
import dayjs from 'dayjs';
import Link from 'next/link';
import { DetailedHTMLProps, LiHTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  data: IMarkdownMeta;
}

export function MarkdownMetaCard({ data, ...liProps }: Props) {
  return (
    <li className='list-none' {...liProps}>
      <Link
        href={`/markdown/${data.folderName}/detail`}
        className='flex flex-col gap-1 rounded-lg border border-gray-400 bg-gradient-to-br from-gray-50 to-gray-100 p-4 hover:relative hover:-top-2 dark:border-gray-700 dark:from-gray-900 dark:to-gray-800'
      >
        <p className='text-xl'>{data.title ?? '-'}</p>
        <p className='text-gray-600 dark:text-gray-400'>{`tag: ${data.tag ?? '-'}`}</p>
        <p className='text-sm text-gray-600 dark:text-gray-400'>
          {dayjs(data.updatedAt).isValid() ? dayjs(data.updatedAt).fromNow() : '-'}
        </p>
      </Link>
    </li>
  );
}
