export interface JWTConfigProps {
  accessTokenExpireMinutes: string;
  refreshTokenExpireHours: string;
  secret: string;
}

export interface ConfigProps {
  port: number;
  jwt: JWTConfigProps;
}
