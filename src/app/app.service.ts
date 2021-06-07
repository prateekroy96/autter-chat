import { endpoints } from './core/config/endpoints';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AppService {
  user;
  constructor(private router: Router, private httpClient: HttpClient) {}
  logout() {
    this.user = null;
    localStorage.removeItem('autter_token');
    this.router.navigateByUrl('/');
  }
  verify(): Observable<any> {
    return this.httpClient.post(endpoints.verify.url,{});
  }
}
