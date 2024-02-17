import { Navigation } from '@/component';
import { getPostList } from '@/util';
import Link from 'next/link';

interface PostListDirectoryPageProps {
  params: {
    directory: string;
  };
  searchParams: {};
}

export default async function PostListDirectoryPage({ params, searchParams }: PostListDirectoryPageProps) {
  const postList = await getPostList(params.directory);

  return (
    <>
      <section className='m-auto min-w-[320px] max-w-[768px] py-10 px-4 flex flex-col gap-8'>
        {postList.map((post, index) => (
          <Link
            key={`post_${index}`}
            href={`/post-list/${post.directory}/${post.title}`}
            className='min-h-28 p-4 rounded-lg shadow-md bg-gradient-to-br from-gray-50 from-30% to-70% to-gray-100 dark:from-gray-900 dark:to-gray-800 dark:shadow-gray-600 hover:relative hover:-top-2'>
            <span className='block'>{post.title ?? '-'}</span>
          </Link>
        ))}
        <Navigation />
      </section>
    </>
  );
}
