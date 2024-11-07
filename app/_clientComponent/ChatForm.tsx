'use client';

import { useChatMutation } from '@/_mutation';
import { ChatData } from '@/_type';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import TextInput from './TextInput';

const InitChat: ChatData[] = [
  {
    role: 'system',
    content: 'You are an expert in Nextjs (v14+) with Typescript (v5+).',
  },
];

export function ChatForm() {
  const { register, resetField, handleSubmit } = useForm({
    defaultValues: {
      userMessage: '',
    },
  });

  const [chat, setChat] = useState<ChatData[]>(InitChat);

  const apiChat = useChatMutation();

  const onChat = handleSubmit(async (data) => {
    const newRequest = chat.concat({ role: 'user', content: data.userMessage });

    apiChat.mutate(
      { chat: newRequest },
      {
        async onSuccess(response) {
          const html = await unified()
            .use(remarkParse)
            .use(remarkGfm)
            .use(remarkRehype)
            .use(rehypeHighlight)
            .use(rehypeSlug)
            .use(rehypeStringify)
            .process(response.chat.content);

          setChat((prev) => [...prev, { ...response.chat, html: String(html) }]);
        },
        onError(error) {
          console.log(error);

          alert('오류가 발생했습니다.');
        },
      },
    );

    setChat(newRequest);

    resetField('userMessage');
  });

  useEffect(() => {
    function resetChat(this: Window, event: KeyboardEvent) {
      if (event.key !== 'Delete' || event.ctrlKey !== true || event.shiftKey !== true) return;

      setChat(InitChat);
    }

    function preventBrowserDefault(this: Window, event: KeyboardEvent) {
      if (event.key !== 'Delete' || event.ctrlKey !== true || event.shiftKey !== true) return;

      event.preventDefault();
    }

    window.addEventListener('keyup', resetChat);
    window.addEventListener('keydown', preventBrowserDefault);

    return () => {
      window.removeEventListener('keyup', resetChat);
      window.removeEventListener('keydown', preventBrowserDefault);
    };
  }, []);

  return (
    <form onSubmit={onChat} className='flex h-full flex-col gap-4'>
      <ul className='flex flex-[1_0_0] flex-col gap-4 overflow-y-auto'>
        {apiChat.isPending
          ? '로딩중...'
          : chat.map((message, message_index) => {
              switch (message.role) {
                case 'system':
                  return null;
                case 'user':
                  return (
                    <li key={message_index} className='rounded-md border-2 p-2 text-lg'>
                      {message.content}
                    </li>
                  );
                case 'assistant':
                  return (
                    <li
                      key={message_index}
                      className='prose max-w-none dark:prose-invert'
                      dangerouslySetInnerHTML={{
                        __html: message.html ?? '',
                      }}
                    />
                  );
                default:
                  const never = message.role;
                  return never;
              }
            })}
      </ul>

      <TextInput
        autoComplete='off'
        {...register('userMessage', {
          required: true,
        })}
      />
    </form>
  );
}
