import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { SurveyTestService } from 'src/app/services/api/survey-test.service';
import { Question, StringWraper } from 'src/app/models/question.model';
import { SurveyTest } from 'src/app/models/survey-test.model';
import decode from 'jwt-decode'
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

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
  inputFile: File;

  constructor(
    private appComponent: AppComponent,
    private surveyTestService: SurveyTestService,
    private router: Router) { }

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

  AddHasQuestionToDatabase(q, i){
    this.surveyTestService.addHasQuestion(this.current, q, i, q.points).subscribe(
      res => {
        
      }
    );
  }

  AddQuestionToDatabase(q, i){

    this.surveyTestService.addQuestion(q).subscribe(
      qid => {

        q.id = qid.id;

        this.surveyTestService.addHasQuestion(this.current, q, i, q.points).subscribe(
          res => {
            
          }
        );

      }
    );

  }

  Submit(fromJSON: boolean){
    
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
        if (this.current.type == 1){
          this.questions[i].correct.push(this.questions[i].correctWrapper[j].value);
        }
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

          console.log(i);

          var q = this.questions[i];

          if (!q.points){
            q.points = null;
          }

          console.log(q);

          if (q.id){

            // Question is from database
            
            this.AddHasQuestionToDatabase(q, i);

          }
          else{
            // Question doesnt exist in database

            this.AddQuestionToDatabase(q, i);

          }

        }

        this.router.navigate(['home']);

      }
    );

  }

  HandleFileChange(files: FileList){

    this.inputFile = files.item(0);
    console.log(this.inputFile);

  }

  LoadFromJSON(){
    var fr = new FileReader();

    fr.onload = (e) => {
      
      var data = fr.result.toString();
      var jsonObj = JSON.parse(data);

      this.current.title = jsonObj.Quiz.title;
      this.current.description = jsonObj.Quiz.description;
      this.current.start = jsonObj.Quiz.start;
      this.current.end = jsonObj.Quiz.end;
      this.current.duration = jsonObj.Quiz.duration;
      this.current.type = jsonObj.Quiz.type;
      this.current.pages = jsonObj.Quiz.pages;
      this.current.anonymous = jsonObj.Quiz.anonymous;
      this.current.shuffle = jsonObj.Quiz.shuffle;

      if (this.current.anonymous && this.current.anonymous == 1){
        this.anonChecked = true;
      }

      if (this.current.shuffle && this.current.shuffle == 1){
        this.shuffleChecked = true;
      }

      console.log(this.current);

      this.questions = [];
      
      jsonObj.Questions.forEach(q => {
        var quest = new Question();

        quest.text = q.text;
        quest.type = q.type;
        quest.points = q.points;
        quest.labelsWrapper = [];
        quest.correctWrapper = [];
        quest.labels = [];
        quest.correct = [];

        for (var i = 0; i < q.labels.length; i++){
          quest.labelsWrapper.push(new StringWraper(q.labels[i]));
          if (q.correct){
            quest.correctWrapper.push(new StringWraper(q.correct[i]));
          }
        }

        //console.log(quest);

        this.questions.push(quest);

      });

    };

    fr.readAsText(this.inputFile);

  }

  MoveUp(i){

    if (i == 0) return;

    let tmp = this.questions[i];
    this.questions[i] = this.questions[i-1];
    this.questions[i-1] = tmp;

  }

  MoveDown(i){
    
    if (i == this.questions.length - 1) return;

    let tmp = this.questions[i];
    this.questions[i] = this.questions[i+1];
    this.questions[i+1] = tmp;

  }
}
