import { IProject } from '@/_type';
import { IconBadge } from './IconBadge';
import { Accordion } from '@/_clientComponent';
import { ContributionsBadge } from './ContributionsBadge';

interface Props {
  data: IProject;
}

export function ProjectContentItem({ data }: Props) {
  return (
    <li className='flex flex-col gap-4'>
      <div className='flex flex-col gap-1'>
        <div className='flex items-center gap-2'>
          <p className='text-xl'>{data.title}</p>
          <ContributionsBadge contribution={data.contributions} />
        </div>
        <p className='text-gray-500 dark:text-gray-400'>{`${data.startDate} - ${data.endDate}`}</p>
        <p className='text-gray-700 dark:text-gray-300'>{data.description}</p>
      </div>

      <div className='flex flex-wrap gap-2'>
        {data.skillList.map((skill) => (
          <IconBadge key={skill.id} icon={skill.icon} text={skill.text} />
        ))}
      </div>

      <Accordion title='경험 살펴보기' list={data.experienceList} />
    </li>
  );
}
