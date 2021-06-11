import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AppService } from 'src/app/app.service';
import { MainService } from 'src/app/main/main.service';
@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private appService: AppService,
    private router: Router,
    private mainService: MainService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.appService.verify().subscribe(
        (res: any) => {
          console.log('auth res', res);
          if (this.appService.user.username !== res.data.username) {
            this.mainService.purge();
          }
          this.appService.user = { ...res.data };

          this.router.navigate(['/']);
          resolve(false);
        },
        (error: any) => {
          console.log('EROR', error);
          resolve(true);
        }
      );
    });
  }
}
