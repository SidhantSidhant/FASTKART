import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { Idata, Ifastkartrole } from 'src/app/sheard/model/fastKart';
import { LoginService } from 'src/app/sheard/service/login.service';
import { TableComponent } from '../table/table.component';
import { SnackBarService } from 'src/app/sheard/service/snack-bar.service';
import { AbsoluteSourceSpan } from '@angular/compiler';
import { SubjectObsService } from 'src/app/sheard/service/subjectObs.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit, OnDestroy {

  permissionarr: number[] = [1, 2, 3, 4];
  isVisible: boolean = false;
  id !: string;
  userForm !: FormGroup;
  subscription$ !: Subscription;
  subscription$1 !: Subscription;
  subscription$2 !: Subscription;
  subscription$3 !: Subscription;
  Subscription$4 !: Subscription;
  Subscription$5 !: Subscription;

  constructor(
    private _loginservice: LoginService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _snackBarservice: SnackBarService,
    private _subjectobsservice: SubjectObsService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getRoleData()
    this.getvalueformRoute();
    this.getsingleuserdata();
  }

  getRoleData(): void {
    this.subscription$ = this._loginservice.getfastkartRoleData().subscribe((res: Ifastkartrole) => {
      res.data.forEach((item: Idata) => {
        if (+item.id <= 10) {
          this.permissionarr.push(+item.id)
        }
      })
    })
  }

  getsingleuserdata(): void {
    this.subscription$1 = this._loginservice.getRoleSingleUserData(this.id).subscribe((res: Idata) => {
      if (+res.id < 10) {
        this.permissionarr.push(+res.id)
      }
      if (res?.id == this.id) {
        this.userForm.patchValue({
          name: res.name
        })
      }
    })
  }

  getvalueformRoute(): void {
    this.subscription$2 = this._route.params.subscribe(res => {
      this.id = res['id']
    }, (err) => { throw new Error() })

    this.subscription$3 = this._route.queryParams.subscribe(res => {
      this.isVisible = res['params'];
    }, (err) => { throw new Error() })
  }

  createForm(): void {
    this.userForm = new FormGroup({
      name: new FormControl(),
    })
  }

  addUserForm(): void {
    const obj = { ...this.userForm.value, permissions: this.permissionarr };
    this.Subscription$4 = this._loginservice.addUsersData(obj).subscribe((res: Idata) => {
      setTimeout(() => { window.location.reload() }, 2000)
    }, (err) => {
      this._snackBarservice.openSnackBar("The name has already been taken.", "ok")
    });
    this._router.navigate(["dashbord/table"])
    this.userForm.reset()
  }

  updateUsers(): void {
    const obj = { ...this.userForm.value, permissions: this.permissionarr };
    this.Subscription$5 = this._loginservice.updateUserData(obj, this.id).subscribe(res => {
      setTimeout(() => { window.location.reload() }, 1000)
    }, (err) => {
      this._snackBarservice.openSnackBar("This Role Cannot be Update. It is System reserved", "ok")
    })
    this._router.navigate(["dashbord/table"])
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.subscription$1.unsubscribe();
    this.subscription$2.unsubscribe();
    this.subscription$3.unsubscribe();
    this.Subscription$4.unsubscribe();
    this.Subscription$5.unsubscribe();
  }
}
