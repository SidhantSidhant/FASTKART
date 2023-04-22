import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/sheard/service/login.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {
  isvisible : boolean = false;
  imagesObj : any = {};
  sortArray : string[] = ["Sort By newest", "Sort By oldest", "Sort By smallest", "Sort By largest"]
  Input !:string;

  constructor(private _loginservice : LoginService) { }

  ngOnInit(): void {
    this.getImgData()
  }

  getImgData(){
      this._loginservice.getImagesData().subscribe(res =>{
          console.log(res);
          this.imagesObj = res;
      })
  }

  DragSlider(){
    this.isvisible = true;
  }

  emitterEvent(value : boolean){
    this.isvisible = value;
  }
}
