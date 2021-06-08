import { jwtConstants } from '../constants';
import { HttpException, HttpService, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { xmppConfig } from 'server/config/xmpp-server.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private httpService: HttpService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
    console.log("JWT STRATEGY")
  }

  async validate(payload: any) {
    console.log("VALIDATE JWT",payload)
  try{  let res:any  = await this.httpService.post(
      xmppConfig.XMPP_ADMIN_URL + 'api/check_account',
      {
        user: payload.username,
        host: xmppConfig.XMPP_HOST,
      },
      {
        headers: {
          Authorization: 'Bearer ' + xmppConfig.XMPP_ADMIN_TOKEN,
        },
      }
    );
    if(res==1){
      throw new HttpException({
        status: false,
      status_code: HttpStatus.UNAUTHORIZED,
      message: "Invalid User",
    }, HttpStatus.UNAUTHORIZED);
    }
    return { ...payload };
  }
  catch(err){
    throw new HttpException({
      status: false,
    status_code: HttpStatus.INTERNAL_SERVER_ERROR,
    message: err.message,
  }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}}
