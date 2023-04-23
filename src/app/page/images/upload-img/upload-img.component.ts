import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Idata } from 'src/app/sheard/model/fastKart';
import { LoginService } from 'src/app/sheard/service/login.service';

@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.scss']
})
export class UploadImgComponent implements OnInit, OnDestroy {
  @Output() emitter: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() dataemitter: EventEmitter<Idata> = new EventEmitter<Idata>()
  @Input('getimagesdata') getimagesdata !: Function;
  fileToUpload!: File;
  subscription$ !: Subscription;


  constructor(
    private _loginservice: LoginService,
    private _sanitizar: DomSanitizer
  ) { }

  ngOnInit(): void {}

  HideDragSlider(): void {
    this.emitter.emit(false);
  }

  selectFile(event: any): void {
    this.fileToUpload = event.target.files.item(0);
  }

  addImges(image: any): void {
    this.subscription$ = this._loginservice.UploadImg(this.fileToUpload).subscribe((imgdata: Idata) => {
      this.getimagesdata();
      window.location.reload()
    })
    this.emitter.emit(false)
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }
}
