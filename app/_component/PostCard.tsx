import { readMarkdownDataResponse } from '@/_type';
import dayjs from 'dayjs';
import Link from 'next/link';

interface PostCardProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  post: readMarkdownDataResponse;
}

export function PostCard({ post, ...divProps }: PostCardProps) {
  return (
    <div {...divProps}>
      <Link
        href={`/markdown/${post.data.fileName}`}
        className='flex flex-col gap-1
        rounded-lg border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-200  p-4
        hover:relative hover:-top-2 dark:border-gray-700 dark:from-gray-900 dark:to-gray-800'>
        <span className='text-xl'>{post.data.title ?? '-'}</span>
        <span className='text-gray-600 dark:text-gray-400'>{`tag: ${post.data.tag ?? '-'}`}</span>
        <span className='text-sm text-gray-600 dark:text-gray-400'>
          {dayjs(post.data.updatedAt).isValid() ? dayjs(post.data.updatedAt).fromNow() : '-'}
        </span>
      </Link>
    </div>
  );
}
