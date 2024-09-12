import { Divider, NavigationTag, PostCard } from '@/_component';
import { Pagination } from '@/_component/client';
import { PAGE_SIZE, readPostList } from '@/_util';

interface ArchivePageProps {
  params: {};
  searchParams: {
    tag?: string;
    page?: string;
    size?: string;
  };
}

export default async function ArchivePage({ params, searchParams }: ArchivePageProps) {
  const postList = await readPostList(searchParams.tag, searchParams.page, searchParams.size);

  return (
    <>
      <section className='m-auto flex min-w-[320px] max-w-[768px] flex-col gap-8 px-4 py-10'>
        <NavigationTag currentTag={searchParams.tag} />

        <Divider />

        <Pagination totalCount={postList.totalCount} size={parseInt(PAGE_SIZE)} />

        {postList.list.map((post, index) => (
          <PostCard key={`post_${index}`} post={post} />
        ))}
      </section>
    </>
  );
}
