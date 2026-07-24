import { v4 } from 'uuid';
import { NavList } from '../model/types';

export const navList: NavList = [
  {
    id: v4(),
    href: '/markdown',
    text: 'NOTE',
  },
];
