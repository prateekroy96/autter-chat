import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AppService } from 'src/app/app.service';
@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private appService: AppService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.appService.verify().subscribe(
        (res: any) => {
          console.log('auth res', res);
          this.appService.user = { ...res.data };
          if (this.appService.user.type == 'ADMIN') {
            resolve(true);
          } else if (this.appService.user.type == 'USER') {
            this.router.navigate(['/']);
            resolve(false);
          }
        },
        (error: any) => {
          this.router.navigate(['/auth/login']);
          resolve(false);
        }
      );
    });
  }
}
