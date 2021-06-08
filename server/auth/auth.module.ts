import { LocalStrategy } from './../strategies/local.strategy';
import { JwtStrategy } from './../strategies/jwt.strategy';
import { HttpModule, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from '../constants';import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [HttpModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10days' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,  JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
