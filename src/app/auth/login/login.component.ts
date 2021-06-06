import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginState = {
    submitted: false,
    loading: false,
  };
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = formBuilder.group({
      username: [null, [Validators.required, Validators.maxLength(20)]],
      password: [null, [Validators.required, Validators.maxLength(50)]],
    });
  }

  ngOnInit(): void {}

  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }
  loginSub: Subscription;
  login() {
    console.log(this.loginForm.value);
    if (this.loginState.loading) return;
    this.loginState.submitted = true;
    if (this.loginForm.invalid) return;
    if (this.loginSub) this.loginSub.unsubscribe();
    this.loginState.loading = true;
    this.loginSub = this.authService.login(this.loginForm.value).subscribe(
      (res) => {
        console.log(res);
        this.loginState.loading = false;
        localStorage.store('autter_token', res.token);
        this.router.navigateByUrl('/');
      },
      (err) => {
        console.log(err);
        this.loginState.loading = false;
      }
    );
  }
}
