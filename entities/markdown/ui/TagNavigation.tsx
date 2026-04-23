import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import type { MarkdownTagList } from '../model/types';

interface Props {
  currentTag?: string;
  tagList: MarkdownTagList;
}

export function TagNavigation({ currentTag, tagList }: Props) {
  return (
    <nav className='flex flex-wrap items-center gap-2'>
      {tagList.map((tag) => (
        <Link
          key={tag.id}
          href={tag.name ? `/markdown?tag=${tag.name}` : '/markdown'}
          className={twMerge(
            'rounded-xl border border-gray-300 bg-gray-100 px-2 py-1 text-xs font-medium dark:border-gray-700 dark:bg-gray-800',
            `${currentTag === tag.name ? 'border-gray-700 bg-gray-900 text-white dark:border-gray-400 dark:bg-gray-100 dark:text-black' : (currentTag == null || currentTag === '') && tag.name === '' ? 'border-gray-700 bg-gray-900 text-white dark:border-gray-400 dark:bg-gray-100 dark:text-black' : ''}`,
          )}
        >
          {`${tag.name || 'ALL'} (${tag.postCount})`}
        </Link>
      ))}
    </nav>
  );
}
