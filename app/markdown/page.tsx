import { MarkdownMetaCard, Pagination } from '@/clientComponents';
import { readMarkdownMetaList } from '@/data/dynamic/local.data';
import { PAGE_SIZE } from '@/data/static/constants';
import { Divider, NavigationTag } from '@/serverComponents';

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
      <NavigationTag currentTag={tag} />

      <Divider />

      <Pagination totalCount={markdownMetaList.totalCount} size={parseInt(PAGE_SIZE)} />

      {markdownMetaList.markdownMetaList.map((markdownMeta) => (
        <MarkdownMetaCard key={markdownMeta.id} data={markdownMeta} />
      ))}
    </section>
  );
}
