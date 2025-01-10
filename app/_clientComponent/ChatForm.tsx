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
  const { register, resetField, handleSubmit } = useForm({
    defaultValues: {
      userMessage: '',
    },
  });

  const [chat, setChat] = useState<ChatData[]>(InitChat);

  const ulRef = useRef<HTMLUListElement | null>(null);

  const apiChat = useChatMutation();

  const onChat = handleSubmit((data) => {
    const newRequest = chat.concat({ role: 'user', content: data.userMessage });

    apiChat.mutate(
      { chat: newRequest },
      {
        onSuccess(response) {
          setChat([...newRequest, { ...response.chat }]);
        },
        onError(error) {
          console.log(error);

          alert('오류가 발생했습니다.');
        },
      },
    );

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
      <ul ref={ulRef} className='flex flex-[1_0_0px] flex-col gap-4 overflow-y-auto pr-4'>
        {apiChat.isPending ? (
          <div className='flex flex-[1_0_0px] items-center justify-center'>로딩중...</div>
        ) : (
          chat.map((message, message_index) => {
            switch (message.role) {
              case 'system':
                return null;
              case 'user':
                return (
                  <li key={message_index} className='flex flex-col gap-1 self-end'>
                    <div className='self-end'>User</div>
                    <Markdown
                      className='prose rounded-md border border-gray-400 px-4 py-2 dark:prose-invert dark:border-gray-700'
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight, rehypeSlug]}
                    >
                      {message.content}
                    </Markdown>
                  </li>
                );
              case 'assistant':
                return (
                  <li key={message_index} className='flex flex-col gap-1'>
                    <div
                      onClick={async () => {
                        await navigator.clipboard.writeText(message.content);
                      }}
                    >
                      Assistant
                    </div>
                    <Markdown
                      className='prose rounded-md border border-gray-400 p-4 dark:prose-invert dark:border-gray-700'
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight, rehypeSlug]}
                    >
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

      <Textarea
        autoComplete='off'
        placeholder='프롬프트 입력'
        {...register('userMessage', {
          required: true,
        })}
        onKeyUp={(e) => {
          if (e.ctrlKey && e.key === 'Enter') {
            onChat();
            e.currentTarget.rows = 1;
          }
        }}
      />
    </form>
  );
}
