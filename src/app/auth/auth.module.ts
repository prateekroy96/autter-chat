import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AuthNavComponent } from './auth-nav/auth-nav.component';
import { AuthRoutingModule } from './auth-routing.module';



@NgModule({
  declarations: [SignupComponent, LoginComponent, AuthNavComponent],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
