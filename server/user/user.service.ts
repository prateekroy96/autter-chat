import { xmppConfig } from './../config/xmpp-server.config';
import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class UserService {
  constructor(private httpService: HttpService) {}
  searchUser(data): Observable<AxiosResponse<number>> {
    return this.httpService.post(
      xmppConfig.XMPP_ADMIN_URL + 'api/check_account',
      {
        user: data.username,
        host: xmppConfig.XMPP_HOST,
      },
      {
        headers: {
          Authorization: 'Bearer ' + xmppConfig.XMPP_ADMIN_TOKEN,
        },
      }
    );
  }
}
