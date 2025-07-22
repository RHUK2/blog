'use client';

import AwsIcon from '@/public/aws.svg';
import GithubIcon from '@/public/github.svg';
import JavascriptIcon from '@/public/javascript.svg';
import MuiIcon from '@/public/mui.svg';
import NextjsIcon from '@/public/nextjs.svg';
import ReactIcon from '@/public/react.svg';
import ReacthookformIcon from '@/public/reacthookform.svg';
import ReactqueryIcon from '@/public/reactquery.svg';
import TailwindcssIcon from '@/public/tailwindcss.svg';
import TypescriptIcon from '@/public/typescript.svg';
import Link from 'next/link';
import { twJoin, twMerge } from 'tailwind-merge';
import { Icon } from '../types';

const iconLookup = {
  AwsIcon: AwsIcon,
  GithubIcon: GithubIcon,
  JavascriptIcon: JavascriptIcon,
  MuiIcon: MuiIcon,
  NextjsIcon: NextjsIcon,
  ReactIcon: ReactIcon,
  ReacthookformIcon: ReacthookformIcon,
  ReactqueryIcon: ReactqueryIcon,
  TailwindcssIcon: TailwindcssIcon,
  TypescriptIcon: TypescriptIcon,
};

interface Props {
  href?: string;
  icon: Icon;
  text?: string;
}

export function IconBadge({ href, icon, text }: Props) {
  const Icon = iconLookup[icon];

  return href ? (
    <Link
      className={twMerge(
        twJoin([
          'flex w-min items-center gap-1 rounded-xl border border-gray-400 bg-gradient-to-br from-gray-50 to-gray-100 px-2 py-1',
          'text-xs font-medium whitespace-nowrap',
          'dark:border-gray-700 dark:from-gray-900 dark:to-gray-800',
        ]),
      )}
      href={href}
      target='_blank'
    >
      <Icon className='h-4 w-4 fill-black dark:fill-white' />
      {text && <p>{text}</p>}
    </Link>
  ) : (
    <div
      className={twMerge(
        twJoin([
          'flex w-min items-center gap-1 rounded-xl border border-gray-400 bg-gradient-to-br from-gray-50 to-gray-100 px-2 py-1',
          'text-xs font-medium whitespace-nowrap',
          'dark:border-gray-700 dark:from-gray-900 dark:to-gray-800',
        ]),
      )}
    >
      <Icon className='h-4 w-4 fill-black dark:fill-white' />
      {text && <p>{text}</p>}
    </div>
  );
}
