export default function RootPage() {
  return (
    <main className='m-auto min-h-full max-w-[1024px] min-w-[320px] border-x border-x-gray-300 bg-white pt-12 dark:border-x-gray-800 dark:bg-gray-950'>
      <section className='m-auto flex max-w-[768px] min-w-[320px] flex-col gap-12 px-4 py-10'>
        <div className='flex gap-2'>
          <p className='flex-[1_0_0] whitespace-nowrap'>경력</p>
          <div className={'flex-[4_0_0]'}>
            <p>(주)위크루트</p>
            <p>2021.10. - 2025.03.(4년 • 정규직)</p>
            <p>
              안녕하세요! 저는 프론트엔드 개발자 류현욱입니다. 항상 새로운 기술과 트렌드에 대한 호기심을 가지고 발전해
              나가고자 노력하고 있습니다. 저는 팀워크를 중요하게 생각하며, 특히 회의에서 서로의 의견이 잘 통합될 수
              있도록 항상 신중하게 대화에 참여합니다. 동상이몽이 되지 않도록 서로의 생각을 존중하고, 열린 마음으로
              다양한 관점을 받아들이는 데 중점을 두고 있습니다. 협업을 통해 더 나은 결과물을 만들어내는 것이 저의
              목표입니다. 또한, 생각의 유연성을 잃지 않으려 노력합니다. 기술적인 도전과 문제 해결에 있어서는 언제나 여러
              가지 접근 방식을 고려하려고 노력합니다. 실패는 항상 고통스럽지만, 거기서 배우며 성장하는 것이 중요하다고
              믿고 있습니다.
            </p>
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <div className='flex gap-2'>
            <p className='flex-[1_0_0] whitespace-nowrap'>프로젝트</p>
            <div className={'flex-[4_0_0]'}>
              <p>랜딩페이지 개발</p>
              <p>(주)위크루트</p>
              <p>2021.10. - 2025.03.(4년 • 정규직)</p>
              <p>회사 서비스 랜딩페이지</p>
              <ul>
                <li>반응형 개발</li>
                <li>SEO, 웹 접근성 고려</li>
                <li>Nextjs Page Router ISR 방식 적용</li>
                <li>framermotion을 이용한 애니메이션 적용</li>
                <li>s3에 업로드된 정적 자산을 활용한 페이지 개발</li>
              </ul>
            </div>
          </div>

          <div className='flex gap-2'>
            <p className='flex-[1_0_0] whitespace-nowrap'>프로젝트</p>
            <div className={'flex-[4_0_0]'}>
              <p>랜딩페이지 개발</p>
              <p>(주)위크루트</p>
              <p>2021.10. - 2025.03.(4년 • 정규직)</p>
              <p>회사 서비스 랜딩페이지</p>
              <ul>
                <li>반응형 개발</li>
                <li>SEO, 웹 접근성 고려</li>
                <li>Nextjs Page Router ISR 방식 적용</li>
                <li>framermotion을 이용한 애니메이션 적용</li>
                <li>s3에 업로드된 정적 자산을 활용한 페이지 개발</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
