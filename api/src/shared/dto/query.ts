import { ApiProperty } from '@nestjs/swagger';

export class QueryListAllEntities {
  @ApiProperty({ required: false, default: 10 })
  take: string = '10';
  @ApiProperty({ required: false, default: 0 })
  skip: string = '0';
}
