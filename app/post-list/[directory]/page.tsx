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
  const data = await getPostList(params.directory);

  return (
    <>
      <section className='m-auto min-w-[320px] max-w-[768px] py-10 flex flex-col gap-2'>
        {data.map((item, index) => (
          <Link
            className='inline-block'
            key={`post_${index}`}
            href={`/post-list/${item.directory}/${item.title}`}>{`제목: ${item.title ?? '-'}`}</Link>
        ))}
        <Navigation />
      </section>
    </>
  );
}
