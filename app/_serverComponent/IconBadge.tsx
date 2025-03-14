import Link from 'next/link';
import { twJoin, twMerge } from 'tailwind-merge';

interface Props {
  href?: string;
  icon: React.ReactNode;
  text?: string;
}

export function IcondBadge({ href, icon, text }: Props) {
  const className = twMerge(
    twJoin([
      'flex w-min items-center gap-1 rounded-xl border border-gray-400 bg-gradient-to-br from-gray-50 to-gray-100 px-2 py-1',
      'text-xs font-medium whitespace-nowrap',
      'dark:border-gray-700 dark:from-gray-900 dark:to-gray-800',
    ]),
  );

  return href ? (
    <Link className={className} href={href} target='_blank'>
      {icon}
      {text && <p>{text}</p>}
    </Link>
  ) : (
    <div className={className}>
      {icon}
      {text && <p>{text}</p>}
    </div>
  );
}
