import { MarkdownMetaCard, TagNavigation } from '@/entities/markdown';
import { readMarkdownMetaList, readTagList } from '@/entities/markdown/api';
import { PAGE_SIZE } from '@/shared/config';
import { Divider, Pagination } from '@/shared/ui';

interface Props {
  searchParams: Promise<{
    tag?: string;
    page?: string;
    size?: string;
  }>;
}

export default async function Page({ searchParams }: Props) {
  const { tag, page, size } = await searchParams;

  const [markdownMetaList, tagList] = await Promise.all([readMarkdownMetaList(tag, page, size), readTagList()]);

  return (
    <section className='mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-10'>
      <TagNavigation currentTag={tag} tagList={tagList.markdownTagList} />

      <Divider />

      <Pagination totalCount={markdownMetaList.totalCount} size={parseInt(PAGE_SIZE)} />

      <ul className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        {markdownMetaList.markdownMetaList.map((markdownMeta) => (
          <MarkdownMetaCard key={markdownMeta.id} data={markdownMeta} />
        ))}
      </ul>
    </section>
  );
}
