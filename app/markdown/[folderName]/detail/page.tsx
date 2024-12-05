import { readPost } from '@/_util';
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
        rehypePlugins={[rehypeHighlight, rehypeSlug]}>
        {post}
      </Markdown>
    </section>
  );
}
