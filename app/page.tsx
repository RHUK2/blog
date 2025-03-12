import { projectList } from './_data';
import { CareerContentItem, CategoryBox, ProjectContentItem } from './_serverComponent';

export default function RootPage() {
  return (
    <main className='m-auto min-h-full max-w-[1024px] min-w-[320px] border-x border-x-gray-300 bg-white pt-12 dark:border-x-gray-800 dark:bg-gray-950'>
      <section className='m-auto flex max-w-[768px] min-w-[320px] flex-col gap-12 px-4 py-10'>
        <CategoryBox category='경력'>
          <CareerContentItem />
        </CategoryBox>

        <CategoryBox category='프로젝트'>
          {projectList.map((project) => (
            <ProjectContentItem key={project.title} data={project} />
          ))}
        </CategoryBox>

        <CategoryBox category='학력'>
          <CareerContentItem />
        </CategoryBox>

        <CategoryBox category='자기소개'>
          <CareerContentItem />
        </CategoryBox>
      </section>
    </main>
  );
}
