import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyTestService } from 'src/app/services/api/survey-test.service';
import { WorkService } from 'src/app/services/api/work.service';
import { AnswerService } from 'src/app/services/api/answer.service';
import { SurveyTest } from 'src/app/models/survey-test.model';
import { User } from 'src/app/models/user.model';
import { Work } from 'src/app/models/work.model';
import decode from 'jwt-decode';
import { Answer } from 'src/app/models/answer.model';
import { Question } from 'src/app/models/question.model';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  id: string;
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
    private answerService: AnswerService,
  ) { }

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id');
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
        
        this.workService.getQA(this.currentUser.username, this.current.id).subscribe(
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

}
