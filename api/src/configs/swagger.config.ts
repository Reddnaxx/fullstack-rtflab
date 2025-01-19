import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('React RTFLabs API')
  .setVersion('0.1')
  .build();
