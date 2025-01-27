import type { ProfileTab } from '../models';

export const profileTabs: ProfileTab[] = [
  {
    title: 'Мои карточки',
    route: '/profile/cards',
  },
  {
    title: 'Избранное',
    route: '/profile/favorites',
  },
  {
    title: 'Настройки',
    route: '/profile',
  },
];
