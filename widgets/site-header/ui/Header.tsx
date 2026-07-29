'use client';

import { MarkdownSearchButton } from '@/features/search-markdown';
import { DarkLightButton } from '@/shared/ui';
import { motion, MotionConfig } from 'motion/react';
import Link from 'next/link';
import { v4 } from 'uuid';

const MotionLink = motion.create(Link);

const navList = [
  {
    id: v4(),
    href: '/markdown',
    text: 'NOTE',
  },
];

export function Header() {
  return (
    <MotionConfig
      transition={{
        duration: 0.1,
      }}
    >
      <header className='border-b-border bg-background/80 fixed z-50 w-full border-b backdrop-blur-sm'>
        <div className='m-auto flex h-12 w-full max-w-3xl min-w-xs items-center justify-between px-5 text-lg tracking-tighter'>
          <MotionLink
            href='/'
            className='hover:text-primary origin-bottom-left leading-none font-bold transition-colors'
            whileHover={{
              scale: 1.1,
            }}
            whileFocus={{
              scale: 1.1,
            }}
          >
            RHUK2
          </MotionLink>

          <div className='flex items-center gap-4'>
            <DarkLightButton />
            <MarkdownSearchButton />
            {navList.map((navItem) => (
              <MotionLink
                key={navItem.id}
                href={navItem.href}
                className='hover:text-primary origin-bottom-left leading-none transition-colors'
                whileHover={{
                  scale: 1.1,
                }}
                whileFocus={{
                  scale: 1.1,
                }}
              >
                {navItem.text}
              </MotionLink>
            ))}
          </div>
        </div>
      </header>
    </MotionConfig>
  );
}
