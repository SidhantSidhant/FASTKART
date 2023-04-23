import { Injectable } from "@angular/core";



@Injectable({
    providedIn : 'root'
})
export class AuthService{
    userlogin : boolean = false;

    constructor(){}

    isAutheticaion(){
        return new Promise((resolve)=>{
         this.userlogin = localStorage.getItem("token") ? true : false;
            resolve(this.userlogin)
        })
    }

    isUserLogIn(token : string){
        this.userlogin = true;
        localStorage.setItem("token", token);
    }

    isUserLogOut(){
        this.userlogin = false;
        localStorage.removeItem("token")
    }
}