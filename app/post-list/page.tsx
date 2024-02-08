import { Navigation } from '@/component';
import { getPostList } from '@/util';
import Link from 'next/link';

interface PostListPageProps {
  params: {};
  searchParams: {};
}

export default async function PostListPage({ params, searchParams }: PostListPageProps) {
  const data = await getPostList();
  return (
    <>
      <section className='m-auto min-w-[320px] max-w-[768px] py-10 flex flex-col gap-2'>
        {data.map((item, index) => (
          <Link
            className='inline-block'
            key={`post_${index}`}
            href={`/post-list/${item.directory}/${item.title}`}>{`제목: ${item.title ?? '-'}`}</Link>
        ))}
      </section>
      <Navigation />
    </>
  );
}
