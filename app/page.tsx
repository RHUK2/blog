import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

export default function RootPage() {
  return (
    <main className='m-auto min-h-full min-w-[320px] max-w-[1024px] border-x border-x-gray-300 bg-white pt-12 dark:border-x-gray-800 dark:bg-gray-950'>
      <section className='m-auto min-w-[320px] max-w-[768px] px-4 py-10'>
        <Markdown
          className='prose rounded-md border border-gray-400 p-4 dark:prose-invert dark:border-gray-700'
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight, rehypeSlug]}>
          {'자기소개입니다.'}
        </Markdown>
      </section>
    </main>
  );
}
