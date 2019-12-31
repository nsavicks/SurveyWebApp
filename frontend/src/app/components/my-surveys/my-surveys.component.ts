import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { SurveyTestService } from 'src/app/services/api/survey-test.service';
import { SurveyTest } from 'src/app/models/survey-test.model';
import { User } from 'src/app/models/user.model';
import decode from 'jwt-decode'

@Component({
  selector: 'app-my-surveys',
  templateUrl: './my-surveys.component.html',
  styleUrls: ['./my-surveys.component.css']
})
export class MySurveysComponent implements OnInit {

  allSurveys: SurveyTest[];
  allTests: SurveyTest[];
  filterSurvey: string;
  filterTest: string;
  currentUser: User;

  constructor(
    private appComponent: AppComponent,
    private surveyTestService: SurveyTestService
  ) { }

  ngOnInit() {

    this.appComponent.ChangeNavigationActive("my-surveys-tests");
    this.appComponent.changeHeader("My Surveys/Tests", "list-ol");

    var token = localStorage.getItem('token');
    var tokenPayload = decode(token);
    this.currentUser = tokenPayload.user;

    this.surveyTestService.getAllSurveysForAuthor(this.currentUser.username).subscribe(
      surveys => {
        this.allSurveys = surveys;
      }
    );

    this.surveyTestService.getAllTestsForAuthor(this.currentUser.username).subscribe(
      tests => {
        this.allTests = tests;
      }
    )

  }

  HandleFilterSurvey(){
    
    switch(this.filterSurvey){
      
      case "nasc": {
        this.allSurveys.sort(
          (a,b) => {
            return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
          }
        );
        break;
      }

      case "ndesc": {

        this.allSurveys.sort(
          (a,b) => {
            return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
          }
        ).reverse();

        break;
      }

      case "sdasc": {

        this.allSurveys.sort(
          (a,b) => {
            return (a.start < b.start) ? -1: 1;
          }
        );

        break;
      }

      case "sddesc": {

        this.allSurveys.sort(
          (a,b) => {
            return (a.start > b.start) ? -1: 1;
          }
        );

        break;
      }

      case "edasc": {

        this.allSurveys.sort(
          (a,b) => {
            return (a.end < b.end) ? -1: 1;
          }
        );

        break;
      }

      case "eddesc": {

        this.allSurveys.sort(
          (a,b) => {
            return (a.end > b.end) ? -1: 1;
          }
        );

        break;
      }

    }

  }

  HandleFilterTest(){

    switch(this.filterTest){
      
      case "nasc": {
        this.allTests.sort(
          (a,b) => {
            return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
          }
        );
        break;
      }

      case "ndesc": {

        this.allTests.sort(
          (a,b) => {
            return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
          }
        ).reverse();

        break;
      }

      case "sdasc": {

        this.allTests.sort(
          (a,b) => {
            return (a.start < b.start) ? -1: 1;
          }
        );

        break;
      }

      case "sddesc": {

        this.allTests.sort(
          (a,b) => {
            return (a.start > b.start) ? -1: 1;
          }
        );

        break;
      }

      case "edasc": {

        this.allTests.sort(
          (a,b) => {
            return (a.end < b.end) ? -1: 1;
          }
        );

        break;
      }

      case "eddesc": {

        this.allTests.sort(
          (a,b) => {
            return (a.end > b.end) ? -1: 1;
          }
        );

        break;
      }

    }

  }

  Delete(item){
    console.log("OPZOVA");
  }
}
