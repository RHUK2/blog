import { TreeBox } from './_clientComponent';
import { careerList, projectList, skillList } from './_data';
import { CareerContentItem, CategoryBox, IconBadge, Profile, ProjectContentItem } from './_serverComponent';

export default function RootPage() {
  return (
    <main className='m-auto min-h-full max-w-[1024px] min-w-[320px] border-x border-x-gray-300 bg-white pt-12 dark:border-x-gray-800 dark:bg-gray-950'>
      <section className='m-auto flex max-w-[768px] min-w-[320px] flex-col gap-12 px-4 py-10'>
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
