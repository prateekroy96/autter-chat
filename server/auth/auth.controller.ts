import { AuthService } from './auth.service';
import { Controller, Ip, Next, Post, Req, Res } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('login')
  async login(@Req() req: Request, @Ip() ip): Promise<any> {
    try {
      let res: any = await this.auth.checkPassword(req.body).toPromise();
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
