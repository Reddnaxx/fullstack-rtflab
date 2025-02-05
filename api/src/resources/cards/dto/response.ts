import { ApiProperty } from '@nestjs/swagger';
import { Card, Status } from '@prisma/client';
import { TeamDto } from 'src/resources/teams/dto';
import { UserDto } from 'src/resources/users/dto';

export class CardsItemResponseDto
  implements Omit<Card, 'updatedAt' | 'createdAt' | 'authorId' | 'teamId'>
{
  @ApiProperty()
  id: string;
  @ApiProperty({ enum: Status, default: Status.ACTIVE })
  status: Status;
  @ApiProperty()
  title: string;
  @ApiProperty({ isArray: true, type: 'string' })
  skills: string[];
  @ApiProperty()
  about: string;
  @ApiProperty()
  author: UserDto;
  @ApiProperty({ required: false })
  team?: TeamDto;
  @ApiProperty()
  isOwner: boolean;
  @ApiProperty()
  isFavorite: boolean;
}
