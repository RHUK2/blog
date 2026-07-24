import { iconMap } from '@/shared/config/icons';
import { cn } from '@/shared/lib/utils';

interface Props {
  icon: keyof typeof iconMap;
  className?: string;
}

export function SvgrIcon({ icon, className }: Props) {
  const Component = iconMap[icon];

  return <Component className={cn('text-foreground size-4 fill-current', className)} />;
}
