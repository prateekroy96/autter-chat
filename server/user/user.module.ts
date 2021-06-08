import { UserService } from './user.service';
import { UserController } from './user.controller';

import { LocalStrategy } from './../strategies/local.strategy';
import { JwtStrategy } from './../strategies/jwt.strategy';
import { HttpModule, Module } from '@nestjs/common';
import { jwtConstants } from '../constants';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    HttpModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10days' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, LocalStrategy, JwtStrategy],
  exports: [UserService, LocalStrategy, JwtStrategy],
})
export class UserModule {}
