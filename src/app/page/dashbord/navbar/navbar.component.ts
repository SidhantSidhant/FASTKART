import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/sheard/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private _router : Router, private _authservice : AuthService) { }

  ngOnInit(): void {
  }

  logOut(){
    this._authservice.isUserLogOut();
    this._router.navigate(["http://localhost:4200"]);
  }
}
