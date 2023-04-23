import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Idata, Ifastkartrole } from 'src/app/sheard/model/fastKart';
import { LoginService } from 'src/app/sheard/service/login.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit, OnDestroy {
  isvisible: boolean = false;
  imagesObj !: Ifastkartrole;
  inputVal !: string;
  subscription$ !: Subscription;
  subscription$1 !: Subscription;

  constructor(private _loginservice: LoginService) { }

  ngOnInit(): void {
    this.getimagesdata()
  }

  getimagesdata(img?: Idata): void {
    this.subscription$ = this._loginservice.getImagesData().subscribe((res: Ifastkartrole) => {
      this.imagesObj = res;
    })
  }

  DragSlider(): void {
    this.isvisible = true;
  }

  emitterEvent(value: boolean): void {
    this.isvisible = value;
  }

  onDeleteImage(id: string): void {
    this.subscription$1 = this._loginservice.singleImgDelete(id).subscribe((res: Idata) => { })
  }

  ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
    this.subscription$1?.unsubscribe();
  }
}
