'use client';

import { useEffect, useState } from 'react';
import Button from './Button';
import { useForm } from 'react-hook-form';
import TextInput from './TextInput';

export function ChatForm() {
  const { register } = useForm({
    defaultValues: {
      input: '',
    },
  });

  const [chat, setChat] = useState('');

  async function onTest() {
    try {
      const response = await fetch('/api/chat', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          message: 'as',
        }),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log('🚀 ~ onTest ~ json:', json);
      setChat(json.message.content);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        throw error;
      }
    }
  }

  return (
    <div className='flex gap-2'>
      <TextInput
        {...register('input', {
          required: true,
        })}
      />
      <Button type='button' onClick={onTest}>
        입력
      </Button>
      <p>{chat}</p>
    </div>
  );
}
