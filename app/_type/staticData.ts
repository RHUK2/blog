export interface INav {
  href: string;
  text: string;
}

export type TNavList = INav[];

export interface IProject {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  experienceList: string[];
}

export type TProjectList = IProject[];
