import { readMarkdownContent, readMarkdownMetaListAll } from '@/data/dynamic/local.data';
import Image from 'next/image';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

interface Props {
  params: Promise<{
    folderName: string;
  }>;
}

export const revalidate = 3600;

export const dynamicParams = false;

export async function generateStaticParams() {
  const markdownMetaList = await readMarkdownMetaListAll();

  return markdownMetaList.markdownMetaList.map((markdownMeta) => ({
    folderName: markdownMeta.folderName,
  }));
}

export default async function Page({ params }: Props) {
  const { folderName } = await params;

  const markdownContent = await readMarkdownContent(folderName);

  return (
    <section className='m-auto min-h-full max-w-[768px] min-w-[320px] px-4 py-10'>
      <Markdown
        className='prose dark:prose-invert max-w-none'
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeSlug]}
        components={{
          img({ alt, src }) {
            return (
              <Image
                alt={alt ?? ''}
                src={`/markdown/${folderName}/${src ?? ''}`}
                unoptimized={src?.match(/\.(svg|gif)$/) ? true : false}
                width={1600}
                height={900}
                sizes='100vw'
                style={{ width: '100%', height: 'auto' }}
                loading='lazy'
                placeholder='blur'
                blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO85gMAAf4BJEBW4VEAAAAASUVORK5CYII='
              />
            );
          },
        }}
      >
        {markdownContent}
      </Markdown>
    </section>
  );
}
