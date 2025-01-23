'use client';

import { useChatMutation } from '@/_mutation';
import { ChatData } from '@/_type';
import {
  DetailedHTMLProps,
  FormHTMLAttributes,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { twMerge } from 'tailwind-merge';
import { useTabsSetStateContext } from './TabsForm';
import { Textarea } from './Textarea';

const InitChat: ChatData[] = [
  {
    role: 'system',
    content: '너는 컴퓨터 과학과 웹 소프트웨어 개발의 전문가야.',
  },
];

export const ChatForm = forwardRef(function ChatForm(
  { id, className, ...formProps }: DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>,
  ref,
) {
  const [chat, setChat] = useState<ChatData[]>(InitChat);

  const formRef = useRef<HTMLFormElement | null>(null);

  useImperativeHandle(ref, () => formRef.current);

  const ulRef = useRef<HTMLUListElement | null>(null);

  const { register, resetField, handleSubmit } = useForm({
    defaultValues: {
      userMessage: '',
    },
  });

  const setTabsState = useTabsSetStateContext();

  const apiChat = useChatMutation();

  const onChat = handleSubmit((data) => {
    const newRequest = chat.concat({ role: 'user', content: data.userMessage });
    setTabsState((prev) => ({
      ...prev,
      tabs: prev.tabs.map((prevTab) => {
        if (prevTab.id === id) {
          return {
            ...prevTab,
            title: data.userMessage,
          };
        } else {
          return prevTab;
        }
      }),
    }));

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

      event.preventDefault();
      setChat(InitChat);
    }

    window.addEventListener('keydown', resetChat);

    return () => {
      window.removeEventListener('keydown', resetChat);
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
    <form ref={formRef} className={twMerge('flex flex-col gap-4', `${className ?? ''}`)} {...formProps}>
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
                      className='prose dark:prose-invert rounded-md border border-gray-400 px-4 py-2 dark:border-gray-700'
                      remarkPlugins={[remarkGfm, remarkMath]}
                      rehypePlugins={[rehypeHighlight, rehypeSlug, rehypeKatex]}
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
                      className='prose dark:prose-invert rounded-md border border-gray-400 p-4 dark:border-gray-700'
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
        rows={1}
        placeholder='프롬프트 입력'
        {...register('userMessage', {
          required: true,
        })}
        onKeyDown={(event) => {
          if (event.ctrlKey && event.key === 'Enter') {
            onChat();
          }
        }}
      />
    </form>
  );
});
