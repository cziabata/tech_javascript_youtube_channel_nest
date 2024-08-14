import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // get instance of ConfigService class using app
  const configService = app.get(ConfigService);
  // get value of variable described in configuration/index.ts using configService instance 
  const port = configService.get('port');
  
  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .setTitle("Swagger Documentation")
    .setDescription("Swagger Documentation")
    .setVersion("1.0")
    .addTag("API")
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(port);
}
bootstrap();
