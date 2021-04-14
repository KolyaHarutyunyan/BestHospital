import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './util/swagger';
import * as session from 'express-session';

async function bootstrap() {
  const PORT = process.env.PORT || 8200;
  const app = await NestFactory.create(AppModule);

  // Middlewares
  app.enableCors();
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  //swagger documentation setup
  setupSwagger(app);

  await app
    .listen(PORT)
    .then(() => console.log(`server running on port ${PORT}`));
}
bootstrap();
