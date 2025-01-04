import type { IconName } from '@/shared/ui';

export interface IProfileTab {
  title: string;
  icon?: IconName;
  route?: string;
  onClick?(): void;
}
