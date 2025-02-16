import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('RTFLabs API')
  .setVersion('0.1')
  .addCookieAuth('accessToken')
  .addServer('http://localhost:8000', 'local')
  .addServer('http://localhost', 'docker')
  .build();
