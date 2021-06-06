import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  signupState = {
    submitted: false,
    loading: false,
  };
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = formBuilder.group({
      username: [null, [Validators.required, Validators.maxLength(20)]],
      password: [null, [Validators.required, Validators.maxLength(50)]],
      confirm_password: [null, [Validators.required, Validators.maxLength(50)]],
    });
  }

  ngOnInit(): void {}

  get username() {
    return this.signupForm.get('username');
  }
  get password() {
    return this.signupForm.get('password');
  }
  get confirm_password() {
    return this.signupForm.get('confirm_password');
  }
  signupSub: Subscription;
  signup() {
    console.log(this.signupForm.value);
    if (this.signupState.loading) return;
    this.signupState.submitted = true;
    if (this.signupForm.invalid) return;
    if (this.signupSub) this.signupSub.unsubscribe();
    this.signupState.loading = true;
    this.signupSub = this.authService.signup(this.signupForm.value).subscribe(
      (res) => {
        console.log(res);
        this.signupState.loading = false;
        localStorage.store('autter_token', res.token);
        this.router.navigateByUrl('/');
      },
      (err) => {
        console.log(err);
        this.signupState.loading = false;
      }
    );
  }
}
