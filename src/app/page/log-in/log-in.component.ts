import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmailValidation } from 'src/app/sheard/Validators/EmailValidators';
import { PasswordValidation } from 'src/app/sheard/Validators/passwordValidation';
import { Ilogin } from 'src/app/sheard/model/fastKart';
import { AuthService } from 'src/app/sheard/service/auth.service';
import { LoginService } from 'src/app/sheard/service/login.service';
import { SnackBarService } from 'src/app/sheard/service/snack-bar.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit, OnDestroy {

  isPasswordVisible: boolean = false;
  userLogIn !: FormGroup;
  subscription$ !: Subscription;

  constructor(private _loginservice: LoginService,
    private _snackbar: SnackBarService,
    private router: Router,
    private _authservice: AuthService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.userLogIn = new FormGroup({
      email: new FormControl(null, [Validators.required, EmailValidation.emailValidation]),
      password: new FormControl(null, [Validators.required, PasswordValidation.passwordvalidation])
    })

  }

  logInForm() {
    const obj = this.userLogIn.value;
    this.subscription$ = this._loginservice.userloginService(obj).subscribe((res: Ilogin) => {
      this._authservice.isUserLogIn();
      localStorage.setItem("token", res.access_token);

      this.router.navigate(["/dashbord"])
    },
      (error) => {
        this._snackbar.openSnackBar("Please Enter the proper Email and password", 'ok')
      })

  }

  get formControl() {
    return this.userLogIn.controls
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }
}
