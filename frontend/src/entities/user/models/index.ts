import type { Tag } from '@/entities/tags/models';

export interface UserInfo {
  name: string;
  avatar: string;
  about: string;
  tags: Tag[];
  skills: Tag[];
}

export interface User {
  id: number;
  email: string;
  info: UserInfo;
}
