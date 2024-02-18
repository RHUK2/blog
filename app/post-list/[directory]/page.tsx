import { Divider, Navigation } from '@/component';
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
      <section className='m-auto flex min-w-[320px] max-w-[768px] flex-col gap-8 px-4 py-10'>
        <Navigation />

        <Divider />

        {postList.map((post, index) => (
          <Link
            key={`post_${index}`}
            href={`/post-list/${post.directory}/${post.title}`}
            className='min-h-28 rounded-lg bg-gradient-to-br from-gray-100 from-30% to-gray-50 to-70% p-4 shadow-md hover:relative hover:-top-2 dark:from-gray-900 dark:to-gray-800 dark:shadow-gray-600'>
            <span className='block'>{post.title ?? '-'}</span>
          </Link>
        ))}
      </section>
    </>
  );
}
