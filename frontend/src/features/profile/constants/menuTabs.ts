import { LogoutAction } from '@/features/auth/store/actions';
import { store } from '@/shared/lib/store';

import type { ProfileMenuTab } from '../models';

export const profileMenuTabs: ProfileMenuTab[] = [
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
      store.dispatch(LogoutAction());
    },
  },
];
