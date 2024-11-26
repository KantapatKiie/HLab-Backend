import { NestFactory } from '@nestjs/core';
import { AppModule } from '@modules/app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const isDevelopmentMode =
    configService.get<'test' | 'develop' | 'production'>('mode') !==
    'production';

  app.enableCors();

  console.log(isDevelopmentMode);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.setGlobalPrefix('/api');

  if (isDevelopmentMode) {
    const options = new DocumentBuilder()
      .setTitle('Minie transaction service')
      .setDescription('Minie transaction service')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/api/docs', app, document);
  }

  await app.listen(configService.get<number>('port'));
}
bootstrap();
