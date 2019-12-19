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

  constructor(private appComponent: AppComponent, private surveyTestService: SurveyTestService) { }

  ngOnInit() {

    this.appComponent.ChangeNavigationActive("home");

    this.surveyTestService.getAllSurveys().subscribe(
      surveys => {
        this.allSurveys = surveys;
      }
    );

    this.surveyTestService.getAllTests().subscribe(
      tests => {
        this.allTests = tests;
      }
    );

  }

}
