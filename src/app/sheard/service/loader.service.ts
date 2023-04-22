import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, finalize, map, tap } from "rxjs";
import { SubjectObsService } from "./subjectObs.service";



@Injectable({
    providedIn: 'root'
})
export class LoaderService implements HttpInterceptor {

    constructor(private subjectobsservice: SubjectObsService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        this.subjectobsservice.ObsEmitdata(true);
        return next.handle(req).pipe(
            finalize(() => {
                this.subjectobsservice.ObsEmitdata(false);
            })
        )
    }
}