import { LocalStrategy } from './../strategies/local.strategy';
import { JwtStrategy } from './../strategies/jwt.strategy';
import { HttpModule, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [HttpModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
