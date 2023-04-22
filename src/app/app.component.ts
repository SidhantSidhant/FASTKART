import { Component, OnInit } from '@angular/core';
import { SubjectObsService } from './sheard/service/subjectObs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ANGUKAR';
  visibleLodder: boolean = false;

  constructor(private _subjectobsservice: SubjectObsService) { }

  ngOnInit(): void {
    this._subjectobsservice.ObsSubsdata().subscribe(res => {
      this.visibleLodder = res;
    }, (err) => {console.log("Lodder Error")
    alert("ledder error")
  }
    )
  }
}
