export const jwtConfig = {
  accessTokenExpiresIn: '1d',
  refreshTokenExpiresIn: '7d',

  convertTable: {
    d: 60 * 60 * 24 * 1000,
    h: 60 * 60 * 1000,
    m: 60 * 1000,
    s: 1000,
  },
};
