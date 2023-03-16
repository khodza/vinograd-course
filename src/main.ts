import { NestFactory } from '@nestjs/core';
import * as multer from 'multer';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
