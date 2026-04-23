'use client';

import markdownMetaList from '@/entities/markdown/api/list.json';
import type { MarkdownMetaList } from '@/entities/markdown/model/types';
import { MarkdownMetaCard } from '@/entities/markdown/ui';
import { Modal, TextInput } from '@/shared/ui';
import Fuse from 'fuse.js';
import { Search } from 'lucide-react';
import { motion } from 'motion/react';
import { useMemo, useState } from 'react';

export function MarkdownSearchButton() {
  const [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <motion.button
        aria-label='search-markdown'
        onClick={open}
        className='cursor-pointer'
        whileHover={{
          scale: 1.2,
        }}
        whileFocus={{
          scale: 1.2,
        }}
      >
        <Search size={20} />
      </motion.button>
      <Modal isOpen={isOpen} close={close}>
        <MarkdownSearch onClose={close} />
      </Modal>
    </>
  );
}

interface MarkdownSearchInputProps {
  onClose?: () => void;
}

export function MarkdownSearch({ onClose }: MarkdownSearchInputProps) {
  const [results, setResults] = useState<MarkdownMetaList>([]);

  const fuse = useMemo(
    () =>
      new Fuse(markdownMetaList, {
        keys: ['title', 'tag'],
      }),
    [],
  );

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    if (value.length < 2) {
      setResults([]);
      return;
    }

    setResults(fuse.search(value).map((result) => ({ ...result.item })));
  }

  return (
    <div className='flex flex-col gap-4'>
      <TextInput className='w-full placeholder:text-sm' placeholder='검색어 입력(최소 2자)' onChange={handleSearch} />
      {results.length === 0 && (
        <div className='flex min-h-100 flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-gray-300 py-8 dark:border-gray-700'>
          <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>검색 결과가 없습니다.</p>
          <p className='text-xs text-gray-400 dark:text-gray-500'>다른 키워드로 검색해보세요.</p>
        </div>
      )}
      {results.length > 0 && (
        <div className='relative'>
          <ul className='flex max-h-100 flex-col gap-2 overflow-y-auto p-2'>
            {results.map((result) => (
              <MarkdownMetaCard key={result.id} data={result} onClick={onClose} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
