import { IProject } from '@/_type';

interface Props {
  data: IProject;
}

export function ProjectContentItem({ data }: Props) {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-1'>
        <p>{data.title}</p>
        <p>{data.company}</p>
        <p>{`${data.startDate} - ${data.endDate}`}</p>
        <p>{data.description}</p>
      </div>
      <ul>
        {data.experienceList.map((experience) => (
          <li key={experience}>{experience}</li>
        ))}
      </ul>
    </div>
  );
}
