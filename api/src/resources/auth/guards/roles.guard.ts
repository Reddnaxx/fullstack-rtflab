import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';

import { ROLES_KEY } from '../decorators';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const {
      user: { roles: userRoles, sub: userId },
    } = context.switchToHttp().getRequest();

    const requireUserAccess = requiredRoles.includes('USER');
    const hasUserAccess = request.params?.id === userId;

    if (userRoles?.includes('ADMIN')) {
      return true;
    }

    if (requireUserAccess && !hasUserAccess) {
      throw new UnauthorizedException('You can only access your own resources');
    }

    const authorized = requiredRoles.some(role => userRoles?.includes(role));
    if (!authorized) {
      if (requiredRoles.includes('ADMIN')) {
        throw new UnauthorizedException('Only admins can access this resource');
      }

      throw new UnauthorizedException();
    }

    return true;
  }
}
