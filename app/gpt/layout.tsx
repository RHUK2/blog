interface GptLayoutProps {
  children: React.ReactNode;
}

export default function GptLayout({ children }: Readonly<GptLayoutProps>) {
  return (
    <main className='m-auto h-full min-w-[320px] max-w-[1024px] border-x border-x-gray-300 bg-white pt-12 dark:border-x-gray-800 dark:bg-gray-950'>
      {children}
    </main>
  );
}
