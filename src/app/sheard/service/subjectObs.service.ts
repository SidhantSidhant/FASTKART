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

    constructor(){}

    ObsEmitdata(data:boolean){
        return this.lodder.next(data)
    }

    ObsSubsdata(){
        return this.$lodder;
    }

}