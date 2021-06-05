import { xmppConfig } from './../config/xmpp-server.config';
import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class AuthService {
  constructor(private httpService: HttpService) {}

  checkPassword(data): Observable<AxiosResponse<number>> {
    return this.httpService.post(
      xmppConfig.XMPP_ADMIN_URL + '/api/check_password',
      {
        user: data.user,
        host: xmppConfig.XMPP_HOST,
        password: data.password,
      }
    );
  }

  test(): Observable<AxiosResponse<number>> {
    return this.httpService.get('https://jsonplaceholder.typicode.com/todos/1');
  }
}
