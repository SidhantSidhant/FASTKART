import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from '@material-ui/icons';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  token !: string;
  obj: any;

  FastkartloginApi: string = 'https://fastkart.webiots.co.in/api/backend/login';
  FastkartModuleapi: string = `https://fastkart.webiots.co.in/api/module/Get`;
  Fastkartroleapi: string = `https://fastkart.webiots.co.in/api/role`;
  fastKartEditapi: string = `https://fastkart.webiots.co.in/api/role/1/`;

  constructor(private _http: HttpClient) { }

  userloginService(obj: any) {
    return this._http.post(this.FastkartloginApi, obj)
  }

  getFastKartApiModule() {
    return this._http.get(this.FastkartModuleapi)
  }

  getFastKartdata(page: number = 1, size: number=10 ) {
    let httpParams = new HttpParams().set("page", page).set("size", size)
    return this._http.get(this.Fastkartroleapi, { params: httpParams })
  }

  addUsersData(body: any) {
    return this._http.post(`https://fastkart.webiots.co.in/api/role`, body)
  }

  updateUserData(body: any, id: string) {
    let editUrl = `https://fastkart.webiots.co.in/api/role/${id}`;
    return this._http.put(editUrl, body)
  }

  getSingleUserData(id: string) {
    let getSinglObj = `${this.Fastkartroleapi}/${id}`;
    return this._http.get(getSinglObj)
  }

  DelteSingleUsers(id: string) {
    let deletesingleUsers = `https://fastkart.webiots.co.in/api/role/${id}`;
    return this._http.delete(deletesingleUsers)
  }

  // ------------------------------------ Imgaes -------------------------------------------//

  getImagesData(){
     return this._http.get(`https://fastkart.webiots.co.in/api/attachment`);
  }

 UploadImg(body : any){
   return this._http.post(`https://fastkart.webiots.co.in/api/attachment`, body)
 }
}
