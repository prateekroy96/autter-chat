import { endpoints } from './core/config/endpoints';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MainService } from './main/main.service';
@Injectable({
  providedIn: 'root',
})
export class AppService {
  user;
  constructor(private httpClient: HttpClient) {}

  verify(): Observable<any> {
    console.log('VERIFYING');
    return this.httpClient.post(endpoints.verify.url, {});
  }
}
