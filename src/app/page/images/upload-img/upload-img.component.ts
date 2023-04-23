import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
  @Output() imgUploadSuccess: EventEmitter<any> = new EventEmitter();


  constructor(
    private _loginservice: LoginService,
    private _sanitizar: DomSanitizer
  ) { }

  ngOnInit(): void { }

  HideDragSlider(): void {
    this.emitter.emit(false);
  }

  selectFile(event: any): void {
    this.fileToUpload = event.target.files.item(0);
  }

  addImges(image: any): void {
    this._loginservice.UploadImg(this.fileToUpload).subscribe((imgdata: any) => {
      this.imgUploadSuccess.next(imgdata[0]);
      this.emitter.emit(false)
    })
  }

  ngOnDestroy(): void {

  }
}
