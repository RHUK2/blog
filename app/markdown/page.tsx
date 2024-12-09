import { Pagination } from '@/_clientComponent';
import { Divider, NavigationTag, PostCard } from '@/_serverComponent';
import { PAGE_SIZE, readPostList } from '@/_util';
import { Suspense } from 'react';

interface MarkdownPageProps {
  searchParams: Promise<{
    tag?: string;
    page?: string;
    size?: string;
  }>;
}

export default async function MarkdownPage({ searchParams }: MarkdownPageProps) {
  const { tag, page, size } = await searchParams;

  const postList = await readPostList(tag, page, size);

  return (
    <>
      <section className='m-auto flex min-w-[320px] max-w-[768px] flex-col gap-8 px-4 py-10'>
        <Suspense fallback={<div>Loading...</div>}>
          <NavigationTag currentTag={tag} />
        </Suspense>

        <Divider />

        <Pagination totalCount={postList.totalCount} size={parseInt(PAGE_SIZE)} />

        {postList.list
          .sort((a, b) => new Date(b.updatedAt ?? '').getTime() - new Date(a.updatedAt ?? '').getTime())
          .map((post, index) => (
            <PostCard key={`post_${index}`} post={post} />
          ))}
      </section>
    </>
  );
}
