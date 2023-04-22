import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private _router : Router) { }

  ngOnInit(): void {
  }

  logOut(){
    localStorage.removeItem("token");
    localStorage.removeItem("obj");
    this._router.navigate(["http://localhost:4200"]);
  }
}
