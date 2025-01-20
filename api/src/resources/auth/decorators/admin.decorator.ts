import { applyDecorators } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RolesAccess } from './roles.decorator';

export const AdminAccess = () =>
  applyDecorators(RolesAccess('ADMIN'), ApiTags('Admin access'));
