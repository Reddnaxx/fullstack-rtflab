import { LogoutAction } from '@/features/auth/store/actions';
import { store } from '@/shared/lib/store';

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
      store.dispatch(LogoutAction());
    },
  },
];
