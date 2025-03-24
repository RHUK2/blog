import { Pagination } from '@/_clientComponent';
import { PAGE_SIZE, readMarkdownMetaList } from '@/_data';
import { Divider, MarkdownMetaCard, NavigationTag } from '@/_serverComponent';
import { Suspense } from 'react';

interface Props {
  searchParams: Promise<{
    tag?: string;
    page?: string;
    size?: string;
  }>;
}

export default async function Page({ searchParams }: Props) {
  const { tag, page, size } = await searchParams;

  const markdownMetaList = await readMarkdownMetaList(tag, page, size);

  return (
    <>
      <section className='m-auto flex max-w-[768px] min-w-[320px] flex-col gap-8 px-4 py-10'>
        {/* <Suspense fallback={<div>Loading...</div>}> */}
        <NavigationTag currentTag={tag} />
        {/* </Suspense> */}

        <Divider />

        <Pagination totalCount={markdownMetaList.totalCount} size={parseInt(PAGE_SIZE)} />

        {markdownMetaList.markdownMetaList
          .sort((a, b) => new Date(b.updatedAt ?? '').getTime() - new Date(a.updatedAt ?? '').getTime())
          .map((markdownMeta, index) => (
            <MarkdownMetaCard key={`markdownMeta_${index}`} data={markdownMeta} />
          ))}
      </section>
    </>
  );
}
