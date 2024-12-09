import { frontMatterData } from '@/_type';
import dayjs from 'dayjs';
import Link from 'next/link';

interface PostCardProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  post: frontMatterData;
}

export function PostCard({ post, ...divProps }: PostCardProps) {
  return (
    <div {...divProps}>
      <Link
        href={`/markdown/${post.folderName}/detail`}
        className='flex flex-col gap-1 rounded-lg border border-gray-400 bg-gradient-to-br from-gray-50 to-gray-100 p-4 hover:relative hover:-top-2 dark:border-gray-700 dark:from-gray-900 dark:to-gray-800'>
        <span className='text-xl'>{post.title ?? '-'}</span>
        <span className='text-gray-600 dark:text-gray-400'>{`tag: ${post.tag ?? '-'}`}</span>
        <span className='text-sm text-gray-600 dark:text-gray-400'>
          {dayjs(post.updatedAt).isValid() ? dayjs(post.updatedAt).fromNow() : '-'}
        </span>
      </Link>
    </div>
  );
}
