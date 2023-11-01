import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { HotelController } from './hotel/hotel.controller';
import { HotelModule } from './hotel/hotel.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { RoomController } from './room/room.controller';
import { RoomModule } from './room/room.module';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelService } from './hotel/hotel.service';
import { Hotel, HotelSchema } from './hotel/schema/hotel.schema';
import { UserService } from './user/user.service';
import { User, UserSchema } from './user/schema/user.schema';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './auth/auth.JwtStrategy';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/hotelBooking'),
    MongooseModule.forFeature([
      { name: Hotel.name, schema: HotelSchema },
      {name: User.name, schema: UserSchema},
    ]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false}),
    AuthModule,
    HotelModule,
    UserModule,
    RoomModule,
    PassportModule,
    Hotel,
    // JwtModule.register({
    //   global: true,
    //   secret: "secretkeybiwebvuervbreuvovberovrevo",
    //   signOptions: { expiresIn: '6000s' },
    // })
  ],
  controllers: [
    AppController,
    AuthController,
    HotelController,
    UserController,
    RoomController,
  ],
  providers: [AppService, HotelService, UserService, JwtService, JwtStrategy],
})
export class AppModule {}
