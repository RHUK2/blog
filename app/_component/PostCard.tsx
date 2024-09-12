import { readMarkdownMetaDataResponse } from '@/_type';
import Link from 'next/link';

interface PostCardProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  post: readMarkdownMetaDataResponse;
}

export function PostCard({ post, ...divProps }: PostCardProps) {
  return (
    <div {...divProps}>
      <Link
        href={`/archive/${encodeURIComponent(post.data.fileName ?? '')}`}
        className='flex flex-col gap-2
        rounded-lg border border-gray-200 bg-gradient-to-br from-gray-100 from-30% to-gray-50 to-70% p-4
        hover:relative hover:-top-2 dark:border-gray-700 dark:from-gray-900 dark:to-gray-800'>
        <span>{post.data.title ?? '-'}</span>
        <span>{post.data.description ?? '-'}</span>
        <span>{new Date(post.data.updatedAt ?? '').toUTCString() ?? '-'}</span>
      </Link>
    </div>
  );
}
