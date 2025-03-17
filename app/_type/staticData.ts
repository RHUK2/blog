import React from 'react';

export interface INav {
  href: string;
  text: string;
}

export type TNavList = INav[];

export interface ICareer {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  projectList: TProjectList;
}

export type TCareerList = ICareer[];

export interface IProject {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  skillList: TSkillList;
  experienceList: string[];
}

export type TProjectList = IProject[];

export interface ISkill {
  icon: React.ReactNode;
  text: string;
}

export type TSkillList = ISkill[];
