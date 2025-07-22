'use client';

import markdownMetaList from '@/entities/markdown/list.json';
import Fuse from 'fuse.js';
import { useState } from 'react';
import { TextInput } from './TextInput';

export function SearchInput() {
  const [results, setResults] = useState([]);

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
    keys: ['title'],
  };

  const fuse = new Fuse(markdownMetaList, fuseOptions);

  return (
    <div>
      <TextInput
        placeholder='Search...'
        onChange={(e) => {
          const query = e.target.value;
          if (query.length < 2) return;

          const results = fuse.search(query).map((result) => ({
            id: result.item.id,
            title: result.item.title,
          }));

          setResults(results);
        }}
      />
      {results.length > 0 && (
        <ul className='mt-2 max-h-60 overflow-y-auto rounded-md border border-gray-300 shadow-lg'>
          {results.map((result) => (
            <li key={result.id} className='cursor-pointer px-4 py-2 hover:bg-gray-100'>
              <a href={`/markdown/${result.id}`}>{result.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
