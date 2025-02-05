import type { ICard } from '@/entities/card/models';
import type { User } from '@/entities/user/models';

export interface Team {
  id: string;
  name: string;
  members: User[];
  cards: ICard[];
}
