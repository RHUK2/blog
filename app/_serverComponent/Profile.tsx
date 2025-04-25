import Image from 'next/image';
import { IconBadge } from './IconBadge';

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
          <IconBadge href='https://github.com/RHUK2' icon='GithubIcon' />
        </div>

        <p>
          신중하고 꼼꼼한 성격을 바탕으로 요구사항을 깊이 이해하고 최적의 솔루션을 제공하는 데 집중해왔습니다. 팀의
          목표를 최우선으로 고려하며, 어려운 상황에서도 유연하게 대안을 모색해 문제를 해결합니다. 의견을 적극적으로
          공유하지만, 협업의 조화를 위해 강요보다는 설득을 중시합니다. 항상 배우고 성장하려는 자세로 새로운 기술과
          도전에 열린 마음을 유지하며, 안정적이고 사용자 중심의 결과물을 만들어내는 개발자입니다.
        </p>
      </div>
    </div>
  );
}
