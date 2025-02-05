import { SetMetadata } from '@nestjs/common';

export const WITH_USER_KEY = 'withUser';
export const WithUser = () => SetMetadata(WITH_USER_KEY, true);
