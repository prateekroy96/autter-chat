import { xmppConfig } from './../config/xmpp-server.config';
import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class AuthService {
  constructor(private httpService: HttpService) {}

  checkPassword(data): Observable<AxiosResponse<number>> {
    return this.httpService.post(
      xmppConfig.XMPP_ADMIN_URL + 'api/check_password',
      {
        user: data.user,
        host: xmppConfig.XMPP_HOST,
        password: data.password,
      },
      {
        headers: {
          Authorization: "Bearer " + xmppConfig.XMPP_ADMIN_TOKEN,
        }
      }
    );
  }
  register(data): Observable<AxiosResponse<number>> {
    return this.httpService.post(
      xmppConfig.XMPP_ADMIN_URL + 'api/register',
      {
        user: data.user,
        host: xmppConfig.XMPP_HOST,
        password: data.password,
      },
      {
        headers: {
          Authorization: "Bearer " + xmppConfig.XMPP_ADMIN_TOKEN,
        }
      }
    );
  }
  changePassword(data): Observable<AxiosResponse<number>> {
    return this.httpService.post(
      xmppConfig.XMPP_ADMIN_URL + 'api/change_password',
      {
        user: data.user,
        host: xmppConfig.XMPP_HOST,
        newpass: data.newpass,
      },
      {
        headers: {
          Authorization: "Bearer " + xmppConfig.XMPP_ADMIN_TOKEN,
        }
      }
    );
  }

  test(): Observable<AxiosResponse<number>> {
    return this.httpService.get('https://jsonplaceholder.typicode.com/todos/1');
  }
}
