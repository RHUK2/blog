import { getNavigationList2, readMarkdownMetaDataList } from './_util';

export default function HomePage() {
  const temp = getNavigationList2().then((res) => {
    console.log('🚀 ~ HomePage ~ temp:', res);
  });

  return (
    <section className='m-auto min-w-[320px] max-w-[768px] px-4 py-10'>
      <h1>나를 소개해주세요.</h1>
    </section>
  );
}
