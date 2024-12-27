import { ConfigProps } from './config.interface';

export const config = (): ConfigProps => ({
  port: parseInt(process.env.PORT) || 8000,
  jwt: {
    secret: process.env.JWT_SECRET_KEY,
    accessTokenExpireMinutes: process.env.JWT_ACCESS_EXPIRE_MINUTES,
    refreshTokenExpireHours: process.env.JWT_REFRESH_EXPIRE_HOURS,
  },
});
