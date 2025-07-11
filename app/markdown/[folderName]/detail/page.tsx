import { ScrollTopFloatingButton } from '@/clientComponents';
import markdownMetaList from '@/data/dynamic/list.json';
import { readMarkdownContent } from '@/data/dynamic/local.data';
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

// export const revalidate = 3600;

export const dynamicParams = false;

export async function generateStaticParams() {
  return markdownMetaList.map((markdownMeta) => ({
    folderName: markdownMeta.folderName,
  }));
}

export default async function Page({ params }: Props) {
  const { folderName } = await params;

  const markdownContent = await readMarkdownContent(folderName);

  return (
    <section className='min-h-full px-4 py-10'>
      <Markdown
        className='prose dark:prose-invert max-w-none'
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeSlug]}
        components={{
          img({ alt, src }) {
            return (
              <Image
                className='not-prose rounded-md object-contain'
                alt={alt ?? ''}
                src={`/markdown/${folderName}/${src ?? ''}`}
                unoptimized={src?.match(/\.(svg|gif)$/) ? true : false}
                width={800}
                height={600}
              />
            );
          },
        }}
      >
        {markdownContent}
      </Markdown>

      <ScrollTopFloatingButton />
    </section>
  );
}
