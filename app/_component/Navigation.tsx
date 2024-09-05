import { FOLDER_NAME, getNavigationList } from '@/_util';
import Link from 'next/link';

export async function Navigation({ currentDirectory }: { currentDirectory?: string }) {
  const directoryList = await getNavigationList();

  return (
    <nav className='flex flex-wrap items-center gap-2'>
      {directoryList.map((directory) => (
        <Link
          href={`/${FOLDER_NAME}${directory.name ? `?directory=${directory.name}` : ''}`}
          key={directory.name}
          className={`rounded-xl border border-gray-200 bg-gradient-to-br from-gray-100 from-30% to-gray-50 to-70% px-2 py-1 text-xs font-medium 
            dark:border-gray-700 dark:from-gray-900 dark:to-gray-800  
            ${currentDirectory === directory.name ? 'outline outline-1' : (currentDirectory == null || currentDirectory === '') && directory.name === '' ? 'outline outline-1' : ''}`}>
          {`${directory.name ? directory.name : 'ALL'}(${directory.count})`}
        </Link>
      ))}
    </nav>
  );
}
