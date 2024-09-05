import { getPost } from '@/_util';

interface PostListTitlePageProps {
  params: {
    directory: string;
    title: string;
  };
  searchParams: {};
}

export default async function PostListDirectoryTitlePage({ params, searchParams }: PostListTitlePageProps) {
  const data = await getPost(params.directory, decodeURIComponent(params.title));

  return (
    <section className='m-auto min-w-[320px] max-w-[768px] px-4 py-10 '>
      <article
        className='prose max-w-none dark:prose-invert'
        dangerouslySetInnerHTML={{
          __html: data,
        }}
      />
    </section>
  );
}
