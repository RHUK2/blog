export interface INav {
  id: string;
  href: string;
  text: string;
}

export type TNavList = INav[];

export interface ICareer {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  projectList: TProjectList;
}

export type TCareerList = ICareer[];

export interface IExperience {
  id: string;
  behavior: string;
  result: string;
}

export type TExperienceList = IExperience[];

export interface IProject {
  id: string;
  title: string;
  contributions: number;
  startDate: string;
  endDate: string;
  description: string;
  skillList: TSkillList;
  experienceList: TExperienceList;
}

export type TProjectList = IProject[];

export type TIcon =
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

export interface ISkill {
  id: string;
  icon: TIcon;
  text: string;
}

export type TSkillList = ISkill[];
