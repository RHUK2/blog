import Image from 'next/image';

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
        />
      </div>

      <div className='min-w-2xs flex-[4_0_0]'>
        <p>류현욱</p>
        <p>기술스택</p>
        <p>Next.js • Typescript</p>
        <p>깃허브</p>
        <p>블로그</p>
        <p></p>
        <p>
          3년차 웹 프론트엔드 개발자로, 사용자 경험을 최우선으로 고려한 반응형 웹 애플리케이션 개발에 강점을 가지고
          있습니다. React와 TypeScript를 활용한 프로젝트 경험을 통해 성능 최적화와 유지보수성을 높이는 데
          주력해왔습니다. 협업과 커뮤니케이션 능력을 바탕으로 팀 내에서 프론트엔드 개발 프로세스를 개선하며
          기여했습니다.
        </p>
      </div>
    </div>
  );
}
