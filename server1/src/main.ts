import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:5173','http://localhost:5174'],
    methods:'GET, POST, PUT, DELETE, PATCH',
    allowedHeaders:'Content-Type, Authorization',
    credentials:true
  })//process.env.PORT ??
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
