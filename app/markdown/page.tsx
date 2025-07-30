import { readMarkdownMetaList } from '@/entities/markdown/data';
import { MarkdownMetaCard, NavigationTag } from '@/entities/markdown/components';
import { Divider, Pagination, SearchInput } from '@/shared/components';
import { PAGE_SIZE } from '@/utils/constants';

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

      {/* <SearchInput /> */}

      <Pagination totalCount={markdownMetaList.totalCount} size={parseInt(PAGE_SIZE)} />

      {markdownMetaList.markdownMetaList.map((markdownMeta) => (
        <MarkdownMetaCard key={markdownMeta.id} data={markdownMeta} />
      ))}
    </section>
  );
}
