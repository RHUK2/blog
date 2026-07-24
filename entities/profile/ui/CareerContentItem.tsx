import { Career } from '../model/types';

interface Props {
  data: Career;
}

export function CareerContentItem({ data }: Props) {
  return (
    <li className='flex flex-[4_0_0] flex-col gap-1'>
      <p className='text-2xl'>{data.company}</p>
      <p className='text-muted-foreground'>{`${data.role} | ${data.startDate} - ${data.endDate}`}</p>
      <p className='text-muted-foreground'>{data.description}</p>
    </li>
  );
}
