import type { IProfileTab } from '../models';

export const profileTabs: IProfileTab[] = [
  {
    title: 'Мои карточки',
    route: '/profile/cards',
    icon: 'cards',
  },
  {
    title: 'Настройки',
    route: '/profile',
    icon: 'settings',
  },
  {
    title: 'Выйти',
    icon: 'exit',
    onClick: () => {
      console.log('exit');
    },
  },
];
