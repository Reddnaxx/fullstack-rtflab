import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';

@Injectable()
export class UtilsService {
  private readonly saltOrRounds: number = 10;

  async encrypt(value: string) {
    return bcrypt.hash(value, this.saltOrRounds);
  }

  async compareHash(value: string, hash: string) {
    return bcrypt.compare(value, hash);
  }

  getBaseUrl = (req: Request): string => {
    const protocol = req.protocol;
    const host = req.get('host');
    return `${protocol}://${host}`;
  };
}
