import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from '@material-ui/icons';
import { Observable, map, tap } from 'rxjs';
import { Idata, Ifastkartrole, Ilogin } from '../model/fastKart';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient) { }

  userloginService(obj: any) : Observable<Ilogin> {
    return this._http.post<Ilogin>('https://fastkart.webiots.co.in/api/backend/login', obj)
  }

  getFastKartApiModule() {
    return this._http.get(`https://fastkart.webiots.co.in/api/module/Get`)
  }

  getfastkartRoleData(page: number = 1, size: number=10 ) : Observable<Ifastkartrole>{
    let httpParams = new HttpParams().set("page", page).set("size", size)
    return this._http.get<Ifastkartrole>(`https://fastkart.webiots.co.in/api/role`, { params: httpParams })
  }

  addUsersData(body: any) : Observable<Idata>{
    let httpheaders = new HttpHeaders({
      "content-type" : 'application/json',
    })
    return this._http.post<Idata>(`https://fastkart.webiots.co.in/api/role`, body)
  }

  updateUserData(body: any, id: string) : Observable<Idata>{
    let editUrl = `https://fastkart.webiots.co.in/api/role/${id}`;
    return this._http.put<Idata>(editUrl, body)
  }

  getRoleSingleUserData(id: string) :Observable<Idata> {
    let getSinglObj = `https://fastkart.webiots.co.in/api/role/${id}`;
    return this._http.get<Idata>(getSinglObj)
  }

  delteRoleSingleUsers(id: string) : Observable<Idata> {
    let deletesingleUsers = `https://fastkart.webiots.co.in/api/role/${id}`;
    return this._http.delete<Idata>(deletesingleUsers)
  }

  // ------------------------------------ Imgaes -------------------------------------------//

  getImagesData() : Observable<Ifastkartrole>{
     return this._http.get<Ifastkartrole>(`https://fastkart.webiots.co.in/api/attachment`);
  }

 UploadImg(file : any) : Observable<Idata>{
  const formData = new FormData();
  formData.append("attachments[0]",file,file.name)
   return this._http.post<Idata>(`https://fastkart.webiots.co.in/api/attachment`, formData)
 }

 singleImgDelete(id:string) : Observable<Idata>{
   const singImgUrl = `https://fastkart.webiots.co.in/api/attachment/${id}`;
   return this._http.delete<Idata>(singImgUrl)
 }

}
