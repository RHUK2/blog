import Link from 'next/link';

export default function NotFound() {
  return (
    <main className='m-auto min-h-full min-w-[320px] max-w-[1024px] border-x border-x-gray-300 bg-white pt-12 dark:border-x-gray-800 dark:bg-gray-950'>
      <section className='m-auto min-w-[320px] max-w-[768px] px-4 py-10'>
        <div className='flex flex-col items-center gap-4 pt-12 text-xl tracking-tighter'>
          <p>페이지를 찾을 수 없습니다.</p>
          <Link href='/'>🏠HOME</Link>
        </div>
      </section>
    </main>
  );
}
