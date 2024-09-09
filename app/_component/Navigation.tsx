import { getTagList } from '@/_util';
import Link from 'next/link';

interface NavigationProps {
  current?: string;
}

export async function Navigation({ current }: NavigationProps) {
  const tagList = await getTagList();

  return (
    <nav className='flex flex-wrap items-center gap-2'>
      {tagList.map((tag) => (
        <Link
          href={`/archive?tag=${tag.name}`}
          key={`tag_${tag.name}`}
          className={`rounded-xl border border-gray-200 bg-gradient-to-br from-gray-100 from-30% to-gray-50 to-70% px-2 py-1 text-xs font-medium 
            dark:border-gray-700 dark:from-gray-900 dark:to-gray-800  
            ${current === tag.name ? 'outline outline-1' : ''}`}>
          {`${tag.name}(${tag.postCount})`}
        </Link>
      ))}
    </nav>
  );
}
