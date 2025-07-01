import { ICareer } from '@/data/static/types';

interface Props {
  data: ICareer;
}

export function CareerContentItem({ data }: Props) {
  return (
    <li className='flex flex-[4_0_0] flex-col gap-1'>
      <p className='text-2xl'>{data.company}</p>
      <p className='text-gray-500 dark:text-gray-400'>{`${data.role} | ${data.startDate} - ${data.endDate}`}</p>
      <p className='text-gray-700 dark:text-gray-300'>{data.description}</p>
    </li>
  );
}
