export interface Tokens {
  access: string;
  refresh: string;
}

export interface IJWTService {
  createToken(sub: string, refresh?: boolean): string;
  createTokenPair(sub: string): Tokens;
  refreshToken(token: string): Tokens;
}
