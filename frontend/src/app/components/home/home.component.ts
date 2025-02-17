import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { SurveyTestService } from 'src/app/services/api/survey-test.service';
import { SurveyTest } from 'src/app/models/survey-test.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allSurveys: SurveyTest[];
  allTests: SurveyTest[];
  filterSurvey: string;
  filterTest: string;

  constructor(private appComponent: AppComponent, private surveyTestService: SurveyTestService) { }

  ngOnInit() {

    this.appComponent.ChangeNavigationActive("home");
    this.appComponent.changeHeader("Home", "home");

    this.surveyTestService.getAllSurveys().subscribe(
      surveys => {
        this.allSurveys = surveys;
        console.log(this.allSurveys);
      }
    );

    this.surveyTestService.getAllTests().subscribe(
      tests => {
        this.allTests = tests;
      }
    );

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


}
