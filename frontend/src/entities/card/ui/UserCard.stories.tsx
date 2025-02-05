import { CardStatus } from '../models';
import { UserCard } from './UserCard';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'entities/Card/UserCard',
  component: UserCard,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
  tags: ['card', 'autodocs'],
} satisfies Meta<typeof UserCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 1,
    status: CardStatus.ACTIVE,
    title: 'Frontend-разработчик',
    skills: ['React', 'Frontend', 'Next.js'],
    about:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus aut fuga fugit eos dolores quod, ut, deserunt, vel repellendus tempora soluta quas ad delectus adipisci.',
    author: {
      id: 'cm645kmx60000wv38d3gi09e6',
      name: 'Рукавишников Александр Сергеевич',
      avatar:
        'http://localhost:8000/uploads/1bdb2543952ee07fd2d5169acdfd8296.png',
      telegram: '@Reddnax',
      about: 'Я крутой фронтендер!!!!',
      skills: [
        'React',
        'Адаптивная вёрстка',
        'Кроссбраузерная вёрстка',
        'Next.js',
        'Angular',
        'Docker',
        'Nginx',
        'CI/CD',
        'Git',
        'TypeScript',
      ],
      email: 'user@example.com',
      roles: ['USER'],
    },
    team: null,
    isOwner: false,
    isFavorite: false,
  },
};

export const Owner: Story = {
  args: {
    id: 1,
    status: CardStatus.ACTIVE,
    title: 'Frontend-разработчик',
    skills: ['React', 'Frontend', 'Next.js'],
    about:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus aut fuga fugit eos dolores quod, ut, deserunt, vel repellendus tempora soluta quas ad delectus adipisci.',
    author: {
      id: 'cm645kmx60000wv38d3gi09e6',
      name: 'Рукавишников Александр Сергеевич',
      avatar:
        'http://localhost:8000/uploads/1bdb2543952ee07fd2d5169acdfd8296.png',
      telegram: '@Reddnax',
      about: 'Я крутой фронтендер!!!!',
      skills: [
        'React',
        'Адаптивная вёрстка',
        'Кроссбраузерная вёрстка',
        'Next.js',
        'Angular',
        'Docker',
        'Nginx',
        'CI/CD',
        'Git',
        'TypeScript',
      ],
      email: 'user@example.com',
      roles: ['USER'],
    },
    team: null,
    isOwner: true,
    isFavorite: false,
  },
};

export const OwnerAndInactive: Story = {
  args: {
    id: 1,
    status: CardStatus.INACTIVE,
    title: 'Frontend-разработчик',
    skills: ['React', 'Frontend', 'Next.js'],
    about:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus aut fuga fugit eos dolores quod, ut, deserunt, vel repellendus tempora soluta quas ad delectus adipisci.',
    author: {
      id: 'cm645kmx60000wv38d3gi09e6',
      name: 'Рукавишников Александр Сергеевич',
      avatar:
        'http://localhost:8000/uploads/1bdb2543952ee07fd2d5169acdfd8296.png',
      telegram: '@Reddnax',
      about: 'Я крутой фронтендер!!!!',
      skills: [
        'React',
        'Адаптивная вёрстка',
        'Кроссбраузерная вёрстка',
        'Next.js',
        'Angular',
        'Docker',
        'Nginx',
        'CI/CD',
        'Git',
        'TypeScript',
      ],
      email: 'user@example.com',
      roles: ['USER'],
    },
    team: null,
    isOwner: true,
    isFavorite: false,
  },
};
