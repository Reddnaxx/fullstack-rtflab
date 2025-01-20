import { applyDecorators, SetMetadata } from '@nestjs/common';
import type { Role } from '@prisma/client';

import { PrivateAccess } from './private.decorator';

export const ROLES_KEY = 'roles';
export const RolesAccess = (...roles: Role[]) =>
  applyDecorators(SetMetadata(ROLES_KEY, roles), PrivateAccess());
