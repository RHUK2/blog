import { readTagList } from '@/_util';
import Link from 'next/link';

interface NavigationTagProps {
  currentTag?: string;
}

export async function NavigationTag({ currentTag }: NavigationTagProps) {
  const tagList = await readTagList();

  return (
    <nav className='flex flex-wrap items-center gap-2'>
      {tagList.map((tag, index) => (
        <Link
          href={tag.name ? `/markdown?tag=${tag.name}` : '/markdown'}
          key={`tag_${index}`}
          className={`rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-200 px-2 py-1
            text-xs font-medium
            dark:border-gray-700 dark:from-gray-900 dark:to-gray-800
            ${currentTag === tag.name ? 'outline outline-1' : (currentTag == null || currentTag === '') && tag.name === '' ? 'outline outline-1' : ''}`}>
          {`${tag.name || 'ALL'} (${tag.postCount})`}
        </Link>
      ))}
    </nav>
  );
}
