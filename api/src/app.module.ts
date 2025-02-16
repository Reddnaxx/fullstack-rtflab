import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AuthModule } from './resources/auth/auth.module';
import { CardsModule } from './resources/cards/cards.module';
import { TeamsModule } from './resources/teams/teams.module';
import { UsersModule } from './resources/users/users.module';

@Module({
  imports: [AuthModule, UsersModule, CardsModule, TeamsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
