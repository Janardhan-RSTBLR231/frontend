import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Fill Check Sheet',
    icon: 'home-outline',
    link: '/pages/fill-check-sheet',
    home: true,
    hidden: false
  },
  {
    title: 'View Check Sheets',
    icon: 'grid',
    link: '/pages/view-check-sheet',
    hidden: true
  },
  {
    title: 'User Management',
    icon: 'people',
    link: '/pages/user-management',
    hidden: true
  },
  {
    title: 'Manage Check Sheets',
    icon: 'file',
    link: '/pages/manage-check-sheets',
    hidden: true
  },
  {
    title: 'Configuration',
    icon: 'settings',
    link: '/pages/configuration',
    hidden: true
  },
  {
    title: 'Settings',
    icon: 'settings-2',
    link: '/pages/settings',
    hidden: true
  }
];
