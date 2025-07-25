'use client';

import { Badge } from '@/shared/components';

interface Props {
  contribution: number;
}

export function ContributionsBadge({ contribution }: Props) {
  if (contribution === 0) return null;

  function getColor(contribution: number) {
    if (contribution >= 80) return 'text-green-600 dark:text-green-500';
    if (contribution >= 60) return 'text-yellow-600 dark:text-yellow-500';
    if (contribution >= 40) return 'text-orange-600 dark:text-orange-500';
    if (contribution >= 20) return 'text-red-600 dark:text-red-500';
    return 'text-gray-600 dark:text-gray-500';
  }

  return (
    <Badge>
      <p className={`${getColor(contribution)} `}>{`기여도 ${contribution}%`}</p>
    </Badge>
  );
}
