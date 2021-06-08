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
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'server/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService, private jwtService: JwtService) {}

  @Post('login')
  async login(@Req() req: Request, @Ip() ip): Promise<any> {
    try {
      console.log('LOGIN BODY', req.body);
      let res: any = await this.auth.checkPassword(req.body).toPromise();
      if (res.data == 1)
    {    
       throw new HttpException({
          status: false,
        status_code: HttpStatus.UNAUTHORIZED,
        message: 'Invalid Username or Password',
      }, HttpStatus.UNAUTHORIZED); }
      let data: any = {
        username: req.body.username,
        type: 'USER',
        password: req.body.password,
      };
      return {
        status: true,
        status_code: HttpStatus.OK,
        message: 'Login Success',
        token: this.jwtService.sign({
          username: req.body.username,
          type: 'USER',
          password: req.body.password,
        }),
        data,
      };
    } catch (err) {
      console.log(err.message);
      throw new HttpException({
        status: false,
      status_code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: err.message,
    }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @UseGuards(JwtAuthGuard)
  @Post('verify')
  async verify(@Req() req: Request, @Ip() ip): Promise<any> {
    try {
      console.log('VERIFY', req.body, req.user);
      return {
        status: true,
        status_code: HttpStatus.OK,
        message: 'Token Validated',
        data: req.user,
      };
    } catch (err) {
      console.log(err.message);
      throw new HttpException({
        status: false,
      status_code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: err.message,
    }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('signup')
  async signup(@Req() req: Request, @Ip() ip): Promise<any> {
    try {
      console.log('SIGNUP BODY', req.body);
      let res: any = await this.auth.register(req.body).toPromise();
      console.log("SIGNUP RES",res.data)
      let data: any = {
        username: req.body.username,
        type: 'USER',
        password: req.body.password,
      };
      return {
        status: true,
        status_code: HttpStatus.OK,
        message: 'Login Success',
        token: this.jwtService.sign({
          username: req.body.username,
          type: 'USER',
          password: req.body.password,
        }),
        data,
      };
    } catch (err) {
      console.log("ERR",err.message);
      console.log(err.message);
      throw new HttpException({
        status: false,
      status_code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: err.message,
    }, HttpStatus.INTERNAL_SERVER_ERROR);
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
      console.log(err.message);
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
