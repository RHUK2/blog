import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import type { MarkdownTagList } from '../model/types';

interface Props {
  currentTag?: string;
  tagList: MarkdownTagList;
}

export function TagNavigation({ currentTag, tagList }: Props) {
  return (
    <nav className='flex flex-wrap items-center gap-2'>
      {tagList.map((tag) => (
        <Link
          key={tag.id}
          href={tag.name ? `/markdown?tag=${tag.name}` : '/markdown'}
          className={twMerge(
            'border-border bg-muted rounded-xl border px-2 py-1 text-xs font-medium',
            (currentTag === tag.name || ((currentTag == null || currentTag === '') && tag.name === '')) &&
              'border-primary bg-primary text-primary-foreground',
          )}
        >
          {`${tag.name || 'ALL'} (${tag.postCount})`}
        </Link>
      ))}
    </nav>
  );
}
