import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      className='flex flex-col items-center gap-4 pt-12 
      text-xl tracking-tighter'>
      <p>페이지를 찾을 수 없습니다.</p>
      <Link href='/'>🏠 HOME</Link>
    </div>
  );
}
