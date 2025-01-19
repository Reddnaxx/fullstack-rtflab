import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UtilsService {
  private readonly saltOrRounds: number = 10;

  async encrypt(value: string) {
    return bcrypt.hash(value, this.saltOrRounds);
  }

  async compareHash(value: string, hash: string) {
    return bcrypt.compare(value, hash);
  }
}
