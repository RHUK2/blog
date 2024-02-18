import { getNavigationList } from '@/util';
import Link from 'next/link';

export async function Navigation() {
  const directoryList = await getNavigationList();

  return (
    <nav className='flex flex-wrap gap-2'>
      {directoryList.map((directory) => (
        <Link
          href={`/post-list${directory.name ? `/${directory.name}` : ''}`}
          key={directory.name}
          className='rounded-xl bg-gradient-to-br from-gray-100 from-30% to-gray-50 to-70% px-2 py-1 text-xs font-medium shadow-md dark:from-gray-900 dark:to-gray-800 dark:shadow-gray-600'>{`${directory.name ? directory.name : 'ALL'}(${directory.count})`}</Link>
      ))}
    </nav>
  );
}
