import { projectList } from './_data';
import { CareerContentItem, CategoryBox, Profile, ProjectContentItem } from './_serverComponent';

export default function RootPage() {
  return (
    <main className='m-auto min-h-full max-w-[1024px] min-w-[320px] border-x border-x-gray-300 bg-white pt-12 dark:border-x-gray-800 dark:bg-gray-950'>
      <section className='m-auto flex max-w-[768px] min-w-[320px] flex-col gap-12 px-4 py-10'>
        <Profile />

        <CategoryBox category='기술 스택'></CategoryBox>

        <CategoryBox category='경력 • 프로젝트'>
          <CareerContentItem />
          {projectList.map((project) => (
            <ProjectContentItem key={project.title} data={project} />
          ))}
        </CategoryBox>

        <CategoryBox category='개인 프로젝트'></CategoryBox>

        <CategoryBox category='학력'></CategoryBox>
      </section>
    </main>
  );
}
