import { MarkdownMetaCard, TagNavigation, readMarkdownMetaList } from '@/entities/markdown';
import { PAGE_SIZE } from '@/shared/config/constants';
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

  const markdownMetaList = await readMarkdownMetaList(tag, page, size);

  return (
    <section className='flex flex-col gap-8 px-4 py-10'>
      <TagNavigation currentTag={tag} />

      <Divider />

      <Pagination totalCount={markdownMetaList.totalCount} size={parseInt(PAGE_SIZE)} />

      {markdownMetaList.markdownMetaList.map((markdownMeta) => (
        <MarkdownMetaCard key={markdownMeta.id} data={markdownMeta} />
      ))}
    </section>
  );
}
