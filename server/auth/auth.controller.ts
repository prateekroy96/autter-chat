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

  @Post('signup')
  async signup(@Req() req: Request, @Ip() ip): Promise<any> {
    try {
      let res: any = await this.auth.register(req.body).toPromise();
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Post('change_password')
  async changePassword(@Req() req: Request, @Ip() ip): Promise<any> {
    try {
      let res1: any = await this.auth.checkPassword({user:req.body.user,password: req.body.oldpass}).toPromise();
      if(res1.data == 1) return 1;
      let res2:any = await this.auth.changePassword({user:req.body.user,newpass: req.body.newpass}).toPromise();
      return res2.data
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
