import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LocationNotFoundFilter } from '@Location/exceptions/filters/LocationNotFoundFilter';
import { VehicleNotFoundFilter } from '@Vehicle/exceptions/filters/VehicleNotFoundFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const enviroment = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true})
    );
  app.useGlobalFilters(new LocationNotFoundFilter(), new VehicleNotFoundFilter());

  const config = new DocumentBuilder()
  .setTitle('Reservation API')
  .setDescription('Reservation the parking')
  .setVersion('1.0')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

  await app.listen(enviroment.get('PORT'));
}
bootstrap();
