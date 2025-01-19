import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PrismaModule } from '@app/prisma';
import { UtilsModule } from '@app/utils';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    PrismaModule,
    UtilsModule,
    JwtModule.register({ global: true, secret: process.env.JWT_SECRET }),
  ],
})
export class AuthModule {}
