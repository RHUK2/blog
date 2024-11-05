import { readPost, readFolderNameList } from '@/_util';

interface MarkdownTitleDetailPageProps {
  params: {
    folderName: string;
  };
  searchParams: {};
}

// 정적 페이지를 빌드해보려고 했으나
// NavigationTag에서 searchParams를 사용하고 있어서 불가능
// export async function generateStaticParams() {
//   const folderNameList = await readFolderNameList();

//   return folderNameList;
// }

export default async function MarkdownTitleDetailPage({ params, searchParams }: MarkdownTitleDetailPageProps) {
  const { folderName } = await params;

  const post = await readPost(folderName);

  return (
    <section className='m-auto min-h-full min-w-[320px] max-w-[768px] px-4 py-10 '>
      <p
        className='prose max-w-none dark:prose-invert'
        dangerouslySetInnerHTML={{
          __html: post,
        }}
      />
    </section>
  );
}
