import type { IProfileTab } from '../interfaces';

export const profileTabs: IProfileTab[] = [
	{
		title: 'Мои карточки',
		route: '/profile/cards',
		icon: 'cards'
	},
	{
		title: 'Настройки',
		route: '/profile',
		icon: 'settings'
	},
	{
		title: 'Выйти',
		icon: 'exit',
		onClick: () => {
			console.log('exit');
		},
	}
]