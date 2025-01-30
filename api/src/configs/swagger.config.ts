import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('React RTFLabs API')
  .setVersion('0.1')
  .addCookieAuth('accessToken')
  .addServer('http://localhost:8000', 'dev')
  .addServer('https://rtf.lab', 'prod')
  .build();
