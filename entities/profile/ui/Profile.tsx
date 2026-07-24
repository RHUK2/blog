'use client';

import { Badge, SvgrIcon } from '@/shared/ui';
import Image from 'next/image';
import Link from 'next/link';

export function Profile() {
  return (
    <div className='flex flex-col items-center gap-4 text-center'>
      <Image
        alt='profile'
        src='/profile.webp'
        width={354}
        height={472}
        className='aspect-square w-40 rounded-[1rem_50%_50%_50%] object-cover md:w-48'
      />

      <div className='flex items-center gap-2'>
        <p className='text-xl'>류현욱</p>
        <Badge asChild>
          <Link href='https://github.com/RHUK2' target='_blank'>
            <SvgrIcon icon='GithubIconLight' className='dark:hidden' />
            <SvgrIcon icon='GithubIconDark' className='hidden dark:block' />
          </Link>
        </Badge>
      </div>

      <p className='text-muted-foreground'>프론트엔드 개발자</p>
    </div>
  );
}
