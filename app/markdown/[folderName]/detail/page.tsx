import { readPost } from '@/_util';
import Image from 'next/image';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

interface MarkdownFolderNameDetailPageProps {
  params: Promise<{
    folderName: string;
  }>;
}

export default async function MarkdownFolderNameDetailPage({ params }: MarkdownFolderNameDetailPageProps) {
  const { folderName } = await params;

  const post = await readPost(folderName);

  return (
    <section className='m-auto min-h-full min-w-[320px] max-w-[768px] px-4 py-10'>
      <Markdown
        className='prose max-w-none dark:prose-invert'
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeSlug]}
        components={{
          img({ alt, src }) {
            return (
              <Image
                alt={alt ?? ''}
                src={`/markdown/${folderName}/${src ?? ''}`}
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
        {post}
      </Markdown>
    </section>
  );
}
