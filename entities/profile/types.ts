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

export type Icon =
  | 'AwsIcon'
  | 'GithubIcon'
  | 'JavascriptIcon'
  | 'MuiIcon'
  | 'NextjsIcon'
  | 'ReactIcon'
  | 'ReacthookformIcon'
  | 'ReactqueryIcon'
  | 'TailwindcssIcon'
  | 'TypescriptIcon';

export interface Skill {
  id: string;
  icon: Icon;
  text: string;
}

export type SkillList = Skill[];
