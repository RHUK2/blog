import { readTagList } from '@/_data';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface NavigationTagProps {
  currentTag?: string;
}

export async function NavigationTag({ currentTag }: NavigationTagProps) {
  const tagList = await readTagList();

  return (
    <nav className='flex flex-wrap items-center gap-2'>
      {tagList.markdownTagList.map((tag, index) => (
        <Link
          href={tag.name ? `/markdown?tag=${tag.name}` : '/markdown'}
          key={`tag_${index}`}
          className={twMerge(
            'rounded-xl border border-gray-400 bg-gradient-to-br from-gray-50 to-gray-100 px-2 py-1 text-xs font-medium dark:border-gray-700 dark:from-gray-900 dark:to-gray-800',
            `${currentTag === tag.name ? 'border-gray-700 from-gray-900 to-gray-800 text-white dark:border-gray-400 dark:from-gray-50 dark:to-gray-100 dark:text-black' : (currentTag == null || currentTag === '') && tag.name === '' ? 'border-gray-700 from-gray-900 to-gray-800 text-white dark:border-gray-400 dark:from-gray-50 dark:to-gray-100 dark:text-black' : ''}`,
          )}
        >
          {`${tag.name || 'ALL'} (${tag.postCount})`}
        </Link>
      ))}
    </nav>
  );
}
