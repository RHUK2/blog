import { getNavigationList } from '@/util';
import Link from 'next/link';

export async function Navigation() {
  const directoryList = await getNavigationList();

  return (
    <nav className='absolute top-24 left-0 flex flex-col'>
      {directoryList.map((directory) => (
        <Link
          href={`/post-list${directory.name ? `/${directory.name}` : ''}`}
          key={directory.name}
          className='inline-block'>{`${directory.name ? directory.name : 'ALL'}(${directory.count})`}</Link>
      ))}
    </nav>
  );
}
