import { iconMap } from '@/shared/components/SvgrIcon';

export interface Career {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  projectList: ProjectList;
}

export type CareerList = Career[];

export interface Experience {
  id: string;
  behavior: string;
  result: string;
}

export type ExperienceList = Experience[];

export interface Project {
  id: string;
  title: string;
  contributions: number;
  startDate: string;
  endDate: string;
  description: string;
  skillList: SkillList;
  experienceList: ExperienceList;
}

export type ProjectList = Project[];

export interface Skill {
  id: string;
  icon: keyof typeof iconMap;
  text: string;
}

export type SkillList = Skill[];
