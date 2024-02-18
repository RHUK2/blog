import { Divider, Navigation } from '@/component';
import { Pagination } from '@/component/client';
import { getPostList } from '@/util';
import Link from 'next/link';

interface PostListPageProps {
  params: {};
  searchParams: {
    page?: string;
  };
}

export default async function PostListPage({ params, searchParams }: PostListPageProps) {
  const postList = await getPostList();

  return (
    <>
      <section className='m-auto flex min-w-[320px] max-w-[768px] flex-col gap-8 px-4 py-10'>
        <Navigation />

        <Divider />

        <Pagination totalCount={postList.length} size={5} />

        {postList.map(
          (post, index) =>
            index < parseInt(searchParams.page ?? '1') * 10 && (
              <Link
                key={`post_${index}`}
                href={`/post-list/${post.directory}/${post.title}`}
                className='min-h-28 rounded-lg bg-gradient-to-br from-gray-100 from-30% to-gray-50 to-70% p-4 shadow-md hover:relative hover:-top-2 dark:from-gray-900 dark:to-gray-800 dark:shadow-gray-600'>
                <span className='block'>{post.title ?? '-'}</span>
              </Link>
            ),
        )}
      </section>
    </>
  );
}
