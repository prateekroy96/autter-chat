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
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('search_user')
  async searchUser(@Req() req: Request): Promise<any> {
    try {
      let res: any = await this.userService.searchUser(req.body).toPromise();
      if (res.data == 1) {
        throw new HttpException(
          {
            status: false,
            status_code: HttpStatus.BAD_REQUEST,
            message: 'No Such User',
          },
          HttpStatus.BAD_REQUEST
        );
      }
      return {
        status: true,
        status_code: HttpStatus.OK,
        message: 'User Found',
        data: req.body,
      };
    } catch (err) {
      console.log(err.message);
      throw new HttpException(
        {
          status: false,
          status_code: HttpStatus.INTERNAL_SERVER_ERROR,
          message: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('set_image')
  async setImage(@Req() req: Request): Promise<any> {
    try {
      console.log('set image base64', req.body.base64);

      let res: any = await this.userService
        // @ts-ignore
        .setImage({ username: req.user.username, base64: req.body.base64 })
        .toPromise();
      console.log('set image res', res.data);
      if (res.data == 1) {
        throw new HttpException(
          {
            status: false,
            status_code: HttpStatus.BAD_REQUEST,
            message: 'Image could not be added',
          },
          HttpStatus.BAD_REQUEST
        );
      }
      return {
        status: true,
        status_code: HttpStatus.OK,
        message: 'Image Update Success',
      };
    } catch (err) {
      console.log(err.message);
      throw new HttpException(
        {
          status: false,
          status_code: HttpStatus.INTERNAL_SERVER_ERROR,
          message: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('get_image')
  async getImage(@Req() req: Request): Promise<any> {
    try {
      console.log('get_image', req.user);
      let res: any = await this.userService.getImage(req.user).toPromise();
      // console.log('get image res', res.data);
      return {
        status: true,
        status_code: HttpStatus.OK,
        message: 'User Image Found',
        data: {
          base64: res.data.content,
        },
      };
    } catch (err) {
      console.log(err.message);
      throw new HttpException(
        {
          status: false,
          status_code: HttpStatus.INTERNAL_SERVER_ERROR,
          message: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('get_user_image')
  async getUserImage(@Req() req: Request): Promise<any> {
    try {
      // console.log('get_image', req.user);
      let res: any = await this.userService.getImage(req.body).toPromise();
      console.log('get image res', res.data);
      return {
        status: true,
        status_code: HttpStatus.OK,
        message: 'User Image Found',
        data: {
          base64: res.data.content,
        },
      };
    } catch (err) {
      console.log(err.message);
      throw new HttpException(
        {
          status: false,
          status_code: HttpStatus.INTERNAL_SERVER_ERROR,
          message: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
