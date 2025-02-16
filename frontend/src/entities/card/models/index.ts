import type { Team } from '@/entities/team/models';
import type { User } from '@/entities/user/models';

export interface ICard {
  id: string;
  title: string;
  status: CardStatus;
  skills: string[];
  about: string;
  author: User;
  team: Team | null;
  isOwner: boolean;
  isFavorite: boolean;
}

export interface ICardCreate {
  title: string;
  skills: string[];
  about: string;
  teamId?: string;
  authorId?: string;
}

export enum CardStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
