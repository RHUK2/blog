'use client';

import { useChatMutation } from '@/_mutation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import TextInput from './TextInput';

export function ChatForm() {
  const { register, getValues, resetField, handleSubmit } = useForm({
    defaultValues: {
      message: '',
    },
  });

  const [question, setQuestion] = useState('');

  const [chat, setChat] = useState('대화를 시작해보세요!');

  const apiChat = useChatMutation();

  const onChat = handleSubmit(async (data) => {
    setQuestion(getValues('message'));

    apiChat.mutate(
      { message: data.message },
      {
        async onSuccess(data, variables, context) {
          const result = await unified()
            .use(remarkParse)
            .use(remarkGfm)
            .use(remarkRehype)
            .use(rehypeHighlight)
            .use(rehypeSlug)
            .use(rehypeStringify)
            .process(data.message.content);

          setChat(String(result));
        },
        onError(error, variables, context) {
          console.log(error);

          alert('오류가 발생했습니다.');
        },
      },
    );

    resetField('message');
  });

  return (
    <form onSubmit={onChat} className='flex h-full flex-col gap-4'>
      {question ? <p className='rounded-md border-2 p-2 text-2xl'>{question}</p> : null}
      {apiChat.isPending ? (
        <p className='prose max-w-none flex-[1_0_0] justify-center dark:prose-invert'>로딩중...</p>
      ) : (
        <p
          className='prose max-w-none flex-[1_0_0] overflow-y-auto dark:prose-invert'
          dangerouslySetInnerHTML={{
            __html: chat,
          }}
        />
      )}

      <TextInput
        {...register('message', {
          required: true,
        })}
      />
    </form>
  );
}
