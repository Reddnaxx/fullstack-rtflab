declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT: string;
      JWT_SECRET_KEY: string;
      JWT_ACCESS_EXPIRE_MINUTES: string;
      JWT_REFRESH_EXPIRE_HOURS: string;
    }
  }
}

export {};
