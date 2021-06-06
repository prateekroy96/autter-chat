import { AuthService } from './auth.service';
import {
  Controller,
  HttpException,
  HttpStatus,
  Ip,
  Next,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'server/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'server/guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService, private jwtService: JwtService) {}

  @Post('login')
  async login(@Req() req: Request, @Ip() ip): Promise<any> {
    try {
      console.log("LOGIN BODY",req.body)
      let res: any = await this.auth.checkPassword(req.body).toPromise();
      if (res.data == 1)
        throw new HttpException(
          'Invalid Username or Password',
          HttpStatus.UNAUTHORIZED
        );
      let res2: any = {
        token: this.jwtService.sign({
          username: req.body.username,
        }),
        username: req.body.username,
      };
      return res2;
    } catch (err) {
      console.log(err);
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @UseGuards(JwtAuthGuard)
  @Post('verify')
  async verify(@Req() req: Request, @Ip() ip): Promise<any> {
    try {
      console.log("VERIFY",req.body,req.user)
      return 1;
    } catch (err) {
      console.log(err);
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
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
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('change_password')
  async changePassword(@Req() req: Request, @Ip() ip): Promise<any> {
    try {
      let res1: any = await this.auth
        .checkPassword({ user: req.body.user, password: req.body.oldpass })
        .toPromise();
      if (res1.data == 1) return 1;
      let res2: any = await this.auth
        .changePassword({ user: req.body.user, newpass: req.body.newpass })
        .toPromise();
      return res2.data;
    } catch (err) {
      console.log(err);
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
