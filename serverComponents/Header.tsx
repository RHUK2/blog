'use client';

import { DarkLightButton } from '@/clientComponents';
import { navList } from '@/data/static/data';
import { motion, MotionConfig } from 'motion/react';
import Link from 'next/link';

export function Header() {
  const MotionLink = motion.create(Link);

  return (
    <MotionConfig
      transition={{
        duration: 0.1,
      }}
    >
      <header className='fixed z-50 w-full border-b border-b-gray-300 bg-white dark:border-b-gray-800 dark:bg-gray-950'>
        <div className='m-auto flex h-12 w-full max-w-[1024px] min-w-[320px] items-center justify-between px-5 text-lg tracking-tighter'>
          <MotionLink
            href='/'
            className='origin-bottom-left leading-none font-bold'
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
            {navList.map((navItem) => (
              <MotionLink
                key={navItem.id}
                href={navItem.href}
                className='origin-bottom-left leading-none'
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
