import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/sheard/service/login.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit, OnDestroy {

  isPasswordVisible : boolean = false;
  userLogIn !: FormGroup;
  subscription !: Subscription;

  constructor(private _loginservice: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {

    this.userLogIn = new FormGroup({
      email: new FormControl(null,),
      password: new FormControl(null,)
    })

  }

  LogInUserForm() {

    let obj = this.userLogIn.value;

    this.subscription = this._loginservice.userloginService(obj).subscribe((res : any) => {
      // console.log(res);
      localStorage.setItem("token", res.access_token);
      this.router.navigate(["/dashbord"])
    },
      (error) => {
        alert("Please Enter the proper Email and password")
      })

  }

  get f(){
     return this.userLogIn.controls
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
