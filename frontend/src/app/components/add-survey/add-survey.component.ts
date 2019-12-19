import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { SurveyTestService } from 'src/app/services/api/survey-test.service';
import { Question, StringWraper } from 'src/app/models/question.model';
import { SurveyTest } from 'src/app/models/survey-test.model';
import decode from 'jwt-decode'
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-add-survey',
  templateUrl: './add-survey.component.html',
  styleUrls: ['./add-survey.component.css']
})
export class AddSurveyComponent implements OnInit {

  questions: Question[];
  databaseQuestions: Question[];
  current: SurveyTest;
  type: string;
  surveyTypes: string[];
  testTypes: string[];
  anonChecked: boolean;
  shuffleChecked: boolean;
  currentUser: User;

  constructor(
    private appComponent: AppComponent,
    private surveyTestService: SurveyTestService) { }

  ngOnInit() {

    this.appComponent.ChangeNavigationActive("add-survey-test");

    this.current = new SurveyTest();
    this.questions = [];
    this.surveyTypes = ['Input number', 'Input text','Input textarea', 'Input radio button', 'Input checkbox'];
    this.testTypes = ['Input number', 'Input text', 'Input radio button', 'Input checkbox'];

    var token = localStorage.getItem('token');
    var tokenPayload = decode(token);
    this.currentUser = tokenPayload.user;
    
    this.current.author = this.currentUser.username;

    this.surveyTestService.getAllQuestions().subscribe(
      dq => {
        this.databaseQuestions = dq;
        
        for (var i = 0; i < this.databaseQuestions.length; i++){

          var solutions = JSON.parse(this.databaseQuestions[i].solutions);

          this.databaseQuestions[i].labels = [];
          this.databaseQuestions[i].labelsWrapper = [];
          this.databaseQuestions[i].correct = [];
          this.databaseQuestions[i].correctWrapper = [];

          for (var j = 0; j < solutions.labels.length; j++){

            this.databaseQuestions[i].labelsWrapper.push(new StringWraper(solutions.labels[j]));
            this.databaseQuestions[i].correctWrapper.push(new StringWraper(solutions.correct[j]));

          }

        }
        
      }
    )
  }

  CreateQuestion(type){
    
    var q = new Question();
    q.type = type;
    q.labelsWrapper = [];
    q.correctWrapper = [];
    q.labels = [];
    q.correct = [];

    this.questions.push(q);

  }

  RemoveQuestion(i){
    this.questions.splice(i, 1);
  }

  AddField(id){
    //this.questions[id].labels.push('');
    this.questions[id].labelsWrapper.push(new StringWraper(''));
    //this.questions[id].correct.push('');
    this.questions[id].correctWrapper.push(new StringWraper(''));
  }

  RemoveField(i, j){
   // this.questions[i].labels.splice(j, 1);
    //this.questions[i].correct.splice(j, 1);
    this.questions[i].labelsWrapper.splice(j, 1);
    this.questions[i].correctWrapper.splice(j, 1);
  }

  AddFromDatabase(dq){
    this.questions.push(dq);
  }

  Submit(){
    
    if (this.anonChecked){
      this.current.anonymous = 1;
    }

    if (this.shuffleChecked){
      this.current.shuffle = 1;
    }

    if (!this.current.anonymous){
      this.current.anonymous = null;
    }

    if (!this.current.duration){
      this.current.duration = null;
    }

    if (!this.current.pages){
      this.current.pages = null;
    }

    if (!this.current.shuffle){
      this.current.shuffle = null;
    }

    for (var i = 0; i < this.questions.length; i++){

      for (var j = 0; j < this.questions[i].labelsWrapper.length; j++){
        this.questions[i].labels.push(this.questions[i].labelsWrapper[j].value);
        this.questions[i].correct.push(this.questions[i].correctWrapper[j].value);
      }

      this.questions[i].solutions = `{"labels": `
      + JSON.stringify(this.questions[i].labels)
      + `, "correct": `
      + JSON.stringify(this.questions[i].correct)
      + `}`;
      
    }

    this.surveyTestService.addSurveyTest(this.current).subscribe(
      sid => {
        
        this.current.id = sid.id;
        
        for (var i = 0; i < this.questions.length; i++){

          var q = this.questions[i];

          if (!q.points){
            q.points = null;
          }

          console.log(q);

          if (q.id){

            // Question is from database
            
            this.surveyTestService.addHasQuestion(this.current, q, i, q.points).subscribe(
              res => {
                
              }
            );

          }
          else{
            // Question doesnt exist in database

            this.surveyTestService.addQuestion(q).subscribe(
              qid => {
  
                // console.log(q);
                q.id = qid.id;
  
                this.surveyTestService.addHasQuestion(this.current, q, i, q.points).subscribe(
                  res => {
                    
                  }
                );
  
              }
            );

          }

          

        }

      }
    );

  }

}
