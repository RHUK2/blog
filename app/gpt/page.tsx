import { ChatForm } from '@/_clientComponent';

export default async function GptPage() {
  return (
    <section className='m-auto min-w-[320px] max-w-[768px] px-4 py-10'>
      <ChatForm />
    </section>
  );
}
