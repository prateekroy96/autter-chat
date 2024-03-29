import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthNavComponent } from './auth/auth-nav/auth-nav.component';
import { AuthModule } from './auth/auth.module';
import { LoginGuard } from './core/guards/login.guard';
import { UserGuard } from './core/guards/user.guard';
import { MainNavComponent } from './main/main-nav/main-nav.component';
import { MainModule } from './main/main.module';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: MainNavComponent,
    canActivate: [UserGuard],
    loadChildren: () => MainModule,
  },
  {
    path: 'auth',
    component: AuthNavComponent,
    canActivate: [LoginGuard],
    loadChildren: () => AuthModule,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
