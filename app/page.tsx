import { CareerContentItem, Profile, ProjectContentItem, careerList, projectList } from '@/entities/profile';
import { CategoryBox, Divider, Leaf, Tree } from '@/shared/ui';

export default function RootPage() {
  return (
    <main className='bg-background m-auto min-h-full max-w-3xl min-w-xs pt-12'>
      <section className='flex flex-col gap-12 px-4 py-10'>
        <Profile />

        <Divider />

        <CategoryBox category='경력 • 프로젝트'>
          {careerList.map((career) => (
            <Tree key={career.id}>
              <CareerContentItem data={career} />
              {career.projectList.map((project) => (
                <Leaf top={14} key={project.id}>
                  <ProjectContentItem data={project} />
                </Leaf>
              ))}
            </Tree>
          ))}
        </CategoryBox>

        <CategoryBox category='개인 프로젝트'>
          {projectList.map((project) => (
            <ProjectContentItem key={project.id} data={project} />
          ))}
        </CategoryBox>
      </section>
    </main>
  );
}
