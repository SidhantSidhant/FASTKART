import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Idata } from "../model/fastKart";

@Injectable(
    {
        providedIn : 'root'
    }
)
export class SubjectObsService{
    lodder : Subject<boolean> = new Subject<boolean>();
    $lodder : Observable<boolean>= this.lodder.asObservable();

    imgdata : Subject<Idata> = new Subject();
    $imgdata : Observable<Idata> = this.imgdata.asObservable()
    constructor(){}

    ObsEmitdata(data:boolean){
        return this.lodder.next(data)
    }

    ObsSubsdata(){
        return this.$lodder;
    }

}