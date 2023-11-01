import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import passport = require('passport');
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3001',
    credentials: true,
    exposedHeaders: ['set-cookie'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, username, password',
  };
  app.enableCors(corsOptions);

  // Set up Swagger
  const config = new DocumentBuilder()
    .setTitle('hotel booking..')
    .setDescription('hotelBooking')
    .setVersion('1.0')
    .addTag('Nest Project.')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  // Use a global validation pipe
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Use a cookie parser
  app.use(cookieParser());

  // Set the global prefix to 'api'
  // Use a MongoDB session store
  // Initialize Passport
  app.use(passport.initialize());

  // Start the server
  await app.listen(3000);
}

bootstrap();