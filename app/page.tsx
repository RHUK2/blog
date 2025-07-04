import { TreeBox } from '@/clientComponents';
import { careerList, projectList, skillList } from '@/data/static/data';
import { CareerContentItem, CategoryBox, IconBadge, Profile, ProjectContentItem } from '@/serverComponents';

export default function RootPage() {
  return (
    <main className='m-auto min-h-full max-w-[768px] min-w-[320px] bg-white pt-12 dark:bg-gray-950'>
      <section className='flex flex-col gap-12 px-4 py-10'>
        <Profile />

        <CategoryBox category='기술 스택'>
          <div className='flex flex-wrap gap-2'>
            {skillList.map((skill) => (
              <IconBadge key={skill.id} icon={skill.icon} text={skill.text} />
            ))}
          </div>
        </CategoryBox>

        <CategoryBox category='경력 • 프로젝트'>
          {careerList.map((career) => (
            <TreeBox key={career.id} parent={<CareerContentItem data={career} />}>
              {career.projectList.map((project) => (
                <ProjectContentItem key={project.id} data={project} />
              ))}
            </TreeBox>
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
