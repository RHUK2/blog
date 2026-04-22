import { iconMap } from '@/shared/config/icons';

interface Props {
  icon: keyof typeof iconMap;
}

export function SvgrIcon({ icon }: Props) {
  const Component = iconMap[icon];

  return <Component className='h-4 w-4 fill-black dark:fill-white' />;
}
