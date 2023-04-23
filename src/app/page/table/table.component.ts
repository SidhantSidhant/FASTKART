import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Idata, Ifastkartrole } from 'src/app/sheard/model/fastKart';
import { LoginService } from 'src/app/sheard/service/login.service';
import { SnackBarService } from 'src/app/sheard/service/snack-bar.service';
import { SubjectObsService } from 'src/app/sheard/service/subjectObs.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = ['number', 'name', 'created_at', "Edit", "delete"];
  dataSource = new MatTableDataSource<any>;
  pageCount: number = 1;
  sizeCount: number = 10;
  inputValue !: string;
  subscription$ !: Subscription;
  subscription1$ !: Subscription;

  @ViewChild(MatPaginator) paginator !: MatPaginator;

  constructor(private __loginservice: LoginService,
    private router: Router,
    private _snackbar: SnackBarService,
    private _subjectobsservice: SubjectObsService
  ) { }

  ngOnInit(): void {
    this.getRoletdata(this.pageCount, this.sizeCount);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getRoletdata(count: number, size: number): void {
    this.subscription$ = this.__loginservice.getfastkartRoleData(count, size).subscribe((res: Ifastkartrole) => {
      this.dataSource.data = res.data;
    }, err => {
      this._snackbar.openSnackBar("You want To get The Data", 'ok')
    })
  }

  redirecttopath(str: string, id?: string) {
    if (str === "pro") {
      this.router.navigate([`dashbord/${str}`])
    } else {
      this.router.navigate([`dashbord/${str}`, id], {
        queryParams: {
          "params": true
        }
      })
    }
  }

  deletedTheSingleUser(id: string) {
    this.subscription1$ = this.__loginservice.delteRoleSingleUsers(id).subscribe((res: Idata) => {
      this._snackbar.openSnackBar("You want To Delete The Element", 'yes');
      setTimeout(()=>{
        window.location.reload()
      },2000)
    }, (err) => {
      this._snackbar.openSnackBar("This Role Cannot be deleted. It is System reserved.", 'ok');
    });
    this.router.navigate(["dashbord/table"])
  }

  pagination(event: Event) {
    const element = (event.target as HTMLButtonElement)!;
    console.log(element);
    switch (element.innerHTML) {
      case ">>":
        this.pageCount = ++this.pageCount;
        this.getRoletdata(this.pageCount, this.sizeCount)
        break
      case "<<":
        this.pageCount--;
        this.getRoletdata(this.pageCount, this.sizeCount);
        break
    }
  }

  paginiationSize(ele: Event) {
    const element = (ele.target as HTMLButtonElement)!.innerText;
    switch (element) {
      case "10":
        this.sizeCount = 10;
        this.getRoletdata(this.pageCount, this.sizeCount)
        break
      case '25':
        this.sizeCount = 25;
        this.getRoletdata(this.pageCount, this.sizeCount)
        break
      case "50":
        this.sizeCount = 50;
        this.getRoletdata(this.pageCount, this.sizeCount)
        break
      case "100":
        this.sizeCount = 100;
        this.getRoletdata(this.pageCount, this.sizeCount)
        break
    }
  }

  ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
    this.subscription1$?.unsubscribe();
  }
}
