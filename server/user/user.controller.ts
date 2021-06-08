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
    constructor(private userService:UserService, private jwtService: JwtService) {}
    @UseGuards(JwtAuthGuard)
    @Post('search_user')
    async searchUser(@Req() req: Request): Promise<any> {
      try {
        let res:any = await this.userService.searchUser(req.body).toPromise();
        if(res.data == 1){
            throw new HttpException({
              status: false,
              status_code: HttpStatus.BAD_REQUEST,
              message: "No Such User",
            }, HttpStatus.BAD_REQUEST);
        }
        return {
          status: true,
          status_code: HttpStatus.OK,
          message: 'User Found',
          data: req.body,
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
}
