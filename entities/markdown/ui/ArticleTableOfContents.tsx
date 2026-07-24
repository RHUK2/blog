'use client';

import { useRequestAnimationFrame } from '@/shared/hooks';
import { cn } from '@/shared/lib/utils';
import { useEffect, useState } from 'react';

interface HeadingItem {
  id: string;
  level: number;
  text: string;
}

interface Props {
  containerId: string;
}

const HEADER_OFFSET = 64;

export function ArticleTableOfContents({ containerId }: Props) {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const elements = Array.from(container.querySelectorAll<HTMLElement>('h1[id], h2[id], h3[id]'));

    setHeadings(
      elements.map((element) => ({
        id: element.id,
        level: Number(element.tagName[1]),
        text: element.textContent ?? '',
      })),
    );
  }, [containerId]);

  const handleScroll = useRequestAnimationFrame(() => {
    let current = '';

    for (const heading of headings) {
      const element = document.getElementById(heading.id);
      if (element && element.getBoundingClientRect().top <= HEADER_OFFSET) {
        current = heading.id;
      }
    }

    setActiveId((prev) => current || prev);
  });

  useEffect(() => {
    if (headings.length === 0) return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings, handleScroll]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label='목차' className='flex flex-col gap-2 text-sm'>
      {headings.map((heading) => (
        <a
          key={heading.id}
          href={`#${heading.id}`}
          className={cn(
            'truncate transition-colors',
            heading.level === 2 && 'pl-3',
            heading.level === 3 && 'pl-6',
            activeId === heading.id ? 'text-foreground font-medium' : 'text-muted-foreground',
          )}
        >
          {heading.text}
        </a>
      ))}
    </nav>
  );
}
