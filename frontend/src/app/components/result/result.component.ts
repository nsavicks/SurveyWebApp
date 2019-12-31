import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyTestService } from 'src/app/services/api/survey-test.service';
import { WorkService } from 'src/app/services/api/work.service';
import { AnswerService } from 'src/app/services/api/answer.service';
import { SurveyTest } from 'src/app/models/survey-test.model';
import { User } from 'src/app/models/user.model';
import { Work } from 'src/app/models/work.model';
import decode from 'jwt-decode';
import { Answer } from 'src/app/models/answer.model';
import { Question } from 'src/app/models/question.model';
import { UsersService } from 'src/app/services/api/users.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  id: string;
  username: string;
  current: SurveyTest;
  currentUser: User;
  work: Work;
  qa: Object[];
  solutions: object[];
  answers: object[];
  points: number[];
  totalPoints: number;
  maxPoints: number;

  constructor(
    private route: ActivatedRoute, 
    private surveyTestService: SurveyTestService,
    private workService: WorkService,
    private userService: UsersService,
    private appComponent: AppComponent,
    private router: Router
  ) { }

  ngOnInit() {

    this.username = this.route.snapshot.paramMap.get('username');
    this.id = this.route.snapshot.paramMap.get('surveyId');

    console.log(this.id);
    console.log(this.username);

    this.solutions = [];
    this.answers = [];

    var token = localStorage.getItem('token');
    var tokenPayload = decode(token);
    this.currentUser = tokenPayload.user;

    this.surveyTestService.getMaxPoints(this.id).subscribe(
      obj => {
        this.maxPoints = obj[0].max_points;
      }
    );

    this.surveyTestService.getSingle(this.id).subscribe(
      survey => {

        this.current = survey[0];

        if (this.currentUser.username != this.username && this.currentUser.username != this.current.author){
          this.router.navigate['home'];
        }

        this.appComponent.changeHeader(this.current.title, "poll-h");

        this.userService.getUserWithUsername(this.username).subscribe(
          user => {
            
            this.workService.getQA(user.username, this.current.id).subscribe(
              res => {
                this.qa = res;
                
                this.qa.forEach(q => {
                  this.solutions.push(JSON.parse(q.solutions));
                  this.answers.push(JSON.parse(q.answers))
                });
    
              }
            )

          }
        );
        
      }
    );

  }

}
