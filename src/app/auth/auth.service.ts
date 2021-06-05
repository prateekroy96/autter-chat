import { endpoints } from './../core/config/endpoints';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(data): Observable<any> {
    return this.httpClient.post(endpoints.login.url, data);
  }

  signup(data): Observable<any> {
    return this.httpClient.post(endpoints.signup.url, data);
  }

  verify(data): Observable<any> {
    return this.httpClient.post(endpoints.verify.url, data);
  }
}
