import { Module } from '@nestjs/common';

import { AuthModule } from './resources/auth/auth.module';
import { CardsModule } from './resources/cards/cards.module';
import { UsersModule } from './resources/users/users.module';
import { TeamsModule } from './resources/teams/teams.module';

@Module({
  imports: [AuthModule, UsersModule, CardsModule, TeamsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
