import { Component, OnInit } from '@angular/core';
import { SurveyTest } from 'src/app/models/survey-test.model';
import { ActivatedRoute } from '@angular/router';
import { SurveyTestService } from 'src/app/services/api/survey-test.service';
import { User } from 'src/app/models/user.model';
import decode from 'jwt-decode'
import { Work } from 'src/app/models/work.model';
import { WorkService } from 'src/app/services/api/work.service';

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

  constructor(
    private route: ActivatedRoute, 
    private surveyTestService: SurveyTestService,
    private workService: WorkService
    ) { }

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id');

    var token = localStorage.getItem('token');
    var tokenPayload = decode(token);
    this.currentUser = tokenPayload.user;

    this.surveyTestService.getSingle(this.id).subscribe(
      survey => {
        this.current = survey[0];
        this.workService.getWork(this.currentUser.username, this.current.id).subscribe(
          work => {
            this.work = work[0];
            console.log(this.work);
          }
        );

      }
    );
    
     
  }

}
