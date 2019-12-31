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
  allQuestions: Question[];
  questions: Question[];
  current: SurveyTest;
  currentUser: User;
  answers: Answer[];
  percent: number;
  elapsed: number;
  timer;
  totalPoints: number;
  maxPoints: number;
  points: number[];
  
  // Pagination
  currentPage: number;
  maxPage: number;
  noQuestPerPage: number[];
  offset: number;
  
  constructor(private surveyTestService: SurveyTestService, 
    private route: ActivatedRoute, 
    private workService: WorkService,
    private answerService: AnswerService,
    private router: Router) { }

  ngOnInit() {
    
    this.id = this.route.snapshot.paramMap.get('id');
    this.percent = 0;

    var token = localStorage.getItem('token');
    var tokenPayload = decode(token);
    this.currentUser = tokenPayload.user;

    this.surveyTestService.getSingle(this.id).subscribe(
      survey => {
        this.current = survey[0];

        // Pagination calcs 

        this.currentPage = 1;

        if (this.current.pages){
          this.maxPage = this.current.pages;
        }
        else{
          this.maxPage = 1;
        }

        if (this.current.type == 1){
          this.elapsed = 0;
          
          this.timer = setInterval(
            () => {
              this.elapsed++;

              if (this.current.duration > 15 && this.current.duration - this.elapsed == 15){
                // TODO change color to red
              }

              if (this.elapsed == this.current.duration){
                this.Submit();
              }

            },
            1000
          );

        }

      }
    );

    this.surveyTestService.getQuestions(this.id).subscribe(
      q => {

        this.allQuestions = q;

        this.CalculatePagination();

        this.questions = this.allQuestions.slice(this.offset, this.offset + this.noQuestPerPage[this.currentPage - 1]);

        this.answers = [];

        if (this.current.type == 0){
          // try to load saved version

          this.workService.getWork(this.currentUser.username, this.current.id).subscribe(
            prevWork => {
              
              //console.log(prevWork);

              if (prevWork[0] != null){
                
                //console.log(prevWork[0]);

                this.allQuestions.forEach(
                  q => {

                    let obj = JSON.parse(q.solutions);
                    q.labels = obj.labels;
                    q.correct = obj.correct;

                    this.answerService.getAnswer(q.id, this.currentUser.username, this.current.id).subscribe(
                      a => {
                        //console.log(a);
                        if (a.length > 0){
                          
                          a[0].answers = JSON.parse(a[0].answers);

                          let tmpAnswer = new Answer(q.labels.length, q.id, this.currentUser.username, this.current.id);
                          tmpAnswer.answers = a[0].answers;
                        
                          this.answers.push(tmpAnswer);
                          this.RefreshProgressBar();

                        }
                        else{

                          this.answers.push(new Answer(q.labels.length, q.id, this.currentUser.username, this.current.id));

                        }

                      }
                    );

                  }
                );
              
              }
              else{
                // if there is no previouse state

                this.allQuestions.forEach(q => {

                  let obj = JSON.parse(q.solutions);
                  q.labels = obj.labels;
                  q.correct = obj.correct;
                  
                  this.answers.push(new Answer(q.labels.length, q.id, this.currentUser.username, this.current.id));
                  
                });

              }

            }
          );

        }
        else{

          // For test there is no loading previous state

          this.allQuestions.forEach(q => {

            console.log(q.solutions);
            let obj = JSON.parse(q.solutions);
            q.labels = obj.labels;
            q.correct = obj.correct;
            
            this.answers.push(new Answer(q.labels.length, q.id, this.currentUser.username, this.current.id));
            
          });

        }

      }
    );
    

  }

  handleChange(i){
    
    this.RefreshProgressBar();

  }

  handleCheck(i, j){

    if (this.answers[i].answers[j] == ""){
      this.answers[i].answers[j] = "1";
    }
    else{
      this.answers[i].answers[j] = "";
    }

    this.RefreshProgressBar();

  }

  handleRadioCheck(i, j){

    for(var k = 0; k < this.answers[i].answers.length; k++){
      this.answers[i].answers[k] = "";
    }

    this.answers[i].answers[j] = "1";

    console.log(this.answers[i].answers);

    this.RefreshProgressBar();

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

                this.router.navigate(['single/' + '/' + this.current.id])
      
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


    for (var i = 0; i < this.allQuestions.length; i++){

      var noCorrect = 0;

      var total = this.allQuestions[i].correct.length;

      for (var j = 0; j < total; j++){

        if (this.allQuestions[i].correct[j] == this.answers[i].answers[j]){
          noCorrect++;
        }

      }

      this.points[i] = (noCorrect / total) * this.allQuestions[i].points;
      this.totalPoints += this.points[i];
      this.maxPoints += this.allQuestions[i].points;
    }

  }

  RefreshProgressBar(){

    var cntResponded = 0;
    var cntQuestions = this.allQuestions.length;

    for (var i = 0; i < cntQuestions; i++){

      var foundAnswered = false;
      if (this.answers[i]){

        for (var j = 0; j < this.answers[i].answers.length; j++){
          if (this.answers[i].answers[j] && this.answers[i].answers[j] != ""){
            foundAnswered = true;
            break;
          }
        }

      }
      
      if (foundAnswered) cntResponded++;

    }

    this.percent = Math.trunc(cntResponded / cntQuestions * 100);
    document.getElementById("progress-bar").style.width = this.percent + "%";

  }

  CalculatePagination(){

    this.noQuestPerPage = [];
    var numberOfQuestions = this.allQuestions.length;
    var leftQuestions = numberOfQuestions;
    var leftPages = this.maxPage;
    var maxPerPage = Math.ceil(numberOfQuestions / this.maxPage);

    while (leftQuestions > 0){
      if (leftQuestions - (leftPages - 1) >= maxPerPage){
        this.noQuestPerPage.push(maxPerPage);
        leftQuestions -= maxPerPage;
        leftPages--;
      }
      else{
        this.noQuestPerPage.push(leftQuestions - (leftPages - 1));
        leftQuestions = leftPages - 1;
        leftPages--;
      }
    }

    this.offset = 0;

  }

  PrevPage(){

    this.currentPage--;
    this.offset -= this.noQuestPerPage[this.currentPage - 1];
    this.questions = this.allQuestions.slice(this.offset, this.offset + this.noQuestPerPage[this.currentPage - 1]);

  }

  NextPage(){

    this.offset += this.noQuestPerPage[this.currentPage - 1];
    this.currentPage++;
    this.questions = this.allQuestions.slice(this.offset, this.offset + this.noQuestPerPage[this.currentPage - 1]);

  }
  
}
