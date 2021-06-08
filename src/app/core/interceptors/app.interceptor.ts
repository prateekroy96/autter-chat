import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, timeout, catchError } from 'rxjs/operators';

export class AppInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('autter_token');
console.log("INTERCEPTOR")
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
