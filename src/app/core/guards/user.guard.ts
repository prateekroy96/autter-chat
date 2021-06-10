import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AppService } from 'src/app/app.service';
@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
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
          resolve(true);
        },
        (error: any) => {
          this.router.navigate(['/auth/login']);
          resolve(false);
        }
      );
    });
  }
}
