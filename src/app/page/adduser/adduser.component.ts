import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Idata, Ifastkart } from 'src/app/sheard/model/fastKart';
import { LoginService } from 'src/app/sheard/service/login.service';
import { TableComponent } from '../table/table.component';
import { SnackBarService } from 'src/app/sheard/service/snack-bar.service';
import { AbsoluteSourceSpan } from '@angular/compiler';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit, OnDestroy {

  countArr: number[] = [];
  isVisible: boolean = false;
  id !: string;
  userForm !: FormGroup;
  subscription !: Subscription;
  subscription1 !: Subscription;
  subscription2 !: Subscription;
  subscription3 !: Subscription;
  Subscription4 !: Subscription;

  constructor(
    private _loginservice: LoginService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _snackBarservice: SnackBarService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getParamsVal();
    this.subscription = this._loginservice.getSingleUserData(this.id).subscribe((res: any) => {
      res.permissions.forEach((element: any) => {
        this.countArr.push(element.id);
      });

      if (res?.id == this.id) {
        this.userForm.patchValue({
          name: res.name
        })
      }
    })

    this.getRoleData()
  }

  getRoleData() {
    this._loginservice.getFastKartdata().subscribe((res: any) => {
      console.log(res);
      res.data.forEach((element: Idata) => {
        this.countArr.push(element.id)
      })
    })
  }

  getParamsVal() {
   this._route.params.subscribe(res => {
      this.id = res['id']
    },
      (err) => console.log("Please inform me Params Error"))

    this.subscription2 = this._route.queryParams.subscribe(res => {
      this.isVisible = res['params'];
    },
      (err) => console.log('please inForm me QueryParams Error'))
  }

  createForm() {
    this.userForm = new FormGroup({
      name: new FormControl(),
    })
  }

  AddUserForm() {

    let obj = { ...this.userForm.value, permissions: this.countArr };
    this._loginservice.addUsersData(obj).subscribe((res: any) => {
    }, (err) => {
      this._snackBarservice.openSnackBar("The name has already been taken.", "ok")
    });
    this._router.navigate(["dashbord/table"])
    this.userForm.reset()
  }

  UpdateUsers() {
    let obj = { ...this.userForm.value, permissions: this.countArr };
    console.log(obj);

    this._loginservice.updateUserData(obj, this.id).subscribe(res => {
      console.log(res);
    }, (err) => {
      console.log("Update-User Error")
      confirm("This Role Cannot be Update. It is System reserved")
    })
    this._router.navigate(["dashbord/table"])
  }

  get f() {
    return this.userForm.controls;
  }
  ngOnDestroy(): void {
    
  }
}
