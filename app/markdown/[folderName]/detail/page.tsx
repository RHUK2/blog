import { ArticleTableOfContents, markdownMetaList } from '@/entities/markdown';
import { readMarkdownContent } from '@/entities/markdown/api';
import { MermaidDiagram, ScrollTopFloatingButton } from '@/shared/ui';
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
    <section className='mx-auto min-h-full max-w-6xl px-4 py-10 lg:px-8'>
      <div className='flex gap-10'>
        <div id='article-content' className='typeset max-w-none min-w-0 flex-1'>
          <Markdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeHighlight, rehypeSlug, rehypeKatex]}
            components={{
              code({ className, children }) {
                if (className?.includes('language-mermaid')) {
                  return <MermaidDiagram chart={String(children)} />;
                }
                return <code className={className}>{children}</code>;
              },
              table({ children }) {
                return (
                  <div className='typeset-scroll'>
                    <table>{children}</table>
                  </div>
                );
              },
              img({ alt, src }) {
                return (
                  <Image
                    className='not-typeset rounded-md'
                    alt={alt ?? ''}
                    src={`/markdown/${folderName}/${src ?? ''}`}
                    unoptimized={unoptimzed(src)}
                    sizes='(max-width: 768px) calc(100vw - 2rem), 736px'
                    width={0}
                    height={0}
                    style={{ width: '100%', height: 'auto' }}
                  />
                );
              },
            }}
          >
            {markdownContent}
          </Markdown>
        </div>

        <aside className='sticky top-20 hidden h-fit w-64 shrink-0 lg:block'>
          <ArticleTableOfContents containerId='article-content' />
        </aside>
      </div>

      <ScrollTopFloatingButton />
    </section>
  );
}
