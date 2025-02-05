import { ApiProperty } from '@nestjs/swagger';
import { Team } from '@prisma/client';
import { CardDto } from 'src/resources/cards/dto';
import { UserDto } from 'src/resources/users/dto';

export class TeamDto implements Omit<Team, 'createdAt' | 'updatedAt'> {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty({ type: UserDto, isArray: true })
  members: UserDto[];
  @ApiProperty({ type: CardDto, isArray: true })
  cards: CardDto[];
}

export class TeamFullDto implements Team {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty({ type: UserDto, isArray: true })
  members: UserDto[];
  @ApiProperty({ type: CardDto, isArray: true })
  cards: CardDto[];
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
