import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";

async function main() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v2');
  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
          transform: true,
          transformOptions:{
            enableImplicitConversion: true,
          },
      })
  );
  await app.listen(process.env.PORT);
    console.log(`Application is running on: ${await app.getUrl()}`)
}
main();
