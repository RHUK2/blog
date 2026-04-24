'use client';

import { Chat, ChatForm as ChatFormType, useChatMutation } from '@/entities/chat';
import { Button, Textarea } from '@/shared/ui';
import { Copy, CopyCheck } from 'lucide-react';
import React, {
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
import { useSetTabListStateContext } from './TabsForm';

const initChat: Chat[] = [
  {
    role: 'system',
    content:
      '너가 준수해야 하는 규칙은 다음과 같아.\n\n- 너는 컴퓨터 과학과 웹 소프트웨어 개발의 전문가야.\n- 질문에 대한 응답은 건조체를 사용한 개조식 형태로 작성해줘.\n- 위 사항을 꼭 지켜줘.',
  },
];

export const ChatForm = forwardRef(function ChatForm(
  { id, className, ...formProps }: DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>,
  ref,
) {
  const [chatList, setChatList] = useState<Chat[]>(initChat);

  const [abortController, setAbortController] = useState<AbortController>(new AbortController());

  const [isStreaming, setIsStreaming] = useState(false);

  const [isCopy, setIsCopy] = useState<(boolean | undefined)[]>([]);

  const formRef = useRef<HTMLFormElement | null>(null);

  const ulRef = useRef<HTMLUListElement | null>(null);

  useImperativeHandle(ref, () => formRef.current);

  const { register, resetField, handleSubmit } = useForm<ChatFormType>({
    defaultValues: {
      userMessage: '',
      model: 'deepseek-chat',
    },
  });

  const setTabListState = useSetTabListStateContext();

  const apiChat = useChatMutation(abortController.signal);

  const onChat = handleSubmit((data) => {
    setIsStreaming(true);

    const newRequest = chatList.concat(
      {
        role: 'user',
        content: `${data.userMessage}`,
      },
      {
        role: 'assistant',
        content: '🤔',
      },
    );

    setChatList(newRequest);
    setTabListState((prev) => ({
      ...prev,
      tabList: prev.tabList.map((prevTab) => (prevTab.id === id ? { ...prevTab, title: data.userMessage } : prevTab)),
    }));

    moveScroll();

    apiChat.mutate(
      { chatList: newRequest, model: data.model },
      {
        async onSuccess(response) {
          try {
            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let responseText = '';

            while (true) {
              const { done, value } = await reader!.read();

              if (done) break;

              const chunk = decoder.decode(value);

              responseText += chunk;

              setChatList((prev) => [...prev.slice(0, -1), { role: 'assistant', content: responseText }]);
            }

            setIsStreaming(false);
          } catch (error) {
            console.error(error);

            setIsStreaming(false);
            setChatList((prev) => [...prev.slice(0, -1), { role: 'assistant', content: '😵 오류가 발생했습니다\\.' }]);
          }
        },
        onError(error) {
          console.error(error);

          setIsStreaming(false);
          setChatList((prev) => [...prev.slice(0, -1), { role: 'assistant', content: '😵 오류가 발생했습니다\\.' }]);
        },
      },
    );

    resetField('userMessage');
  });

  function onKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (!isStreaming && event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onChat();
    }
  }

  function abortChat() {
    abortController.abort('User manually canceled.');
    setAbortController(new AbortController());
    setIsStreaming(false);
  }

  function onClick() {
    if (isStreaming) {
      abortChat();
      return;
    }

    onChat();
  }

  async function copyMessage(message: string, index: number) {
    await navigator.clipboard.writeText(message);
    setIsCopy((prev) => {
      const newCopyState = [...prev];
      newCopyState[index] = true;
      return newCopyState;
    });
    setTimeout(() => {
      setIsCopy((prev) => {
        const newCopyState = [...prev];
        newCopyState[index] = false;
        return newCopyState;
      });
    }, 1000);
  }

  function moveScroll() {
    if (ulRef.current) {
      const lastLi = ulRef.current?.children[ulRef.current?.children.length - 1];

      if (lastLi) {
        ulRef.current.scrollTop = (lastLi as HTMLLIElement).offsetTop;
      }
    }
  }

  useEffect(() => {
    if (!formRef.current) return;

    function resetChat(this: HTMLFormElement, event: KeyboardEvent) {
      if (event.key !== 'Delete' || event.ctrlKey !== true || event.shiftKey !== true) return;

      event.preventDefault();
      setChatList(initChat);

      setTabListState((prev) => ({
        ...prev,
        tabList: prev.tabList.map((prevTab) => (prevTab.id === id ? { ...prevTab, title: 'New Tab' } : prevTab)),
      }));
    }

    formRef.current.addEventListener('keydown', resetChat);
  }, [id, setTabListState]);

  useEffect(() => {
    moveScroll();
  }, [chatList.length]);

  return (
    <form role='tabpanel' ref={formRef} className={twMerge('flex flex-col gap-4', `${className ?? ''}`)} {...formProps}>
      <ul ref={ulRef} className='flex flex-[1_0_0px] flex-col gap-4 overflow-y-auto pr-2'>
        {chatList.map((message, message_index) => {
          switch (message.role) {
            case 'system':
              return null;
            case 'user':
              return (
                <li key={message_index} className='flex flex-col gap-1 self-end'>
                  <div
                    className='flex cursor-pointer items-center gap-1 self-end'
                    onClick={() => {
                      copyMessage(message.content, message_index);
                    }}
                  >
                    {isCopy[message_index] ? <CopyCheck size={14} className='stroke-green-500' /> : <Copy size={14} />}
                    User
                  </div>
                  <div className='prose dark:prose-invert rounded-md border border-gray-400 px-4 py-2 dark:border-gray-700'>
                    <Markdown
                      remarkPlugins={[remarkGfm, remarkMath]}
                      rehypePlugins={[rehypeHighlight, rehypeSlug, rehypeKatex]}
                    >
                      {message.content}
                    </Markdown>
                  </div>
                </li>
              );
            case 'assistant':
              return (
                <li key={message_index} className='flex flex-col gap-1'>
                  <div
                    className='flex cursor-pointer items-center gap-1'
                    onClick={() => {
                      copyMessage(message.content, message_index);
                    }}
                  >
                    Assistant
                    {isCopy[message_index] ? <CopyCheck size={14} className='stroke-green-500' /> : <Copy size={14} />}
                  </div>
                  <div className='prose dark:prose-invert rounded-md border border-gray-400 px-4 py-2 dark:border-gray-700'>
                    <Markdown
                      remarkPlugins={[remarkGfm, remarkMath]}
                      rehypePlugins={[rehypeHighlight, rehypeSlug, rehypeKatex]}
                    >
                      {message.content}
                    </Markdown>
                  </div>
                </li>
              );
            default:
              const never = message.role;
              return never;
          }
        })}
      </ul>

      {/* <fieldset className='flex flex-wrap items-center gap-4'>
        <label className='flex cursor-pointer items-center gap-2' htmlFor={`deepseek-chat-${id}`}>
          <Radio
            className='cursor-pointer'
            id={`deepseek-chat-${id}`}
            type='radio'
            {...register('model')}
            value='deepseek-chat'
          />
          deepseek-chat
        </label>
        <label className='flex cursor-pointer items-center gap-2' htmlFor={`deepseek-reasoner-${id}`}>
          <Radio
            className='cursor-pointer'
            id={`deepseek-reasoner-${id}`}
            type='radio'
            {...register('model')}
            value='deepseek-reasoner'
          />
          deepseek-reasoner
        </label>
        <label className='flex cursor-pointer items-center gap-2' htmlFor={`gpt-4o-mini-${id}`}>
          <Radio
            className='cursor-pointer'
            id={`gpt-4o-mini-${id}`}
            type='radio'
            {...register('model')}
            value='gpt-4o-mini'
          />
          4o-mini
        </label>
        <label className='flex cursor-pointer items-center gap-2' htmlFor={`chatgpt-4o-latest-${id}`}>
          <Radio
            className='cursor-pointer'
            id={`chatgpt-4o-latest-${id}`}
            type='radio'
            {...register('model')}
            value='chatgpt-4o-latest'
          />
          4o-latest
        </label>
      </fieldset> */}

      <div className='flex gap-2'>
        <Textarea
          autoComplete='off'
          rows={1}
          className='flex-[1_0_0px]'
          placeholder='프롬프트 입력'
          {...register('userMessage', {
            required: true,
          })}
          onKeyDown={onKeyDown}
        />
        <Button onClick={onClick}>{isStreaming ? '취소' : '입력'}</Button>
      </div>
    </form>
  );
});
