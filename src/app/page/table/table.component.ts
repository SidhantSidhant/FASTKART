import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/sheard/service/login.service';
import { SnackBarService } from 'src/app/sheard/service/snack-bar.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  obj: any;
  skills: any[] = JSON.parse(localStorage.getItem('obj')!)
  displayedColumns: string[] = ['number', 'name', 'created_at', "Edit", "delete"];
  dataSource = new MatTableDataSource<any>(this.skills);
  pageCount: number = 1;
  sizeCount: number = 10;
  inputValue !: string;
  subscription !: Subscription;
  subscription1 !: Subscription;

  @ViewChild(MatPaginator) paginator !: MatPaginator;

  constructor(private __loginservice: LoginService,
    private router: Router,
    private _snackbar: SnackBarService
  ) { }

  ngOnInit(): void {
    this.getData(this.pageCount, this.sizeCount);


  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getData(count: number, size: number) {
    this.subscription = this.__loginservice.getFastKartdata(count, size).subscribe((res: any) => {
      console.log(res);
      this.obj = res;
      localStorage.setItem("obj", JSON.stringify(this.obj.data))
    }, err => {
      alert("Error")
    })
  }

  setThePathOfRoute(str: string, id: string) {
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

  DeletedTheSingleUser(id: string) {
    this.subscription1 = this.__loginservice.DelteSingleUsers(id).subscribe((res: any) => {
      this._snackbar.openSnackBar("You want To Delete The Element", 'yes');
    }, (err) => {
      console.log("This Role Cannot be deleted. It is System reserved.");
      confirm("This Role Cannot be deleted. It is System reserved.");

    });
    this.router.navigate(["dashbord"])
  }

  pagination(event: Event) {
    let element = (event.target as HTMLButtonElement)!;
    console.log(element);
    if (element.innerText === ">>") {
      console.log('triggerd');
      this.pageCount = ++this.pageCount;
      this.getData(this.pageCount, this.sizeCount)
    } else {
      this.pageCount--;
      this.getData(this.pageCount, this.sizeCount);
    }
  }

  paginiationSize(ele: Event) {
    let element = (ele.target as HTMLButtonElement)!.innerText;
    console.log(element);
    if (element === '10') {
      this.sizeCount = 10;
      this.getData(this.pageCount, this.sizeCount)
    } else if (element === '25') {
      this.sizeCount = 25;
      this.getData(this.pageCount, this.sizeCount)
    } else if (element === '50') {
      this.sizeCount = 50;
      this.getData(this.pageCount, this.sizeCount)
    } else if (element === '100') {
      this.sizeCount = 100;
      this.getData(this.pageCount, this.sizeCount)
    }
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
    // this.subscription.unsubscribe();
  }
}
