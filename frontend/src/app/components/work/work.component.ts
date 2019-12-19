import { Component, OnInit } from '@angular/core';
import { SurveyTestService } from 'src/app/services/api/survey-test.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/models/question.model';
import { SurveyTest } from 'src/app/models/survey-test.model';
import { Answer } from 'src/app/models/answer.model';
import { User } from 'src/app/models/user.model';
import decode from 'jwt-decode' 
import { WorkService } from 'src/app/services/api/work.service';
import { AnswerService } from 'src/app/services/api/answer.service';
import { Variable } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {

  id: string;
  questions: Question[];
  current: SurveyTest;
  currentUser: User;
  answers: Answer[];
  answered: boolean[];
  countAll: number;
  countAnswered: number;
  percent: number;
  elapsed: number;
  timer;
  totalPoints: number;
  maxPoints: number;
  points: number[];
  
  constructor(private surveyTestService: SurveyTestService, 
    private route: ActivatedRoute, 
    private workService: WorkService,
    private answerService: AnswerService,
    private router: Router) { }

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id');
    this.percent = 0;
    this.countAnswered = 0;

    var token = localStorage.getItem('token');
    var tokenPayload = decode(token);
    this.currentUser = tokenPayload.user;

    this.surveyTestService.getSingle(this.id).subscribe(
      survey => {
        this.current = survey[0];

        if (this.current.type == 1){
          this.elapsed = 0;
          
          this.timer = setInterval(
            () => {
              this.elapsed++;

              if (this.elapsed == this.current.duration){
                clearInterval(this.timer);
              }

            },
            1000
          );

        }

      }
    );

    this.surveyTestService.getQuestions(this.id).subscribe(
      q => {
        this.questions = q;
        this.answers = [];
        this.answered = [];
        this.countAll = q.length;

        this.questions.forEach(q => {

          this.answered.push(false);
          console.log(q.solutions);
          let obj = JSON.parse(q.solutions);
          q.labels = obj.labels;
          q.correct = obj.correct;
          
          this.answers.push(new Answer(q.labels.length, q.id, this.currentUser.username, this.current.id));
          
        });

      }
    );
    

  }

  handleChange(i){
    if (!this.answered[i]){
      this.answered[i] = true;
      this.countAnswered++;
      this.percent = this.countAnswered / this.countAll * 100;
      document.getElementById("progress-bar").style.width = this.percent + "%";
    }
  }

  handleCheck(i, j){

    console.log(i,j);

    if (this.answers[i].answers[j] == ''){
      this.answers[i].answers[j] = '1';
    }
    else{
      this.answers[i].answers[j] = '';
    }

    if (!this.answered[i]){
      this.answered[i] = true;
      this.countAnswered++;
      this.percent = this.countAnswered / this.countAll * 100;
      document.getElementById("progress-bar").style.width = this.percent + "%";
    }

    console.log(this.answers[i].answers[j]);
  }

  Submit(){
    
    this.UpdateWork(1);

    if (this.current.type == 1){
      clearInterval(this.timer);
    }

  }

  Save(){
    this.UpdateWork(0);
  }

  UpdateWork(finished){

    if (this.current.type == 1)
      this.CalculatePoints();
    else {
      this.points = [];
      this.totalPoints = null;
    }

    this.answerService.deleteAnswers(this.currentUser.username, this.current.id).subscribe(
      ret => {
        this.workService.deleteWork(this.currentUser.username, this.current.id).subscribe(
          ret => {

            this.workService.addWork(this.currentUser, this.current, finished, this.elapsed, this.totalPoints).subscribe(
              code => {
                console.log(this.answers);

                for (var i = 0; i < this.answers.length; i++){
                  var a = this.answers[i];
                  var p = this.points[i];

                  this.answerService.addAnswer(a, p).subscribe(
                    code => {

                    }
                  );

                }

                this.router.navigate(['single/' + this.current.id])
      
              }
            );

          }
        )
      }
    )

  }

  CalculatePoints(){
    
    this.totalPoints = 0;
    this.maxPoints = 0;
    this.points = [];


    for (var i = 0; i < this.questions.length; i++){

      var noCorrect = 0;

      var total = this.questions[i].correct.length;

      for (var j = 0; j < total; j++){

        if (this.questions[i].correct[j] == this.answers[i].answers[j]){
          noCorrect++;
        }

      }

      this.points[i] = (noCorrect / total) * this.questions[i].points;
      this.totalPoints += this.points[i];
      this.maxPoints += this.questions[i].points;
    }

  }
  
}
