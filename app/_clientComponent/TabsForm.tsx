'use client';

import { useFieldArray, useForm } from 'react-hook-form';
import { ChatForm } from './ChatForm';
import { useEffect, useState } from 'react';
import { Button } from './Button';
import { useMount } from '@/_hooks';

export function TabsForm() {
  const [current, setCurrent] = useState('');

  const isMounted = useMount();

  const { control } = useForm<{ tabs: { title: string }[] }>({
    mode: 'onChange',
    defaultValues: {
      tabs: [{ title: '탭' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tabs',
  });

  useEffect(() => {
    if (isMounted && fields.length > 0) {
      setCurrent(fields[0].id);
    }
  }, [isMounted, fields]);

  return (
    <div className='flex h-full flex-col gap-3'>
      <div className='flex items-end gap-2 overflow-x-auto border-b border-gray-400 dark:border-gray-700'>
        {fields.map((tab, tab_index) => (
          <div
            key={tab.id}
            className={`flex min-h-10 min-w-12 flex-[0_0_90px] cursor-pointer items-center justify-between gap-2 rounded-t-md border border-b-0 border-gray-400 bg-gradient-to-br from-gray-50 to-gray-100 px-2 dark:border-gray-700 dark:from-gray-900 dark:to-gray-800`}
            onClick={() => {
              setCurrent(tab.id);
            }}
          >
            <p>{tab.title}</p>
            <p
              onClick={() => {
                remove(tab_index);
              }}
            >
              x
            </p>
          </div>
        ))}
        <Button
          className='h-6 rounded-none rounded-t-md border-b-0'
          onClick={() => {
            append({ title: '탭' });
          }}
        >
          +
        </Button>
      </div>

      {fields.map((tab) => (
        <div key={tab.id} className={`flex-[1_0_0px] ${tab.id === current ? 'block' : 'hidden'}`}>
          <ChatForm />
        </div>
      ))}
    </div>
  );
}
