'use client';

import markdownMetaList from '@/entities/markdown/list.json';
import { Button, TextInput } from '@/shared/components';
import Fuse from 'fuse.js';
import { useState } from 'react';
import { MarkdownMetaList } from '../types';
import { MarkdownMetaCard } from './MarkdownMetaCard';
import { useThrottle } from '@/utils/hooks';
import { Modal, ModalContent, ModalFooter, ModalHeader } from '@/shared/components/Modal';

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
      <Button onClick={open}>Click</Button>
      <Modal isOpen={isOpen} close={close}>
        <ModalHeader></ModalHeader>
        <ModalContent></ModalContent>
        <ModalFooter></ModalFooter>
      </Modal>
    </>
  );
}

export function MarkdownSearchInput() {
  const [results, setResults] = useState<MarkdownMetaList>([]);

  const fuseOptions = {
    // isCaseSensitive: false,
    // includeScore: false,
    // ignoreDiacritics: false,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    // threshold: 0.6,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
    keys: ['title', 'tag'],
  };

  const fuse = new Fuse(markdownMetaList, fuseOptions);

  const throttledSearch = useThrottle(handleSearch, 300);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const query = e.target.value;

    if (query.length < 2) {
      setResults([]);
      return;
    }

    const results = fuse.search(query).map((result) => ({
      ...result.item,
    }));

    setResults(results);
  }

  return (
    <div className='flex flex-col gap-2'>
      <TextInput placeholder='검색어 입력(최소 2자)' onChange={throttledSearch} />
      {results.length > 0 && (
        <ul className='flex max-h-60 flex-col gap-2 overflow-y-auto p-2'>
          {results.map((result) => (
            <MarkdownMetaCard key={result.id} data={result} />
          ))}
        </ul>
      )}
    </div>
  );
}
