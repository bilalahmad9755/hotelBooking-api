import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from '../user/schema/user.schema';
import { UserSchema } from '../user/schema/user.schema';
import { JwtStrategy } from './auth.JwtStrategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthService, PassportModule, UserService, JwtStrategy],
  imports: [ MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
  ]),
  PassportModule.register({ defaultStrategy: 'jwt', session: false }),
  JwtModule.register({
    secret: "secretkeybiwebvuervbreuvovberovrevo",
    signOptions: { expiresIn: '1h' },
  }),
]
})
export class AuthModule {}
