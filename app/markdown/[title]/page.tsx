import { readPost } from '@/_util';

interface ArchiveTitlePageProps {
  params: {
    title: string;
  };
  searchParams: {};
}

export default async function ArchiveTitlePage({ params, searchParams }: ArchiveTitlePageProps) {
  const post = await readPost(params.title);

  return (
    <section className='m-auto min-w-[320px] max-w-[768px] px-4 py-10 '>
      <article
        className='prose max-w-none dark:prose-invert'
        dangerouslySetInnerHTML={{
          __html: post,
        }}
      />
    </section>
  );
}
