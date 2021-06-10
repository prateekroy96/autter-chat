import { xmppConfig } from './../config/xmpp-server.config';
import { HttpService, Injectable } from '@nestjs/common';
import { concat, Observable } from 'rxjs';
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
  setImageFormat(data): Observable<AxiosResponse<number>> {
    return this.httpService.post(
      xmppConfig.XMPP_ADMIN_URL + 'api/set_vcard2',
      {
        user: data.username,
        host: xmppConfig.XMPP_HOST,
        name: 'PHOTO',
        subname: 'TYPE',
        content: [data.format],
      },
      {
        headers: {
          Authorization: 'Bearer ' + xmppConfig.XMPP_ADMIN_TOKEN,
        },
      }
    );
  }
  setImage(data): Observable<AxiosResponse<number>> {
    return this.httpService.post(
      xmppConfig.XMPP_ADMIN_URL + 'api/set_vcard2',
      {
        user: data.username,
        host: xmppConfig.XMPP_HOST,
        name: 'PHOTO',
        subname: 'BINVAL',
        content: [data.base64],
      },
      {
        headers: {
          Authorization: 'Bearer ' + xmppConfig.XMPP_ADMIN_TOKEN,
        },
      }
    );
  }
  getImageFormat(data): Observable<AxiosResponse<number>> {
    return this.httpService.post(
      xmppConfig.XMPP_ADMIN_URL + 'api/get_vcard2',
      {
        user: data.username,
        host: xmppConfig.XMPP_HOST,
        name: 'PHOTO',
        subname: 'TYPE',
      },
      {
        headers: {
          Authorization: 'Bearer ' + xmppConfig.XMPP_ADMIN_TOKEN,
        },
      }
    );
  }
  getImage(data): Observable<AxiosResponse<number>> {
    return this.httpService.post(
      xmppConfig.XMPP_ADMIN_URL + 'api/get_vcard2',
      {
        user: data.username,
        host: xmppConfig.XMPP_HOST,
        name: 'PHOTO',
        subname: 'BINVAL',
      },
      {
        headers: {
          Authorization: 'Bearer ' + xmppConfig.XMPP_ADMIN_TOKEN,
        },
      }
    );
  }
}
