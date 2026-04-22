'use client';

import { Project } from '../model/types';
import { Accordion, AccordionContent, AccordionTrigger, Badge, SvgrIcon } from '@/shared/ui';
import { motion } from 'motion/react';
import { ContributionsBadge } from './ContributionsBadge';

interface Props {
  data: Project;
}

export function ProjectContentItem({ data }: Props) {
  return (
    <motion.li
      whileInView={{ opacity: 1, x: 0 }}
      animate={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className='flex flex-col gap-4'
    >
      <div className='flex flex-col gap-1'>
        <div className='flex items-center gap-2'>
          <p className='text-xl'>{data.title}</p>
          <ContributionsBadge contribution={data.contributions} />
        </div>
        <p className='text-gray-500 dark:text-gray-400'>{`${data.startDate} - ${data.endDate}`}</p>
        <p className='text-gray-700 dark:text-gray-300'>{data.description}</p>
      </div>

      <div className='flex flex-wrap gap-2'>
        {data.skillList.map((skill) => (
          <Badge key={skill.id}>
            <SvgrIcon icon={skill.icon} />
            <p>{skill.text}</p>
          </Badge>
        ))}
      </div>

      <Accordion>
        <AccordionTrigger icon={'🔎'}>경험 살펴보기</AccordionTrigger>
        <AccordionContent as='ul'>
          {data.experienceList.map((item) => (
            <li className='pb-2' key={item.behavior}>
              <p>{`• ${item.behavior}`}</p>
              {item.result && <p className='pl-2 text-gray-600 dark:text-gray-400'>{`→ ${item.result}`}</p>}
            </li>
          ))}
        </AccordionContent>
      </Accordion>
    </motion.li>
  );
}
