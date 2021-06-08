import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class VerifyUserMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('MIDDLEWARE ::::::::::::::::::::');
    next();
  }
}
