import { ICareer } from '@/_type';

interface Props {
  data: ICareer;
}

export function CareerContentItem({ data }: Props) {
  return (
    <li className='flex flex-[4_0_0] flex-col gap-8'>
      <div className='flex flex-col gap-1'>
        <p className='text-xl'>{data.company}</p>
        <p className='text-gray-500 dark:text-gray-400'>{`${data.role} | ${data.startDate} - ${data.endDate}`}</p>
        <p>{data.description}</p>
      </div>
    </li>
  );
}
