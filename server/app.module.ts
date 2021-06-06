import { jwtConstants } from './constants';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';
import { AppServerModule } from '../src/main.server';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/autter/browser'),
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    AuthModule,
  ],
})
export class AppModule {}
