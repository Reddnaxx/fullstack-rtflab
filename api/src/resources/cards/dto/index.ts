import { ApiProperty } from '@nestjs/swagger';
import { Card, Prisma, Status } from '@prisma/client';
import { TeamDto } from 'src/resources/teams/dto';
import { UserDto } from 'src/resources/users/dto';

export class CardDto
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
}

type TCardCreateDto = Omit<Prisma.CardUncheckedCreateInput, 'authorId'> & {
  authorId?: string;
};

export class CardCreateDto implements TCardCreateDto {
  @ApiProperty()
  title: string;
  @ApiProperty({ isArray: true, type: 'string' })
  skills: string[];
  @ApiProperty()
  about: string;
  @ApiProperty({ required: false })
  authorId?: string;
  @ApiProperty()
  teamId: string;
}

export class CardUpdateDto implements Prisma.CardUncheckedUpdateInput {
  @ApiProperty({ required: false })
  title?: string;
  @ApiProperty({ required: false, isArray: true, type: 'string' })
  skills?: string[];
  @ApiProperty({ required: false })
  about?: string;
  @ApiProperty({ required: false })
  teamId?: string;
  @ApiProperty({ required: false })
  authorId?: string;
}
