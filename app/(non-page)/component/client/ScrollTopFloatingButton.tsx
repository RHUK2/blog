'use client';

export function ScrollTopFloatingButton() {
  function scrollTop() {
    window.scrollTo(0, 0);
  }

  return (
    <div
      onClick={scrollTop}
      className='fixed bottom-10 right-10 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-gray-100 from-30% to-gray-50 to-70% shadow-md shadow-gray-300 dark:from-gray-900 dark:to-gray-800 dark:shadow-gray-700'>
      🚀
    </div>
  );
}
