'use client';

import { useChatMutation } from '@/_mutation';
import { ChatData } from '@/_type';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { Textarea } from './Textarea';

const InitChat: ChatData[] = [
  {
    role: 'system',
    content: '너는 컴퓨터 과학과 웹 소프트웨어 개발의 전문가야.',
  },
];

export function ChatForm() {
  const { register, getValues, resetField, handleSubmit } = useForm({
    defaultValues: {
      userMessage: '',
    },
  });

  const [chat, setChat] = useState<ChatData[]>(InitChat);

  const [rows, setRows] = useState(1);

  const ulRef = useRef<HTMLUListElement | null>(null);

  const apiChat = useChatMutation();

  const onChat = handleSubmit(async (data) => {
    const newRequest = chat.concat({ role: 'user', content: data.userMessage });

    apiChat.mutate(
      { chat: newRequest },
      {
        async onSuccess(response) {
          setChat((prev) => [...prev, { ...response.chat }]);
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

  useEffect(() => {
    if (ulRef.current) {
      const lastLi = ulRef.current?.children[ulRef.current?.children.length - 2];

      if (lastLi) {
        ulRef.current.scrollTop = (lastLi as HTMLLIElement).offsetTop;
      }
    }
  }, [chat]);

  return (
    <form className='flex h-full flex-col gap-4'>
      <Textarea
        autoComplete='off'
        placeholder='프롬프트 입력'
        {...register('userMessage', {
          required: true,
          onChange(event: React.ChangeEvent) {
            const len = (event.target as HTMLTextAreaElement).value.match(/\n/g)?.length;
            setRows((len ?? 0) + 1 || 1);
          },
        })}
        rows={rows}
        onKeyUp={(e) => {
          if (e.ctrlKey && e.key === 'Enter') {
            onChat();
          }
        }}
      />

      <ul ref={ulRef} className='relative flex flex-[1_0_0] flex-col gap-4 overflow-y-auto'>
        {apiChat.isPending ? (
          <div className='flex h-full items-center justify-center'>로딩중...</div>
        ) : (
          chat.map((message, message_index) => {
            switch (message.role) {
              case 'system':
                return null;
              case 'user':
                return (
                  <li key={message_index}>
                    <Markdown
                      className='prose max-w-none rounded-md border px-2 dark:prose-invert'
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight, rehypeSlug]}>
                      {message.content}
                    </Markdown>
                  </li>
                );
              case 'assistant':
                return (
                  <li key={message_index}>
                    <Markdown
                      className='prose max-w-none dark:prose-invert'
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight, rehypeSlug]}>
                      {message.content}
                    </Markdown>
                  </li>
                );
              default:
                const never = message.role;
                return never;
            }
          })
        )}
      </ul>
    </form>
  );
}
