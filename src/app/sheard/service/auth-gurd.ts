import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";





@Injectable({
    providedIn : 'root'
})
export class AuthGurdService implements CanActivate{

    constructor(private _authservice : AuthService){}

    canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot) : Promise<boolean> | Observable<boolean> |boolean{
        return this._authservice.isAutheticaion().then((authicate)=>{
            if(authicate){
                return true;
            }else{
                return false;
            }
        })
    }
}