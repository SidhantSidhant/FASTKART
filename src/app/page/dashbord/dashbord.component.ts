import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/sheard/service/login.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent implements OnInit, OnDestroy {
  subscription$ !: Subscription;

  constructor(private _loginservice: LoginService) { }

  ngOnInit(): void {
    //Api is not Work
    // this.subscription$ = this._loginservice.getFastKartApiModule().subscribe(res => {
    // }, (error) => {
    // })
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
