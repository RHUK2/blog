import { Pagination } from '@/_clientComponent';
import { Divider, NavigationTag, PostCard } from '@/_serverComponent';
import { PAGE_SIZE, readPostList } from '@/_util';

interface MarkdownPageProps {
  params: {};
  searchParams: {
    tag?: string;
    page?: string;
    size?: string;
  };
}

export default async function MarkdownPage({ params, searchParams }: MarkdownPageProps) {
  const postList = await readPostList(searchParams.tag, searchParams.page, searchParams.size);

  return (
    <>
      <section className='m-auto flex min-w-[320px] max-w-[768px] flex-col gap-8 px-4 py-10'>
        <NavigationTag currentTag={searchParams.tag} />

        <Divider />

        <Pagination totalCount={postList.totalCount} size={parseInt(PAGE_SIZE)} />

        {postList.list
          .sort((a, b) => new Date(b.data.updatedAt ?? '').getTime() - new Date(a.data.updatedAt ?? '').getTime())
          .map((post, index) => (
            <PostCard key={`post_${index}`} post={post} />
          ))}
      </section>
    </>
  );
}
