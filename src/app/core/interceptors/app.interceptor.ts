import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map, timeout, catchError } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AppInterceptor implements HttpInterceptor {
  constructor(private localStorageService: LocalStorageService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = this.localStorageService.getItem('autter_token');
    console.log('INTERCEPTOR');
    let copyReq;
    if (token) {
      copyReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          authorization: `bearer ${token}`,
        }),
      });
    } else {
      copyReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      });
    }

    return next.handle(copyReq).pipe(timeout(10000));
  }
}
