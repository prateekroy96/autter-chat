import { Routes } from '@angular/router';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { SignupComponent } from 'src/app/auth/signup/signup.component';
import { GroupComponent } from 'src/app/main/group/group.component';
import { IndividualComponent } from 'src/app/main/individual/individual.component';

export const authRoutes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
];

export const mainRoutes: Routes = [
  {
    path: '',
    redirectTo: '/individual',
    pathMatch: 'full',
  },
  {
    path: 'individual',
    component: IndividualComponent,
  },
  {
    path: 'group',
    component: GroupComponent,
  },
];
