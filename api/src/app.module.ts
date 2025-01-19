import { Module } from '@nestjs/common';

import { AuthModule } from './resources/auth/auth.module';
import { UsersModule } from './resources/users/users.module';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
