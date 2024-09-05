import { Divider, Navigation } from '@/_component';
import { Pagination } from '@/_component/client';
import { FOLDER_NAME, getPostList } from '@/_util';
import Link from 'next/link';

interface PostListPageProps {
  params: {};
  searchParams: {
    directory?: string;
    page?: string;
  };
}

const PAGE_SIZE = 5;

export default async function PostListPage({ params, searchParams }: PostListPageProps) {
  const postList = await getPostList(searchParams.directory);

  const filteredPostList = postList.filter((post, index) => {
    const page = searchParams.page == null || searchParams.page === '' ? 0 : parseInt(searchParams.page);
    const previousPage = (page - 1) * PAGE_SIZE + PAGE_SIZE;
    const currentPage = page * PAGE_SIZE + PAGE_SIZE;

    return index >= previousPage && index < currentPage;
  });

  return (
    <>
      <section className='m-auto flex min-w-[320px] max-w-[768px] flex-col gap-8 px-4 py-10'>
        <Navigation currentDirectory={searchParams.directory} />

        <Divider />

        <Pagination totalCount={postList.length} size={PAGE_SIZE} />

        {filteredPostList.map((post, index) => (
          <Link
            key={`post_${index}`}
            href={`/${FOLDER_NAME}/${post.directory}/${post.fileName}`}
            className='min-h-28 rounded-lg border border-gray-200 bg-gradient-to-br from-gray-100 from-30% to-gray-50 to-70% p-4  hover:relative hover:-top-2 dark:border-gray-700 dark:from-gray-900 dark:to-gray-800'>
            <span className='block'>{post.title ?? '-'}</span>
            <span className='block'>{post.description ?? '-'}</span>
            <span className='block'>{new Date(post.updatedAt).toUTCString() ?? '-'}</span>
          </Link>
        ))}
      </section>
    </>
  );
}
