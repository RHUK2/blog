import { IProject } from '@/_type';

interface Props {
  data: IProject;
}

export function ProjectContentItem({ data }: Props) {
  return (
    <li className='flex flex-col gap-4'>
      <div className='flex flex-col gap-1'>
        <p className='text-xl'>{data.title}</p>
        <p className='text-gray-500 dark:text-gray-400'>{`${data.startDate} - ${data.endDate}`}</p>
        <p>{data.description}</p>
      </div>

      <p>경험</p>
      <ul>
        {data.experienceList.map((experience) => (
          <li key={experience}>{experience}</li>
        ))}
      </ul>
    </li>
  );
}
