import { AuthService } from './../auth/auth.service';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(data): Promise<any> {
    const user = await this.authService.validateUser(data).toPromise();
    if (user.data == 1) {
      throw new UnauthorizedException();
    }
    return data;
  }
}
