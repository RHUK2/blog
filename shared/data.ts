import { v4 } from 'uuid';
import { NavList } from './types';

export const navList: NavList = [
  {
    id: v4(),
    href: '/markdown',
    text: 'NOTE',
  },
  {
    id: v4(),
    href: '/llm',
    text: 'LLM',
  },
];
