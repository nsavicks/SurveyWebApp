import { Component, OnInit } from '@angular/core';
import { SurveyTest } from 'src/app/models/survey-test.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyTestService } from 'src/app/services/api/survey-test.service';
import { User } from 'src/app/models/user.model';
import decode from 'jwt-decode'
import { Work } from 'src/app/models/work.model';
import { WorkService } from 'src/app/services/api/work.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit {

  id: string;
  current: SurveyTest;
  currentUser: User;
  work: Work;
  expired: boolean;
  started: boolean;

  constructor(
    private route: ActivatedRoute, 
    private surveyTestService: SurveyTestService,
    private workService: WorkService,
    private router: Router,
    private appComponent: AppComponent
    ) { }

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id');

    var token = localStorage.getItem('token');
    var tokenPayload = decode(token);
    this.currentUser = tokenPayload.user;

    this.surveyTestService.getSingle(this.id).subscribe(
      survey => {
        this.current = survey[0];
        
        this.appComponent.changeHeader(this.current.title, "poll-h")

        var now = new Date();
        var now_utc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
        
        this.started = new Date(this.current.start).getTime() <= now_utc;
        this.expired = new Date(this.current.end).getTime() < now_utc;
        
        console.log(this.current.start);
        console.log(now);
        console.log(this.expired);
        console.log(this.started);

        this.workService.getWork(this.currentUser.username, this.current.id).subscribe(
          work => {
            this.work = work[0];
            console.log(this.work);
          }
        );

      }
    );
    
     
  }

  Delete(){
    
    this.surveyTestService.deleteSurveyTest(this.current.id).subscribe(
      code => {
        this.router.navigate(['my-surveys-tests']);
      }
    );

  }

}
