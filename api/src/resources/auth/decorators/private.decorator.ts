import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiCookieAuth } from '@nestjs/swagger';
import { WithUser } from './with-user.decorator';

export const IS_PRIVATE_KEY = 'isPrivate';
export const PrivateAccess = () =>
  applyDecorators(
    SetMetadata(IS_PRIVATE_KEY, true),
    WithUser(),
    ApiCookieAuth()
  );
