import { xmppConfig } from './../config/xmpp-server.config';
import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { createCipheriv, createDecipheriv, scrypt } from 'crypto';
import { promisify } from 'util';
import { secret } from 'secret/secret';

@Injectable()
export class AuthService {
  readonly iv = secret.IV;
  readonly password = secret.PASSWORD;
  readonly saltOrRounds: number = 10;
  constructor(private httpService: HttpService) {}
  validateUser(data): Observable<AxiosResponse<number>> {
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
  checkPassword(data): Observable<AxiosResponse<number>> {
    return this.httpService.post(
      xmppConfig.XMPP_ADMIN_URL + 'api/check_password',
      {
        user: data.username,
        host: xmppConfig.XMPP_HOST,
        password: data.password,
      },
      {
        headers: {
          Authorization: 'Bearer ' + xmppConfig.XMPP_ADMIN_TOKEN,
        },
      }
    );
  }
  register(data): Observable<AxiosResponse<number>> {
    return this.httpService.post(
      xmppConfig.XMPP_ADMIN_URL + 'api/register',
      {
        user: data.username,
        host: xmppConfig.XMPP_HOST,
        password: data.password,
      },
      {
        headers: {
          Authorization: 'Bearer ' + xmppConfig.XMPP_ADMIN_TOKEN,
        },
      }
    );
  }
  changePassword(data): Observable<AxiosResponse<number>> {
    return this.httpService.post(
      xmppConfig.XMPP_ADMIN_URL + 'api/change_password',
      {
        user: data.username,
        host: xmppConfig.XMPP_HOST,
        newpass: data.newpass,
      },
      {
        headers: {
          Authorization: 'Bearer ' + xmppConfig.XMPP_ADMIN_TOKEN,
        },
      }
    );
  }
  async encrypt(textToEncrypt: string) {
    const key = (await promisify(scrypt)(this.password, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, this.iv);

    const encryptedText = Buffer.concat([
      cipher.update(textToEncrypt),
      cipher.final(),
    ]);
    return encryptedText;
  }
  async decrypt(encryptedText: Buffer) {
    const key = (await promisify(scrypt)(this.password, 'salt', 32)) as Buffer;
    const decipher = createDecipheriv('aes-256-ctr', key, this.iv);
    const decryptedText = Buffer.concat([
      decipher.update(encryptedText),
      decipher.final(),
    ]);
  }
  test(): Observable<AxiosResponse<number>> {
    return this.httpService.get('https://jsonplaceholder.typicode.com/todos/1');
  }
}
