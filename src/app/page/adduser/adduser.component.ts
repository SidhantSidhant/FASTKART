import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Idata, Ifastkartrole } from 'src/app/sheard/model/fastKart';
import { LoginService } from 'src/app/sheard/service/login.service';
import { SnackBarService } from 'src/app/sheard/service/snack-bar.service';
import { SubjectObsService } from 'src/app/sheard/service/subjectObs.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit, OnDestroy {

  permissionarr: number[] = [];
  isVisible: boolean = false;
  id !: string;
  userForm !: FormGroup;


  unsuscribe$ : Subject<void> = new Subject<void>()

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
   this._loginservice.getfastkartRoleData().pipe(takeUntil(this.unsuscribe$)).subscribe((res: Ifastkartrole) => {
      res.data.forEach((item: Idata) => {
        if (+item.id <= 10) {
          this.permissionarr.push(+item.id)
        }
      })
    })
  }

  getsingleuserdata(): void {
   this._loginservice.getRoleSingleUserData(this.id).pipe(takeUntil(this.unsuscribe$)).subscribe((res: Idata) => {
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
     this._route.params.pipe(takeUntil(this.unsuscribe$)).subscribe(res => {
      this.id = res['id']
    }, (err) => { throw new Error() })

   this._route.queryParams.pipe(takeUntil(this.unsuscribe$)).subscribe(res => {
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
    this._loginservice.addUsersData(obj).pipe(takeUntil(this.unsuscribe$)).subscribe((res: Idata) => {
      this._subjectobsservice.imgdata.next(res);
      this._router.navigate(['dashbord/table', res.id])
    }, (err) => {
      this._snackBarservice.openSnackBar("The name has already been taken.", "ok")
    });
    this.userForm.reset()
  }

  updateUsers(): void {
    const obj = { ...this.userForm.value, permissions: this.permissionarr };
    this._loginservice.updateUserData(obj, this.id).subscribe(res => {
      this._router.navigate(['dashbord/table', res.id])
    }, (err) => {
      this._snackBarservice.openSnackBar("This Role Cannot be Update. It is System reserved", "ok")
    })
    this._router.navigate(["dashbord/table"])
  }

  ngOnDestroy(): void {
    this.unsuscribe$.next();
    this.unsuscribe$.complete();
  }
}
