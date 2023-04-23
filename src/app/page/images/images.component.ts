import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Idata, Ifastkartrole } from 'src/app/sheard/model/fastKart';
import { LoginService } from 'src/app/sheard/service/login.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {
  isvisible : boolean = false;
  imagesObj !: Ifastkartrole ;
  inputVal !:string;


  constructor(private _loginservice : LoginService) { }

  ngOnInit(): void {
    this.getimagesdata()
  }

  getimagesdata(img ?: Idata) : void{
      this._loginservice.getImagesData().subscribe((res : Ifastkartrole) =>{
        this.imagesObj = res;
      })
  }

  DragSlider(){
    this.isvisible = true;
  }

  emitterEvent(value : boolean){
    this.isvisible = value;
  }

  onDeleteImage(id : string){
    this._loginservice.singleImgDelete(id).subscribe((res : Idata) =>{
        console.log(res);
        
    })
  }
}
