import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Idata } from 'src/app/sheard/model/fastKart';
import { LoginService } from 'src/app/sheard/service/login.service';

@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.scss']
})
export class UploadImgComponent implements OnInit {
  @Output() emitter: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() dataemitter : EventEmitter<Idata> = new EventEmitter<Idata>()
  fileToUpload!: File;
  @Input('getimagesdata') getimagesdata !: Function;
  constructor(private _loginservice: LoginService,
    private _sanitizar: DomSanitizer
  ) { }

  ngOnInit(): void {
    console.log(this.getimagesdata);
    
  }

  HideDragSlider() {
    this.emitter.emit(false);
  }

  selectFile(event: any) {
    this.fileToUpload = event.target.files.item(0);
  }

  addImges(image: any) {
    this._loginservice.UploadImg(this.fileToUpload).subscribe((imgdata: Idata) => {
        this.getimagesdata();
        window.location.reload()
    })
    this.emitter.emit(false)
  }
}
