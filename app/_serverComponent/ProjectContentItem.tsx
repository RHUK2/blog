import { IProject } from '@/_type';
import { IcondBadge } from './IconBadge';
import { Accordion } from '@/_clientComponent';

interface Props {
  data: IProject;
}

export function ProjectContentItem({ data }: Props) {
  return (
    <li className='flex flex-col gap-4'>
      <div className='flex flex-col gap-1'>
        <p className='text-xl'>{data.title}</p>
        <p className='text-gray-500 dark:text-gray-400'>{`${data.startDate} - ${data.endDate}`}</p>
        <p className='text-gray-700 dark:text-gray-300'>{data.description}</p>
      </div>

      <div className='flex flex-wrap gap-2'>
        {data.skillList.map((skill) => (
          <IcondBadge key={skill.text} icon={skill.icon} text={skill.text} />
        ))}
      </div>

      <Accordion title='경험 살펴보기' list={data.experienceList} />
    </li>
  );
}
