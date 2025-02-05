import { applyDecorators, SetMetadata } from '@nestjs/common';
import type { Role } from '@prisma/client';

import { PrivateAccess } from './private.decorator';

export const ROLES_KEY = 'roles';
export const CHECK_FIELD_KEY = 'checkField';

export function RolesAccess(roles: Role[]): MethodDecorator;
export function RolesAccess(checkField: string, roles: Role[]): MethodDecorator;
export function RolesAccess(
  checkFieldOrRoles: string | Role[],
  roles?: Role[]
) {
  if (Array.isArray(checkFieldOrRoles)) {
    return applyDecorators(
      SetMetadata(ROLES_KEY, checkFieldOrRoles),
      PrivateAccess()
    );
  }
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    SetMetadata(CHECK_FIELD_KEY, checkFieldOrRoles),
    PrivateAccess()
  );
}
