import { frontMatterData } from '@/_type';
import dayjs from 'dayjs';
import Link from 'next/link';

interface PostCardProps extends React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  post: frontMatterData;
}

export function PostCard({ post, ...liProps }: PostCardProps) {
  return (
    <li className='list-none' {...liProps}>
      <Link
        href={`/markdown/${post.folderName}/detail`}
        className='flex flex-col gap-1 rounded-lg border border-gray-400 bg-gradient-to-br from-gray-50 to-gray-100 p-4 hover:relative hover:-top-2 dark:border-gray-700 dark:from-gray-900 dark:to-gray-800'
      >
        <p className='text-xl'>{post.title ?? '-'}</p>
        <p className='text-gray-600 dark:text-gray-400'>{`tag: ${post.tag ?? '-'}`}</p>
        <p className='text-sm text-gray-600 dark:text-gray-400'>
          {dayjs(post.updatedAt).isValid() ? dayjs(post.updatedAt).fromNow() : '-'}
        </p>
      </Link>
    </li>
  );
}
