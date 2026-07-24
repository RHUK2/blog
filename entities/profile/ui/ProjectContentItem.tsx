'use client';

import { Project } from '../model/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Badge, SvgrIcon } from '@/shared/ui';
import { MotionConfig, motion } from 'motion/react';
import { ContributionsBadge } from './ContributionsBadge';

const iconVariants = {
  hidden: { x: -10, opacity: 0, width: 0 },
  visible: { x: 0, opacity: 1, width: 26 },
};

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
        <p className='text-muted-foreground'>{`${data.startDate} - ${data.endDate}`}</p>
        <p className='text-muted-foreground'>{data.description}</p>
      </div>

      <div className='flex flex-wrap gap-2'>
        {data.skillList.map((skill) => (
          <Badge key={skill.id}>
            <SvgrIcon icon={skill.icon} />
            <p>{skill.text}</p>
          </Badge>
        ))}
      </div>

      <Accordion type='single' collapsible>
        <AccordionItem value='experience'>
          <AccordionTrigger>
            <MotionConfig transition={{ duration: 0.2 }}>
              <motion.span
                initial='hidden'
                whileHover='visible'
                className='flex flex-1 items-center gap-1 overflow-hidden'
              >
                <motion.span variants={iconVariants}>🔎</motion.span>
                경험 살펴보기
              </motion.span>
            </MotionConfig>
          </AccordionTrigger>
          <AccordionContent>
            <ul>
              {data.experienceList.map((item) => (
                <li className='pb-2' key={item.behavior}>
                  <p>{`• ${item.behavior}`}</p>
                  {item.result && <p className='text-muted-foreground pl-2'>{`→ ${item.result}`}</p>}
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.li>
  );
}
