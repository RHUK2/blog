import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

export default function RootPage() {
  return (
    <main className='m-auto min-h-full max-w-[1024px] min-w-[320px] border-x border-x-gray-300 bg-white pt-12 dark:border-x-gray-800 dark:bg-gray-950'>
      <section className='m-auto max-w-[768px] min-w-[320px] px-4 py-10'>
        <Markdown
          className='prose dark:prose-invert rounded-md border border-gray-400 p-4 dark:border-gray-700'
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeHighlight, rehypeSlug, rehypeKatex]}
        >
          자기소개
        </Markdown>
      </section>
    </main>
  );
}
