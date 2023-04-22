import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { LoginService } from 'src/app/sheard/service/login.service';

@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.scss']
})
export class UploadImgComponent implements OnInit {
  @Output() emitter: EventEmitter<boolean> = new EventEmitter<boolean>()
  url: string = './assets/img/istockphoto-1263838446-170667a.jpg';

  constructor(private _loginservice: LoginService,
    private _sanitizar: DomSanitizer
  ) { }

  ngOnInit(): void {
    console.log(this.url);

  }


  HideDragSlider() {
    this.emitter.emit(false)
  }

  selectFile(event: any) {
    for (let i = 0; i < File.length; i++) {
      let reder = new FileReader();
      reder.readAsDataURL(event.target.files[0]);
      reder.onload = (event: any) => {
        console.log(event.target.result);
        this.url = event.target.result
      }
    }
  }

  InsetrtTheImg(f: NgForm) {
    console.log(f.value);
    this._loginservice.UploadImg(this.url).subscribe(res => {
      console.log(res);
    })
  }
}
