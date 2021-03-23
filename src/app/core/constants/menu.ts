import { MenuItem } from '../models/menu-item.model';

export const getNavMenuItems = (): MenuItem[] => {
  return [
    new MenuItem({
      name: 'Dashboard',
      link: '',
      icon: 'table_chart'
    }),
    new MenuItem({
      name: 'Workers',
      link: 'workers',
      icon: 'people_outline'
    }),
    new MenuItem({
      name: 'Charts',
      link: 'charts',
      icon: 'show_chart'
    }),
    new MenuItem({
      name: 'Calendar',
      link: 'calendar',
      icon: 'calendar_today'
    }),
    new MenuItem({
      name: 'Settings',
      link: 'settings',
      icon: 'settings'
    })
  ];
};
