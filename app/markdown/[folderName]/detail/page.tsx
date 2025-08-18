import { readMarkdownContent } from '@/entities/markdown/data';
import markdownMetaList from '@/entities/markdown/list.json';
import { ScrollTopFloatingButton } from '@/shared/components';
import Image from 'next/image';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

interface Props {
  params: Promise<{
    folderName: string;
  }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return markdownMetaList.map((markdownMeta) => ({
    folderName: markdownMeta.folderName,
  }));
}

export default async function Page({ params }: Props) {
  const { folderName } = await params;

  const markdownContent = await readMarkdownContent(folderName);

  const unoptimzed = (src: string | Blob | undefined) => {
    if (typeof src === 'string') {
      return src.match(/\.(svg|gif)$/) ? true : false;
    }

    return true;
  };

  return (
    <section className='min-h-full px-4 py-10'>
      <div className='prose dark:prose-invert max-w-none'>
        <Markdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeHighlight, rehypeSlug, rehypeKatex]}
          components={{
            img({ alt, src }) {
              return (
                <Image
                  className='not-prose rounded-md object-contain'
                  alt={alt ?? ''}
                  src={`/markdown/${folderName}/${src ?? ''}`}
                  unoptimized={unoptimzed(src)}
                  width={800}
                  height={600}
                />
              );
            },
          }}
        >
          {markdownContent}
        </Markdown>
      </div>

      <ScrollTopFloatingButton />
    </section>
  );
}
