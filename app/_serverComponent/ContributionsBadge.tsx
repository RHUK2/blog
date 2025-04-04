'use client';

import { twJoin, twMerge } from 'tailwind-merge';

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
    <div
      className={twMerge(
        twJoin([
          'flex w-min items-center gap-1 rounded-xl border border-gray-400 bg-gradient-to-br from-gray-50 to-gray-100 px-2 py-1',
          'text-xs font-medium whitespace-nowrap',
          'dark:border-gray-700 dark:from-gray-900 dark:to-gray-800',
          getColor(contribution),
        ]),
      )}
    >
      <p>{`기여도 ${contribution}%`}</p>
    </div>
  );
}
