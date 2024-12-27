import { IProfileTab } from '../interfaces';

export const profileTabs: IProfileTab[] = [
	{
		title: 'Мои карточки',
		route: '/profile/cards'
	},
	{
		title: 'Настройки',
		route: '/profile'
	},
	{
		title: 'Выйти',
		onClick: () => {
			console.log('exit');
		}
	}
]