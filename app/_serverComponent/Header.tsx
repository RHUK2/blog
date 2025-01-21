'use client';

import { DarkLightButton } from '@/_clientComponent';
import { navList } from '@/_data';
import { motion } from 'motion/react';
import Link from 'next/link';

export function Header() {
  const MotionLink = motion.create(Link);

  return (
    <header className='fixed z-50 w-full border-b border-b-gray-300 bg-white dark:border-b-gray-800 dark:bg-gray-950'>
      <div className='m-auto flex h-12 w-full min-w-[320px] max-w-[1024px] items-center justify-between px-5 text-lg tracking-tighter'>
        <MotionLink
          href='/'
          className='font-bold'
          whileHover={{
            scale: 1.1,
          }}
          whileFocus={{
            scale: 1.1,
          }}
          whileTap={{
            scale: 0.9,
          }}
          transition={{
            type: 'spring',
          }}
        >
          RHUK2
        </MotionLink>

        <div className='flex items-center gap-4'>
          <DarkLightButton />
          {navList.map((navItem) => (
            <MotionLink
              key={navItem.href}
              href={navItem.href}
              whileHover={{
                scale: 1.1,
              }}
              whileFocus={{
                scale: 1.1,
              }}
              whileTap={{
                scale: 0.9,
              }}
              transition={{
                type: 'spring',
              }}
            >
              {navItem.text}
            </MotionLink>
          ))}
        </div>
      </div>
    </header>
  );
}
