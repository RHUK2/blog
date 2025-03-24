import Image from 'next/image';
import { IcondBadge } from './IconBadge';

export function Profile() {
  return (
    <div className='flex flex-wrap gap-6'>
      <div className='flex min-w-32 flex-[1_0_0] justify-center'>
        <Image
          alt='profile'
          src='/assets/profile.jpg'
          width={354}
          height={472}
          className='aspect-square self-start rounded-[1rem_50%_50%_50%] object-cover'
          placeholder='blur'
          blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO88h8AAq0B1REmZuEAAAAASUVORK5CYII='
        />
      </div>

      <div className='min-w-2xs flex-[4_0_0]'>
        <div className='mb-4 flex items-center gap-2'>
          <p className='text-xl'>류현욱</p>
          <IcondBadge href='https://github.com/RHUK2' icon='GithubIcon' />
        </div>

        <p>
          TypeScript를 사용해 Next.js 프로젝트에서 타입 안전한 코드를 작성하며, API 통합과 프론트엔드 로직을 매끄럽게
          연결하는 데 강점을 가진 개발자입니다. 사용자 피드백을 반영한 지속적인 개선으로 제품의 가치를 높이는 데
          기여합니다.
        </p>
      </div>
    </div>
  );
}
