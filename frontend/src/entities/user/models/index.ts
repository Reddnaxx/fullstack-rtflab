export interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
  telegram?: string;
  about?: string;
  skills?: string[];
  avatar?: string;
}
