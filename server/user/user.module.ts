import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HttpModule, Module } from '@nestjs/common';
import { jwtConstants } from '../constants';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'server/strategies/jwt.strategy';

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
  providers: [UserService,JwtStrategy],
  exports: [UserService ],
})
export class UserModule {}
