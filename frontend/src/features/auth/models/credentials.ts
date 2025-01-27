export interface Credentials {
  email: string;
  password: string;
}

export type LoginData = Credentials;

export type RegisterData = Credentials & {
  name: string;
};
